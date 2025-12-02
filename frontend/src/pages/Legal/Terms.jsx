import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();
  
  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Excel Analytics Platform, you agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please discontinue use of our services",
        "We reserve the right to modify these terms at any time with notice",
        "Continued use after changes constitutes acceptance of new terms"
      ]
    },
    {
      icon: CheckCircle,
      title: "Permitted Use",
      content: [
        "Use the platform for legitimate data analysis purposes",
        "Upload only data files you own or have permission to analyze",
        "Respect intellectual property rights of others",
        "Comply with all applicable laws and regulations",
        "Use the service in accordance with our usage policies"
      ]
    },
    {
      icon: XCircle,
      title: "Prohibited Activities",
      content: [
        "Upload malicious files or attempt to compromise our systems",
        "Share your account credentials with unauthorized users",
        "Use the platform to process illegal or harmful content",
        "Attempt to reverse engineer our software or algorithms",
        "Violate any applicable laws or third-party rights"
      ]
    },
    {
      icon: Shield,
      title: "Data Security & Privacy",
      content: [
        "We implement industry-standard security measures to protect your data",
        "Your files are processed securely and deleted after analysis",
        "We do not access the content of your files except for processing",
        "Data transmission is encrypted using TLS 1.3",
        "Regular security audits ensure system integrity"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "The platform is provided 'as is' without warranties of any kind",
        "We are not liable for any data loss or business interruption",
        "Our liability is limited to the amount paid for our services",
        "Users are responsible for backing up their important data",
        "We disclaim liability for third-party integrations or services"
      ]
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
            <Scale className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Legal terms and conditions governing the use of our analytics platform.
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Agreement Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the Excel Analytics Platform 
              service operated by our team. Please read these terms carefully before using our platform. 
              By using our service, you agree to be bound by these terms and our Privacy Policy.
            </p>
          </div>

          <div className="grid gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <section.icon className="w-6 h-6 text-emerald-600 mr-3" />
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 dark:text-gray-300 flex items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid md:grid-cols-2 gap-8 mt-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Account Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to terminate accounts that violate these terms. 
                You may also terminate your account at any time.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• 30-day notice for policy violations</li>
                <li>• Immediate termination for security threats</li>
                <li>• Data export available before termination</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may update these terms from time to time. Users will be notified 
                of significant changes.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Email notification for major changes</li>
                <li>• 30-day notice period</li>
                <li>• Continued use implies acceptance</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> legal@excelanalytics.com<br />
                <strong>Subject:</strong> Terms of Service Inquiry
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;