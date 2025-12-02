import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Search,
  FileText,
  BarChart3,
  Settings,
  Shield,
  CreditCard,
  Users
} from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqCategories = [
    {
      icon: FileText,
      title: "Getting Started",
      color: "emerald",
      faqs: [
        {
          question: "How do I upload my Excel files?",
          answer: "To upload Excel files, navigate to the Files section in your dashboard and click 'Upload New File'. You can drag and drop files or use the file browser. We support .xlsx and .xls formats up to 50MB in size."
        },
        {
          question: "What file formats are supported?",
          answer: "We support Microsoft Excel formats including .xlsx, .xls, and .xlsm files. We also support CSV files. Make sure your data has proper headers in the first row for best results."
        },
        {
          question: "How do I create my first chart?",
          answer: "After uploading your data, go to the Charts section and click 'Create New Chart'. Our Smart Chart Configurator will analyze your data and suggest the best visualization types. You can customize colors, labels, and styling."
        },
        {
          question: "Is there a file size limit?",
          answer: "Yes, the maximum file size is 50MB for individual uploads. For larger datasets, consider splitting your data into smaller files or contact our support team for enterprise solutions."
        }
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Charts",
      color: "blue",
      faqs: [
        {
          question: "What types of charts can I create?",
          answer: "You can create various chart types including bar charts, line graphs, pie charts, scatter plots, heatmaps, and 3D visualizations. Our platform automatically suggests the best chart type based on your data structure."
        },
        {
          question: "How do I customize chart appearance?",
          answer: "Use the Chart Configurator to customize colors, fonts, labels, legends, and styling. You can save custom themes and apply them to multiple charts. Advanced users can access additional styling options in the settings panel."
        },
        {
          question: "Can I export my charts?",
          answer: "Yes! You can export charts in multiple formats including PNG, SVG, PDF, and interactive HTML. Go to the chart you want to export and click the 'Export' button in the top toolbar."
        },
        {
          question: "How does the statistical analysis work?",
          answer: "Our platform provides correlation analysis, regression models, trend detection, and statistical summaries. The AI-powered insights automatically identify patterns and anomalies in your data."
        }
      ]
    },
    {
      icon: Settings,
      title: "Account & Settings",
      color: "purple",
      faqs: [
        {
          question: "How do I change my password?",
          answer: "Go to Settings > Account Security and click 'Change Password'. You'll need to enter your current password and then set a new one. We recommend using a strong password with at least 8 characters."
        },
        {
          question: "Can I customize my dashboard?",
          answer: "Yes! You can rearrange dashboard widgets, choose your preferred theme (light/dark), and customize the layout. Your preferences are automatically saved and synced across devices."
        },
        {
          question: "How do I delete my account?",
          answer: "Account deletion can be requested from Settings > Account Management. Please note that this action is irreversible and all your data will be permanently deleted after a 30-day grace period."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, go to Settings > Profile Information to update your email address. You'll receive a verification email at your new address to confirm the change."
        }
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      color: "green",
      faqs: [
        {
          question: "How secure is my data?",
          answer: "We use enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Your files are processed securely and automatically deleted after analysis. We're SOC 2 Type II compliant."
        },
        {
          question: "Who can access my uploaded files?",
          answer: "Only you have access to your files. Our system processes files automatically without human intervention. Our staff cannot view your file contents unless you explicitly grant permission for support purposes."
        },
        {
          question: "How long are files stored?",
          answer: "Processed files are automatically deleted after 24 hours. If you want to keep files longer, you can save them to your account storage. Original files can be permanently deleted anytime from the Files section."
        },
        {
          question: "Is the platform GDPR compliant?",
          answer: "Yes, we're fully GDPR compliant. You have the right to access, modify, or delete your personal data at any time. We provide data portability and respect your privacy choices."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      color: "orange",
      faqs: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes basic analytics, up to 10 file uploads per month, standard charts, and community support. You can upgrade anytime to access advanced features."
        },
        {
          question: "How does billing work?",
          answer: "We offer monthly and annual billing cycles. You'll be charged automatically on your billing date. You can view invoices and update payment methods in the Billing section of your account."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription anytime without penalties. Your account will remain active until the end of your current billing period, then revert to the free plan."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for annual plans. Monthly plan cancellations take effect at the end of the current billing cycle. Contact support for specific refund requests."
        }
      ]
    },
    {
      icon: Users,
      title: "Collaboration & Sharing",
      color: "pink",
      faqs: [
        {
          question: "Can I share charts with others?",
          answer: "Yes! You can generate shareable links for your charts, export them as images or PDFs, or embed interactive charts in websites. You can also set permission levels for shared content."
        },
        {
          question: "How do team accounts work?",
          answer: "Team accounts allow multiple users to collaborate on projects, share files, and access centralized billing. Team admins can manage permissions and monitor usage across the organization."
        },
        {
          question: "Can I collaborate in real-time?",
          answer: "Real-time collaboration is available on Pro and Enterprise plans. Team members can work on the same charts simultaneously, with changes synced automatically."
        },
        {
          question: "What are the sharing permissions?",
          answer: "You can set permissions for view-only, comment, or full edit access. Shared content can be password-protected and set to expire after a specific time period."
        }
      ]
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFaq = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setExpandedFaq(expandedFaq === key ? null : key);
  };

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
            <HelpCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find quick answers to common questions about our analytics platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl bg-${category.color}-100 dark:bg-${category.color}-900/30 flex items-center justify-center mr-4`}>
                    <category.icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {category.faqs.length} question{category.faqs.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.faqs.map((faq, faqIndex) => {
                  const isExpanded = expandedFaq === `${categoryIndex}-${faqIndex}`;
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => toggleFaq(categoryIndex, faqIndex)}
                        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try searching with different keywords or browse all categories above.
            </p>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-emerald-100 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Contact Support
            </button>
            <button className="bg-white text-emerald-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;