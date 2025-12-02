import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Eye, Shield, ToggleLeft, ToggleRight } from 'lucide-react';

const Cookies = () => {
  const navigate = useNavigate();
  
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "Required for basic website functionality and security",
      examples: [
        "User authentication tokens",
        "Session management",
        "Security protection",
        "Form submission data"
      ],
      required: true
    },
    {
      icon: Eye,
      title: "Analytics Cookies",
      description: "Help us understand how users interact with our platform",
      examples: [
        "Page visit tracking",
        "Feature usage statistics",
        "Performance monitoring",
        "Error reporting"
      ],
      required: false
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "Remember your preferences and settings",
      examples: [
        "Theme preferences (dark/light mode)",
        "Language settings",
        "Dashboard layouts",
        "Notification preferences"
      ],
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center py-4 text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-emerald-900/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Cookie className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Understanding how we use cookies to improve your experience on our platform.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: December 3, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none dark:prose-invert"
        >
          {/* Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Are Cookies?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Cookies are small text files that are stored on your computer or mobile device when you 
              visit our website. They help us provide you with a better experience by remembering your 
              preferences and understanding how you use our platform.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use cookies responsibly and in compliance with applicable privacy laws. You have 
              full control over which cookies you accept, except for essential cookies that are 
              required for the website to function properly.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="grid gap-8 mb-8">
            {cookieTypes.map((cookieType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <cookieType.icon className="w-6 h-6 text-emerald-600 mr-3" />
                    {cookieType.title}
                  </h2>
                  <div className="flex items-center">
                    {cookieType.required ? (
                      <div className="flex items-center text-orange-600 dark:text-orange-400">
                        <ToggleRight className="w-6 h-6 mr-2" />
                        <span className="text-sm font-medium">Required</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                        <ToggleLeft className="w-6 h-6 mr-2" />
                        <span className="text-sm font-medium">Optional</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {cookieType.description}
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                  <ul className="space-y-1">
                    {cookieType.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-gray-600 dark:text-gray-300 flex items-center">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 flex-shrink-0"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cookie Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Settings className="w-6 h-6 text-emerald-600 mr-3" />
              Managing Your Cookie Preferences
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Browser Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  You can control cookies through your browser settings:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Block all cookies (may affect functionality)</li>
                  <li>• Delete existing cookies</li>
                  <li>• Set preferences for specific websites</li>
                  <li>• Receive notifications before accepting cookies</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Platform Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Manage your preferences directly on our platform:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Cookie consent banner</li>
                  <li>• Account privacy settings</li>
                  <li>• Analytics opt-out options</li>
                  <li>• Functional cookie preferences</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Retention Periods
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-2 text-gray-900 dark:text-white">Cookie Type</th>
                    <th className="pb-2 text-gray-900 dark:text-white">Retention Period</th>
                    <th className="pb-2 text-gray-900 dark:text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3">Session Cookies</td>
                    <td className="py-3">Until browser closes</td>
                    <td className="py-3">Temporary functionality</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3">Authentication</td>
                    <td className="py-3">30 days</td>
                    <td className="py-3">Keep you logged in</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3">Preferences</td>
                    <td className="py-3">1 year</td>
                    <td className="py-3">Remember settings</td>
                  </tr>
                  <tr>
                    <td className="py-3">Analytics</td>
                    <td className="py-3">2 years</td>
                    <td className="py-3">Usage patterns</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> cookies@excelanalytics.com<br />
                <strong>Subject:</strong> Cookie Policy Inquiry
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;