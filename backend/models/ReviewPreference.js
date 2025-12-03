import mongoose from 'mongoose';

const reviewPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null for anonymous users
  },
  anonymousId: {
    type: String,
    default: null // for anonymous users
  },
  preference: {
    type: String,
    enum: ['never', 'later', 'dismissed'],
    default: null
  },
  remindAt: {
    type: Date,
    default: null
  },
  lastShown: {
    type: Date,
    default: null
  },
  activityCount: {
    type: Number,
    default: 0
  },
  targetActivityCount: {
    type: Number,
    default: 10 // show after 10 activities by default
  },
  pageViewCount: {
    type: Number,
    default: 0
  },
  activeTimeMinutes: {
    type: Number,
    default: 0
  },
  meaningfulActions: {
    fileUploads: { type: Number, default: 0 },
    chartsGenerated: { type: Number, default: 0 },
    reportsAnalyzed: { type: Number, default: 0 }
  },
  deviceFingerprint: {
    type: String,
    default: null
  },
  sessionStartTime: {
    type: Date,
    default: Date.now
  },
  totalSessions: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
reviewPreferenceSchema.index({ userId: 1 });
reviewPreferenceSchema.index({ anonymousId: 1 });
reviewPreferenceSchema.index({ deviceFingerprint: 1 });
reviewPreferenceSchema.index({ preference: 1, remindAt: 1 });

// Static methods
reviewPreferenceSchema.statics.shouldShowPopup = async function(userId, anonymousId, deviceFingerprint) {
  const preference = await this.findOne({
    $or: [
      { userId: userId },
      { anonymousId: anonymousId },
      { deviceFingerprint: deviceFingerprint }
    ]
  });

  if (!preference) {
    // New user, check if they meet minimum criteria
    return {
      shouldShow: false,
      reason: 'new_user',
      preference: null
    };
  }

  // Never show again
  if (preference.preference === 'never') {
    return {
      shouldShow: false,
      reason: 'never_preference',
      preference
    };
  }

  // Currently dismissed for this session
  if (preference.preference === 'dismissed') {
    const sessionStart = new Date(Date.now() - 4 * 60 * 60 * 1000); // 4 hours ago
    if (preference.updatedAt > sessionStart) {
      return {
        shouldShow: false,
        reason: 'dismissed_this_session',
        preference
      };
    }
  }

  // Check remind later conditions
  if (preference.preference === 'later' && preference.remindAt) {
    if (new Date() < preference.remindAt) {
      return {
        shouldShow: false,
        reason: 'remind_later_not_ready',
        preference
      };
    }
  }

  // Check activity thresholds
  const totalMeaningfulActions = 
    preference.meaningfulActions.fileUploads +
    preference.meaningfulActions.chartsGenerated +
    preference.meaningfulActions.reportsAnalyzed;

  const meetsActivityThreshold = 
    preference.activityCount >= preference.targetActivityCount ||
    totalMeaningfulActions >= 3 ||
    preference.pageViewCount >= 15 ||
    preference.activeTimeMinutes >= 30;

  if (!meetsActivityThreshold) {
    return {
      shouldShow: false,
      reason: 'activity_threshold_not_met',
      preference,
      progress: {
        activityCount: preference.activityCount,
        targetActivityCount: preference.targetActivityCount,
        meaningfulActions: totalMeaningfulActions,
        pageViewCount: preference.pageViewCount,
        activeTimeMinutes: preference.activeTimeMinutes
      }
    };
  }

  // Check if enough time has passed since last shown
  if (preference.lastShown) {
    const daysSinceLastShown = (new Date() - preference.lastShown) / (1000 * 60 * 60 * 24);
    if (daysSinceLastShown < 7) { // Wait at least 7 days
      return {
        shouldShow: false,
        reason: 'too_soon_since_last_shown',
        preference
      };
    }
  }

  return {
    shouldShow: true,
    reason: 'criteria_met',
    preference
  };
};

reviewPreferenceSchema.statics.trackActivity = async function(userId, anonymousId, deviceFingerprint, activityType, data = {}) {
  const filter = userId 
    ? { userId } 
    : { $or: [{ anonymousId }, { deviceFingerprint }] };

  const update = {
    $inc: { activityCount: 1 },
    $setOnInsert: {
      userId,
      anonymousId,
      deviceFingerprint,
      sessionStartTime: new Date()
    }
  };

  // Track specific meaningful actions
  switch (activityType) {
    case 'file_upload':
      update.$inc['meaningfulActions.fileUploads'] = 1;
      break;
    case 'chart_generated':
      update.$inc['meaningfulActions.chartsGenerated'] = 1;
      break;
    case 'report_analyzed':
      update.$inc['meaningfulActions.reportsAnalyzed'] = 1;
      break;
    case 'page_view':
      update.$inc.pageViewCount = 1;
      break;
    case 'active_time':
      update.$inc.activeTimeMinutes = data.minutes || 1;
      break;
  }

  return this.findOneAndUpdate(filter, update, { 
    upsert: true, 
    new: true,
    setDefaultsOnInsert: true 
  });
};

const ReviewPreference = mongoose.model('ReviewPreference', reviewPreferenceSchema);
export default ReviewPreference;