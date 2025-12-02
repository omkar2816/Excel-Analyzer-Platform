import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    
    // Rating Information
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxLength: 100
    },
    review: { 
      type: String, 
      required: true,
      trim: true,
      maxLength: 1000
    },
    
    // User Experience Categories (optional detailed ratings)
    categories: {
      usability: { type: Number, min: 1, max: 5 },
      performance: { type: Number, min: 1, max: 5 },
      features: { type: Number, min: 1, max: 5 },
      support: { type: Number, min: 1, max: 5 },
      value: { type: Number, min: 1, max: 5 }
    },
    
    // Verification and Status
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    isPublic: { 
      type: Boolean, 
      default: true 
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'flagged'],
      default: 'pending'
    },
    
    // Usage Context
    usageContext: {
      industry: { type: String, trim: true },
      companySize: { 
        type: String, 
        enum: ['startup', 'small', 'medium', 'large', 'enterprise'] 
      },
      usageDuration: { 
        type: String, 
        enum: ['less_than_month', '1-3_months', '3-6_months', '6-12_months', 'over_year'] 
      },
      primaryUseCase: { type: String, trim: true }
    },
    
    // Engagement Metrics
    helpfulVotes: { 
      type: Number, 
      default: 0 
    },
    reportCount: { 
      type: Number, 
      default: 0 
    },
    
    // Admin Notes
    adminNotes: { type: String },
    reviewedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    reviewedAt: { type: Date },
    
    // Metadata
    ipAddress: { type: String },
    userAgent: { type: String },
    source: { 
      type: String, 
      enum: ['web', 'mobile', 'email_survey', 'admin_import'],
      default: 'web'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
ratingSchema.index({ user: 1, createdAt: -1 });
ratingSchema.index({ rating: -1, status: 1, isPublic: 1 });
ratingSchema.index({ status: 1, isPublic: 1, createdAt: -1 });
ratingSchema.index({ 'usageContext.industry': 1 });

// Ensure one rating per user
ratingSchema.index({ user: 1 }, { unique: true });

// Virtual for average category rating
ratingSchema.virtual('avgCategoryRating').get(function() {
  const cats = this.categories;
  if (!cats) return null;
  
  const ratings = [cats.usability, cats.performance, cats.features, cats.support, cats.value]
    .filter(r => r && r > 0);
  
  if (ratings.length === 0) return null;
  return Number((ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1));
});

// Virtual for rating age
ratingSchema.virtual('ageInDays').get(function() {
  return Math.floor((new Date() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Static methods
ratingSchema.statics.getAverageRating = async function() {
  const result = await this.aggregate([
    { $match: { status: 'approved', isPublic: true } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);
  
  if (!result.length) {
    return { avgRating: 0, totalRatings: 0, distribution: {} };
  }
  
  const data = result[0];
  
  // Calculate distribution
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  data.ratingDistribution.forEach(rating => {
    distribution[rating] = (distribution[rating] || 0) + 1;
  });
  
  return {
    avgRating: Number(data.avgRating.toFixed(1)),
    totalRatings: data.totalRatings,
    distribution
  };
};

ratingSchema.statics.getFeaturedReviews = async function(limit = 6) {
  return this.find({
    status: 'approved',
    isPublic: true,
    rating: { $gte: 4 }
  })
    .populate('user', 'firstName lastName email')
    .sort({ helpfulVotes: -1, createdAt: -1 })
    .limit(limit);
};

// Instance methods
ratingSchema.methods.markHelpful = function() {
  this.helpfulVotes += 1;
  return this.save();
};

ratingSchema.methods.approve = function(adminId) {
  this.status = 'approved';
  this.reviewedBy = adminId;
  this.reviewedAt = new Date();
  return this.save();
};

ratingSchema.methods.reject = function(adminId, reason) {
  this.status = 'rejected';
  this.reviewedBy = adminId;
  this.reviewedAt = new Date();
  this.adminNotes = reason;
  return this.save();
};

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;