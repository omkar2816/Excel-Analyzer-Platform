import { useState, useEffect, useCallback } from 'react';
import { activityTracker, reviewPopupManager } from '../utils/reviewTracking';

const useReviewPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupStats, setPopupStats] = useState(null);

  const showPopup = useCallback(() => {
    setIsPopupVisible(true);
  }, []);

  const hidePopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  const handleSubmit = useCallback((reviewData) => {
    console.log('Review submitted:', reviewData);
    reviewPopupManager.handleSubmit(reviewData);
    setIsPopupVisible(false);
  }, []);

  const handlePreference = useCallback((preference) => {
    console.log('Preference set:', preference);
    reviewPopupManager.handlePreference(preference);
    setIsPopupVisible(false);
  }, []);

  // Track meaningful actions
  const trackFileUpload = useCallback(() => {
    return activityTracker.trackFileUpload();
  }, []);

  const trackChartGenerated = useCallback(() => {
    return activityTracker.trackChartGenerated();
  }, []);

  const trackReportAnalyzed = useCallback(() => {
    return activityTracker.trackReportAnalyzed();
  }, []);

  const trackPageView = useCallback(() => {
    return activityTracker.trackPageView();
  }, []);

  // Get current session statistics
  const getSessionStats = useCallback(() => {
    return activityTracker.getSessionStats();
  }, []);

  // Force show popup (for testing)
  const forceShowPopup = useCallback(() => {
    reviewPopupManager.forceShow();
  }, []);

  useEffect(() => {
    // Initialize the review popup manager
    reviewPopupManager.initialize({
      onShow: showPopup,
      onHide: hidePopup,
      onSubmit: handleSubmit,
      onPreference: handlePreference
    });

    // Get initial stats
    setPopupStats(getSessionStats());

    // Update stats every minute
    const statsInterval = setInterval(() => {
      setPopupStats(getSessionStats());
    }, 60000);

    // Cleanup on unmount
    return () => {
      clearInterval(statsInterval);
      reviewPopupManager.cleanup();
      activityTracker.cleanup();
    };
  }, [showPopup, hidePopup, handleSubmit, handlePreference, getSessionStats]);

  return {
    isPopupVisible,
    hidePopup,
    handleSubmit,
    handlePreference,
    trackFileUpload,
    trackChartGenerated,
    trackReportAnalyzed,
    trackPageView,
    getSessionStats,
    popupStats,
    forceShowPopup // For testing purposes
  };
};

export default useReviewPopup;