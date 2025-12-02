import express from 'express';
import { protect, requireAdmin } from '../middleware/auth.js';
import Rating from '../models/Rating.js';
import UserActivity from '../models/UserActivity.js';

const router = express.Router();

// Get public ratings for testimonials (no auth required)
router.get('/public', async (req, res) => {
  try {
    const { limit = 6, industry, minRating = 4 } = req.query;
    
    const query = {
      status: 'approved',
      isPublic: true,
      rating: { $gte: parseInt(minRating) }
    };
    
    if (industry) {
      query['usageContext.industry'] = industry;
    }
    
    const ratings = await Rating.find(query)
      .populate('user', 'firstName lastName')
      .sort({ helpfulVotes: -1, createdAt: -1 })
      .limit(parseInt(limit));
    
    // Transform for testimonials display
    const testimonials = ratings.map(rating => ({
      id: rating._id,
      name: `${rating.user.firstName} ${rating.user.lastName}`,
      title: rating.title,
      content: rating.review,
      rating: rating.rating,
      company: rating.usageContext?.industry || 'Technology Company',
      role: rating.usageContext?.primaryUseCase || 'Data Professional',
      createdAt: rating.createdAt,
      helpfulVotes: rating.helpfulVotes,
      usageDuration: rating.usageContext?.usageDuration,
      categories: rating.categories,
      isVerified: rating.isVerified
    }));
    
    res.json({
      success: true,
      data: testimonials,
      meta: {
        total: testimonials.length,
        filters: { industry, minRating }
      }
    });
  } catch (error) {
    console.error('Error fetching public ratings:', error);
    res.status(500).json({
      error: 'Failed to fetch ratings',
      message: 'Internal server error'
    });
  }
});

