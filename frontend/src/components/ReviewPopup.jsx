import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Clock, Ban } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from '../config/axios';

const ReviewPopup = ({ isVisible, onClose, onSubmit, onPreference }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState({
    usability: 0,
    performance: 0,
    features: 0,
    support: 0,
    value: 0
  });
  const [showCategories, setShowCategories] = useState(false);

  const { user } = useSelector(state => state.auth);
  const isDarkMode = document.documentElement.classList.contains('dark');

  const categoryLabels = {
    usability: 'Ease of Use',
    performance: 'Performance',
    features: 'Features',
    support: 'Support',
    value: 'Value for Money'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !title.trim() || !review.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const anonymousId = localStorage.getItem('anonymousId');
      
      await axios.post('/api/review-popup/submit', {
        rating,
        title: title.trim(),
        review: review.trim(),
        categories: showCategories ? categories : undefined,
        anonymousId
      });

      onSubmit({ rating, title, review, categories });
      onClose();
      
      // Reset form
      setRating(0);
      setTitle('');
      setReview('');
      setCategories({
        usability: 0,
        performance: 0,
        features: 0,
        support: 0,
        value: 0
      });
      
      alert('Thank you for your review! It will be published after approval.');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.error || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreference = async (preference) => {
    try {
      const anonymousId = localStorage.getItem('anonymousId');
      await axios.post('/api/review-popup/preference', {
        preference,
        anonymousId,
        remindDays: preference === 'later' ? 7 : undefined
      });
      
      onPreference(preference);
      onClose();
    } catch (error) {
      console.error('Error saving preference:', error);
    }
  };

  const renderStars = (currentRating, onStarClick, onStarHover, size = 24) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            className={`transition-colors duration-200 ${
              star <= currentRating 
                ? 'text-yellow-400' 
                : isDarkMode ? 'text-gray-600' : 'text-gray-300'
            }`}
            onClick={() => onStarClick(star)}
            onMouseEnter={() => onStarHover && onStarHover(star)}
            onMouseLeave={() => onStarHover && onStarHover(0)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star size={size} fill={star <= currentRating ? 'currentColor' : 'none'} />
          </motion.button>
        ))}
      </div>
    );
  };

  const glassmorphismStyles = {
    background: isDarkMode 
      ? 'rgba(17, 25, 40, 0.75)' 
      : 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.125)' 
      : '1px solid rgba(209, 213, 219, 0.3)',
    boxShadow: isDarkMode
      ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      : '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <style jsx>{`
        .review-popup-container::-webkit-scrollbar {
          width: 6px;
        }
        .review-popup-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .review-popup-container::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#6b7280' : '#d1d5db'};
          border-radius: 3px;
        }
        .review-popup-container::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#9ca3af' : '#9ca3af'};
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: isDarkMode 
            ? 'rgba(0, 0, 0, 0.5)' 
            : 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="review-popup-container w-full max-w-lg max-h-[85vh] rounded-2xl p-8 overflow-y-auto"
          style={{
            ...glassmorphismStyles,
            scrollbarWidth: 'thin',
            scrollbarColor: isDarkMode ? '#6b7280 transparent' : '#d1d5db transparent'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Rate Your Experience
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                Help us improve by sharing your thoughts
              </p>
            </div>
            <motion.button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                isDarkMode 
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Overall Rating */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Overall Rating *
              </label>
              {renderStars(hoverRating || rating, setRating, setHoverRating, 32)}
            </div>

            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Review Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                maxLength={100}
                className={`w-full px-4 py-3 rounded-2xl border transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10'
                    : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/70'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                required
              />
            </div>

            {/* Review Text */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your Review *
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your detailed experience with our platform..."
                rows={4}
                maxLength={1000}
                className={`w-full px-4 py-3 rounded-2xl border transition-all duration-200 resize-none ${
                  isDarkMode
                    ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/10'
                    : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/70'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                required
              />
              <div className={`text-xs mt-1 text-right ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {review.length}/1000
              </div>
            </div>

            {/* Detailed Categories (Optional) */}
            <div>
              <button
                type="button"
                onClick={() => setShowCategories(!showCategories)}
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                } transition-colors`}
              >
                {showCategories ? 'Hide' : 'Show'} Detailed Ratings (Optional)
              </button>
              
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {label}
                        </span>
                        {renderStars(
                          categories[key],
                          (rating) => setCategories(prev => ({ ...prev, [key]: rating })),
                          null,
                          16
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting || !rating || !title.trim() || !review.trim()}
                className={`w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200 ${
                  isSubmitting || !rating || !title.trim() || !review.trim()
                    ? isDarkMode 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isDarkMode
                      ? 'bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 text-black hover:from-amber-500 hover:via-yellow-500 hover:to-orange-600 font-semibold shadow-lg'
                      : 'bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-400 text-black hover:from-amber-400 hover:via-yellow-400 hover:to-orange-500 font-semibold shadow-lg'
                } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </motion.button>

              <div className="flex space-x-2">
                <motion.button
                  type="button"
                  onClick={() => handlePreference('later')}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      : 'bg-black/5 text-gray-600 hover:bg-black/10 hover:text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Clock size={16} className="inline mr-2" />
                  Remind Later
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => handlePreference('never')}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200'
                      : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
                  } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Ban size={16} className="inline mr-2" />
                  Never Ask
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewPopup;