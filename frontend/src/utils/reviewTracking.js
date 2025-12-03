import axios from '../config/axios';

class ActivityTracker {
  constructor() {
    this.anonymousId = this.getOrCreateAnonymousId();
    this.sessionStartTime = Date.now();
    this.activeTimeCounter = 0;
    this.pageViewCount = 0;
    this.isActive = true;
    this.lastActivityTime = Date.now();
    
    this.initializeTracking();
  }

  getOrCreateAnonymousId() {
    let anonymousId = localStorage.getItem('anonymousId');
    if (!anonymousId) {
      anonymousId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('anonymousId', anonymousId);
    }
    return anonymousId;
  }

  initializeTracking() {
    // Track page views
    this.trackActivity('page_view');
    
    // Track active time every minute
    this.activeTimeInterval = setInterval(() => {
      if (this.isActive && (Date.now() - this.lastActivityTime) < 60000) {
        this.activeTimeCounter++;
        if (this.activeTimeCounter % 1 === 0) { // Every minute
          this.trackActivity('active_time', { minutes: 1 });
        }
      }
    }, 60000); // 1 minute

    // Listen for user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleActivity = () => {
      this.lastActivityTime = Date.now();
      this.isActive = true;
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Handle page visibility
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  async trackActivity(activityType, data = {}) {
    try {
      const response = await axios.post('/api/review-popup/track-activity', {
        anonymousId: this.anonymousId,
        activityType,
        data
      });
      
      return response.data;
    } catch (error) {
      console.error('Error tracking activity:', error);
      return null;
    }
  }

  async trackFileUpload() {
    return this.trackActivity('file_upload');
  }

  async trackChartGenerated() {
    return this.trackActivity('chart_generated');
  }

  async trackReportAnalyzed() {
    return this.trackActivity('report_analyzed');
  }

  async trackPageView() {
    this.pageViewCount++;
    return this.trackActivity('page_view');
  }

  cleanup() {
    if (this.activeTimeInterval) {
      clearInterval(this.activeTimeInterval);
    }
  }

  getSessionStats() {
    return {
      sessionDuration: Date.now() - this.sessionStartTime,
      activeTimeMinutes: this.activeTimeCounter,
      pageViewCount: this.pageViewCount,
      anonymousId: this.anonymousId
    };
  }
}

// Review Popup Manager
class ReviewPopupManager {
  constructor() {
    this.isPopupShown = false;
    this.checkInterval = null;
    this.callbacks = {
      onShow: null,
      onHide: null,
      onSubmit: null,
      onPreference: null
    };
  }

  initialize(callbacks = {}) {
    this.callbacks = { ...this.callbacks, ...callbacks };
    
    // Check popup conditions every 30 seconds
    this.checkInterval = setInterval(() => {
      this.checkAndShowPopup();
    }, 30000);

    // Initial check after 10 seconds
    setTimeout(() => {
      this.checkAndShowPopup();
    }, 10000);
  }

  async checkAndShowPopup() {
    if (this.isPopupShown) return;

    try {
      const anonymousId = localStorage.getItem('anonymousId');
      const response = await axios.get('/api/review-popup/status', {
        params: { anonymousId }
      });

      const { shouldShow, reason, hasReview } = response.data;

      if (shouldShow && !hasReview) {
        this.showPopup();
      } else {
        console.log('Popup not shown:', reason);
      }
    } catch (error) {
      console.error('Error checking popup status:', error);
    }
  }

  showPopup() {
    if (this.isPopupShown) return;
    
    this.isPopupShown = true;
    if (this.callbacks.onShow) {
      this.callbacks.onShow();
    }
  }

  hidePopup() {
    this.isPopupShown = false;
    if (this.callbacks.onHide) {
      this.callbacks.onHide();
    }
  }

  handleSubmit(reviewData) {
    this.isPopupShown = false;
    if (this.callbacks.onSubmit) {
      this.callbacks.onSubmit(reviewData);
    }
  }

  handlePreference(preference) {
    this.isPopupShown = false;
    if (this.callbacks.onPreference) {
      this.callbacks.onPreference(preference);
    }
  }

  cleanup() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  // Force show for testing
  forceShow() {
    this.showPopup();
  }
}

// Singleton instances
const activityTracker = new ActivityTracker();
const reviewPopupManager = new ReviewPopupManager();

export { ActivityTracker, ReviewPopupManager, activityTracker, reviewPopupManager };