// Get rating statistics (no auth required)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Rating.getAverageRating();
    
    // Get additional metrics
    const recentRatings = await Rating.countDocuments({
      status: 'approved',
      isPublic: true,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    
    const verifiedCount = await Rating.countDocuments({
      status: 'approved',
      isPublic: true,
      isVerified: true
    });
    
    res.json({
      success: true,
      data: {
        ...stats,
        recentRatings,
        verifiedRatings: verifiedCount,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    res.status(500).json({
      error: 'Failed to fetch rating statistics',
      message: 'Internal server error'
    });
  }
});

// Submit a new rating (requires auth)
router.post('/submit', protect, async (req, res) => {
  try {
    const {
      rating,
      title,
      review,
      categories,
      usageContext,
      isPublic = true
    } = req.body;
    
    // Validation
    if (!rating || !title || !review) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Rating, title, and review are required'
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Invalid rating',
        message: 'Rating must be between 1 and 5'
      });
    }
    
    // Check if user already has a rating
    const existingRating = await Rating.findOne({ user: req.user._id });
    if (existingRating) {
      return res.status(409).json({
        error: 'Rating already exists',
        message: 'You have already submitted a rating. You can update it instead.'
      });
    }
    
    // Create new rating
    const newRating = new Rating({
      user: req.user._id,
      rating,
      title: title.trim(),
      review: review.trim(),
      categories,
      usageContext,
      isPublic,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'web'
    });
    
    await newRating.save();
    
    // Log activity
    await UserActivity.logActivity({
      user: req.user._id,
      activityType: 'rating_submitted',
      description: `Submitted ${rating}-star rating: ${title}`,
      metadata: {
        rating,
        title,
        isPublic,
        success: true
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.status(201).json({
      success: true,
      message: 'Rating submitted successfully',
      data: {
        id: newRating._id,
        rating: newRating.rating,
        title: newRating.title,
        status: newRating.status
      }
    });
    
  } catch (error) {
    console.error('Error submitting rating:', error);
    
    // Log failed attempt
    try {
      await UserActivity.logActivity({
        user: req.user._id,
        activityType: 'rating_submitted',
        description: `Failed to submit rating: ${error.message}`,
        metadata: {
          error: error.message,
          success: false
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
    } catch (logError) {
      console.error('Failed to log rating error:', logError);
    }
    
    res.status(500).json({
      error: 'Failed to submit rating',
      message: 'Internal server error'
    });
  }
});

// Update user's rating (requires auth)
router.put('/update', protect, async (req, res) => {
  try {
    const {
      rating,
      title,
      review,
      categories,
      usageContext,
      isPublic
    } = req.body;
    
    const existingRating = await Rating.findOne({ user: req.user._id });
    if (!existingRating) {
      return res.status(404).json({
        error: 'Rating not found',
        message: 'No existing rating found to update'
      });
    }
    
    // Update fields
    if (rating !== undefined) existingRating.rating = rating;
    if (title !== undefined) existingRating.title = title.trim();
    if (review !== undefined) existingRating.review = review.trim();
    if (categories !== undefined) existingRating.categories = categories;
    if (usageContext !== undefined) existingRating.usageContext = usageContext;
    if (isPublic !== undefined) existingRating.isPublic = isPublic;
    
    // Reset approval status for review
    existingRating.status = 'pending';
    existingRating.reviewedBy = undefined;
    existingRating.reviewedAt = undefined;
    
    await existingRating.save();
    
    // Log activity
    await UserActivity.logActivity({
      user: req.user._id,
      activityType: 'rating_updated',
      description: `Updated ${rating}-star rating: ${title}`,
      metadata: {
        rating,
        title,
        previousStatus: existingRating.status,
        success: true
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.json({
      success: true,
      message: 'Rating updated successfully',
      data: {
        id: existingRating._id,
        rating: existingRating.rating,
        title: existingRating.title,
        status: existingRating.status
      }
    });
    
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({
      error: 'Failed to update rating',
      message: 'Internal server error'
    });
  }
});

// Get user's own rating (requires auth)
router.get('/my-rating', protect, async (req, res) => {
  try {
    const rating = await Rating.findOne({ user: req.user._id });
    
    if (!rating) {
      return res.json({
        success: true,
        data: null,
        message: 'No rating found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: rating._id,
        rating: rating.rating,
        title: rating.title,
        review: rating.review,
        categories: rating.categories,
        usageContext: rating.usageContext,
        isPublic: rating.isPublic,
        status: rating.status,
        helpfulVotes: rating.helpfulVotes,
        createdAt: rating.createdAt,
        updatedAt: rating.updatedAt
      }
    });
    
  } catch (error) {
    console.error('Error fetching user rating:', error);
    res.status(500).json({
      error: 'Failed to fetch rating',
      message: 'Internal server error'
    });
  }
});

// Mark rating as helpful (requires auth)
router.post('/:id/helpful', protect, async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({
        error: 'Rating not found',
        message: 'The specified rating does not exist'
      });
    }
    
    // Prevent users from marking their own ratings as helpful
    if (rating.user.toString() === req.user._id.toString()) {
      return res.status(400).json({
        error: 'Cannot mark own rating',
        message: 'You cannot mark your own rating as helpful'
      });
    }
    
    await rating.markHelpful();
    
    // Log activity
    await UserActivity.logActivity({
      user: req.user._id,
      activityType: 'rating_helpful',
      description: `Marked rating as helpful`,
      metadata: {
        ratingId: rating._id,
        ratingTitle: rating.title,
        newHelpfulCount: rating.helpfulVotes
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.json({
      success: true,
      message: 'Rating marked as helpful',
      data: {
        helpfulVotes: rating.helpfulVotes
      }
    });
    
  } catch (error) {
    console.error('Error marking rating as helpful:', error);
    res.status(500).json({
      error: 'Failed to mark rating as helpful',
      message: 'Internal server error'
    });
  }
});

// Admin routes
router.get('/admin/pending', protect, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const ratings = await Rating.find({ status: 'pending' })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Rating.countDocuments({ status: 'pending' });
    
    res.json({
      success: true,
      data: ratings,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
    
  } catch (error) {
    console.error('Error fetching pending ratings:', error);
    res.status(500).json({
      error: 'Failed to fetch pending ratings',
      message: 'Internal server error'
    });
  }
});

router.post('/admin/:id/approve', protect, requireAdmin, async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({
        error: 'Rating not found',
        message: 'The specified rating does not exist'
      });
    }
    
    await rating.approve(req.user._id);
    
    res.json({
      success: true,
      message: 'Rating approved successfully'
    });
    
  } catch (error) {
    console.error('Error approving rating:', error);
    res.status(500).json({
      error: 'Failed to approve rating',
      message: 'Internal server error'
    });
  }
});

router.post('/admin/:id/reject', protect, requireAdmin, async (req, res) => {
  try {
    const { reason } = req.body;
    const rating = await Rating.findById(req.params.id);
    
    if (!rating) {
      return res.status(404).json({
        error: 'Rating not found',
        message: 'The specified rating does not exist'
      });
    }
    
    await rating.reject(req.user._id, reason);
    
    res.json({
      success: true,
      message: 'Rating rejected successfully'
    });
    
  } catch (error) {
    console.error('Error rejecting rating:', error);
    res.status(500).json({
      error: 'Failed to reject rating',
      message: 'Internal server error'
    });
  }
});

// Get current user's rating
router.get('/my-rating', protect, async (req, res) => {
  try {
    const rating = await Rating.findOne({ 
      user: req.user._id 
    });

    if (!rating) {
      return res.json({
        success: true,
        data: null,
        message: 'No rating found'
      });
    }

    res.json({
      success: true,
      data: {
        id: rating._id,
        rating: rating.rating,
        content: rating.content,
        role: rating.role,
        company: rating.company
      }
    });
  } catch (error) {
    console.error('Error fetching user rating:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;