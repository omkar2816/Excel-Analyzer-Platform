import React from 'react';
import { motion } from 'framer-motion';
import { Star, TestTube } from 'lucide-react';
import useReviewPopup from '../../hooks/useReviewPopup';

const TestReviewSystem = () => {
  const { 
    forceShowPopup, 
    trackFileUpload, 
    trackChartGenerated, 
    getSessionStats,
    popupStats 
  } = useReviewPopup();

  const handleTestActions = {
    showPopup: () => {
      forceShowPopup();
    },
    trackUpload: async () => {
      await trackFileUpload();
      console.log('File upload tracked');
    },
    trackChart: async () => {
      await trackChartGenerated();
      console.log('Chart generation tracked');
    },
    showStats: () => {
      console.log('Session stats:', getSessionStats());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-sm"
    >
      <div className="flex items-center mb-3">
        <TestTube className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Review System Test</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleTestActions.showPopup}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Show Popup
          </button>
          
          <button
            onClick={handleTestActions.trackUpload}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Track Upload
          </button>
          
          <button
            onClick={handleTestActions.trackChart}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Track Chart
          </button>
          
          <button
            onClick={handleTestActions.showStats}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Show Stats
          </button>
        </div>
        
        {popupStats && (
          <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
            <div>Session: {Math.floor(popupStats.sessionDuration / 1000 / 60)}min</div>
            <div>Pages: {popupStats.pageViewCount}</div>
            <div>Active: {popupStats.activeTimeMinutes}min</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestReviewSystem;