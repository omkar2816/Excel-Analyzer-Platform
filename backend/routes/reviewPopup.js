import express from 'express';
import rateLimit from 'express-rate-limit';
import Rating from '../models/Rating.js';
import ReviewPreference from '../models/ReviewPreference.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Rate limiting for review submissions
const reviewRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // max 3 reviews per hour
  message: 'Too many review attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const preferenceRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // max 10 preference updates per minute
  message: 'Too many preference updates, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper function to generate device fingerprint
const generateDeviceFingerprint = (req) => {
  const userAgent = req.get('User-Agent') || '';
  const acceptLanguage = req.get('Accept-Language') || '';
  const ip = req.ip || req.connection.remoteAddress;
  return Buffer.from(`${userAgent}${acceptLanguage}${ip}`).toString('base64').slice(0, 32);
};

// Helper function to generate anonymous ID
const generateAnonymousId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// GET /api/review-popup/status - Check if popup should be shown
router.get('/status', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { anonymousId } = req.query;
    const deviceFingerprint = generateDeviceFingerprint(req);

    // Check if user already has a review
    if (userId) {
      const existingReview = await Rating.findOne({ user: userId });
      if (existingReview) {
        return res.json({
          shouldShow: false,
          reason: 'already_reviewed',
          hasReview: true
        });
      }
    }

    // Check popup conditions
    const result = await ReviewPreference.shouldShowPopup(userId, anonymousId, deviceFingerprint);
    
    res.json({
      ...result,
      anonymousId: anonymousId || generateAnonymousId(),
      deviceFingerprint
    });
  } catch (error) {
    console.error('Error checking review popup status:', error);
    res.status(500).json({ 
      error: 'Failed to check popup status',
      shouldShow: false 
    });
  }
});

// POST /api/review-popup/track-activity - Track user activity
router.post('/track-activity', preferenceRateLimit, optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { anonymousId, activityType, data = {} } = req.body;
    const deviceFingerprint = generateDeviceFingerprint(req);

    if (!activityType) {
      return res.status(400).json({ error: 'Activity type is required' });
    }

    const validActivityTypes = ['file_upload', 'chart_generated', 'report_analyzed', 'page_view', 'active_time'];
    if (!validActivityTypes.includes(activityType)) {
      return res.status(400).json({ error: 'Invalid activity type' });
    }

    const preference = await ReviewPreference.trackActivity(
      userId, 
      anonymousId, 
      deviceFingerprint, 
      activityType, 
      data
    );

    res.json({ 
      success: true, 
      activityCount: preference.activityCount,
      meaningfulActions: preference.meaningfulActions,
      pageViewCount: preference.pageViewCount,
      activeTimeMinutes: preference.activeTimeMinutes
    });
  } catch (error) {
    console.error('Error tracking activity:', error);
    res.status(500).json({ error: 'Failed to track activity' });
  }
});

// POST /api/review-popup/preference - Save user preference (Never, Later, Dismiss)
router.post('/preference', preferenceRateLimit, optionalAuth, [
  body('preference').isIn(['never', 'later', 'dismissed']).withMessage('Invalid preference'),
  body('anonymousId').optional().isString(),
  body('remindDays').optional().isInt({ min: 1, max: 365 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id || null;
    const { preference, anonymousId, remindDays = 7 } = req.body;
    const deviceFingerprint = generateDeviceFingerprint(req);

    const filter = userId 
      ? { userId } 
      : { $or: [{ anonymousId }, { deviceFingerprint }] };

    const update = {
      preference,
      lastShown: new Date(),
      userId,
      anonymousId,
      deviceFingerprint
    };

    // Set remind date for 'later' preference
    if (preference === 'later') {
      const remindAt = new Date();
      remindAt.setDate(remindAt.getDate() + remindDays);
      update.remindAt = remindAt;
    } else {
      update.remindAt = null;
    }

    const updatedPreference = await ReviewPreference.findOneAndUpdate(
      filter, 
      update, 
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ 
      success: true, 
      preference: updatedPreference.preference,
      remindAt: updatedPreference.remindAt 
    });
  } catch (error) {
    console.error('Error saving preference:', error);
    res.status(500).json({ error: 'Failed to save preference' });
  }
});

// POST /api/review-popup/submit - Submit review from popup
router.post('/submit', reviewRateLimit, protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('review').trim().isLength({ min: 10, max: 1000 }).withMessage('Review must be between 10 and 1000 characters'),
  body('anonymousId').optional().isString(),
  body('categories').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, title, review, categories, anonymousId } = req.body;
    const userId = req.user.id;
    const deviceFingerprint = generateDeviceFingerprint(req);

    // Check if user already has a review
    const existingReview = await Rating.findOne({ user: userId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already submitted a review. You can update it from your profile.' });
    }

    // Create new review
    const newReview = new Rating({
      user: userId,
      rating,
      title,
      review,
      categories,
      source: 'popup',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      status: 'pending' // Reviews from popup need approval
    });

    await newReview.save();

    // Update review preference to 'never' since they submitted
    await ReviewPreference.findOneAndUpdate(
      { $or: [{ userId }, { anonymousId }, { deviceFingerprint }] },
      { 
        preference: 'never',
        lastShown: new Date(),
        userId,
        anonymousId,
        deviceFingerprint
      },
      { upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully! It will be published after approval.',
      reviewId: newReview._id
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You have already submitted a review.' });
    }
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// GET /api/review-popup/stats - Get current rating statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Rating.getAverageRating();
    const featuredReviews = await Rating.getFeaturedReviews(3);
    
    res.json({
      ...stats,
      featuredReviews: featuredReviews.map(review => ({
        id: review._id,
        rating: review.rating,
        title: review.title,
        review: review.review.substring(0, 100) + (review.review.length > 100 ? '...' : ''),
        userName: `${review.user.firstName} ${review.user.lastName}`,
        userInitials: `${review.user.firstName[0]}${review.user.lastName[0]}`,
        createdAt: review.createdAt,
        helpfulVotes: review.helpfulVotes
      }))
    });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;