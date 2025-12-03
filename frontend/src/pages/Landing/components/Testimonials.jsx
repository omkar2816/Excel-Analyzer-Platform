import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Plus, ThumbsUp, MessageCircle } from 'lucide-react';
import RatingModal from '../../../components/RatingModal';
import { useSelector } from 'react-redux';
import axios from '../../../config/axios';

const Testimonials = () => {
  const [platformStats, setPlatformStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [ratingStats, setRatingStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // Fetch platform statistics and testimonials
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch platform stats
        const statsResponse = await axios.get('/api/analytics/platform-stats');
        setPlatformStats(statsResponse.data);

        // Fetch real testimonials from popup stats
        const testimonialsResponse = await axios.get('/api/review-popup/stats');
        const testimonialsData = testimonialsResponse.data;
        
        setTestimonials(testimonialsData.featuredReviews || []);
        setRatingStats({
          avgRating: testimonialsData.avgRating || 0,
          totalRatings: testimonialsData.totalRatings || 0,
          distribution: testimonialsData.distribution || {}
        });

        // Fetch user's rating if authenticated
        if (user) {
          try {
            const userRatingResponse = await axios.get('/api/ratings/my-rating');
            setUserRating(userRatingResponse.data.success ? userRatingResponse.data.data : null);
          } catch (error) {
            console.error('Error fetching user rating:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Handle rating submission
  const handleRatingSubmit = async (ratingData) => {
    try {
      const endpoint = userRating ? '/api/ratings/update' : '/api/ratings/submit';
      const method = userRating ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(ratingData)
      });

      if (response.ok) {
        // Refresh data after successful submission
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  };

  // Mark rating as helpful
  const handleMarkHelpful = async (ratingId) => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/ratings/${ratingId}/helpful`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        // Update the testimonial's helpful count locally
        setTestimonials(prev => prev.map(testimonial => 
          testimonial.id === ratingId 
            ? { ...testimonial, helpfulVotes: (testimonial.helpfulVotes || 0) + 1 }
            : testimonial
        ));
      }
    } catch (error) {
      console.error('Error marking as helpful:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50/40 to-green-50/30 dark:from-gray-800 dark:via-emerald-900/10 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Analytics Professionals
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              {" "}Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Trusted by data scientists, analysts, and business intelligence experts who rely on our platform for critical insights.
          </p>
          
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center mt-8 space-x-2"
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 transition-colors ${
                    i < Math.round(ratingStats?.averageRating || 0) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`} 
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white ml-3">
              {ratingStats?.averageRating?.toFixed(1) || '0.0'}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              out of 5 ({ratingStats?.totalRatings || '0'} reviews)
            </span>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.length > 0 ? testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id || testimonial.id || index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-emerald-200 dark:text-emerald-800" />
              
              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 transition-colors ${
                        i < (testimonial.rating || 0) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.rating || 0}/5
                </span>
              </div>
              
              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.userName ? testimonial.userName.charAt(0).toUpperCase() : testimonial.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.userName || testimonial.name || 'Anonymous User'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role || 'Platform User'}
                    </p>
                    {testimonial.company && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Helpful Button */}
                {user && (
                  <button
                    onClick={() => handleMarkHelpful(testimonial._id)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{testimonial.helpfulVotes || 0}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Be the first to share your experience with our platform
              </p>
              {user && (
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Write First Review
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join Leading Analytics Teams
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Experience the power of advanced data analytics and intelligent business insights. 
              Start your free trial today and discover why data professionals choose our platform.
            </p>
            
            {/* User Rating CTA */}
            {user && (
              <div className="mb-6">
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <Star className="w-5 h-5" />
                  {userRating ? 'Update Your Rating' : 'Share Your Experience'}
                </button>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {platformStats ? `${platformStats.uptime}%` : '99.9%'}
                </div>
                <div className="text-emerald-200 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-emerald-200 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">SOC 2</div>
                <div className="text-emerald-200 text-sm">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">GDPR</div>
                <div className="text-emerald-200 text-sm">Ready</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
        existingRating={userRating}
      />
    </section>
  );
};

export default Testimonials;
