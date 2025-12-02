import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Code, 
  FileText, 
  Zap, 
  BarChart3,
  Settings,
  Play,
  Copy,
  ExternalLink,
  ChevronRight,
  Download,
  GitBranch,
  ArrowLeft
} from 'lucide-react';

const Documentation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      content: [
        {
          title: 'Quick Start Guide',
          description: 'Get up and running in minutes',
          type: 'guide'
        },
        {
          title: 'Account Setup',
          description: 'Setting up your analytics account',
          type: 'guide'
        },
        {
          title: 'First Data Upload',
          description: 'Upload and analyze your first Excel file',
          type: 'tutorial'
        }
      ]
    },
    {
      id: 'data-upload',
      title: 'Data Upload & Processing',
      icon: FileText,
      content: [
        {
          title: 'Supported File Formats',
          description: 'Excel, CSV, and other supported formats',
          type: 'reference'
        },
        {
          title: 'Data Preprocessing',
          description: 'How we clean and prepare your data',
          type: 'guide'
        },
        {
          title: 'File Size Limits',
          description: 'Understanding upload limitations',
          type: 'reference'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Features',
      icon: BarChart3,
      content: [
        {
          title: 'Chart Types',
          description: 'Available visualization options',
          type: 'reference'
        },
        {
          title: 'Statistical Analysis',
          description: 'Built-in statistical tools',
          type: 'guide'
        },
        {
          title: 'AI-Powered Insights',
          description: 'Automated pattern detection',
          type: 'tutorial'
        }
      ]
    },
    {
      id: 'api',
      title: 'Developer Tools',
      icon: Code,
      content: [
        {
          title: 'SDK Overview',
          description: 'JavaScript SDK for developers',
          type: 'reference'
        },
        {
          title: 'Authentication',
          description: 'API authentication methods',
          type: 'guide'
        },
        {
          title: 'Webhooks',
          description: 'Real-time data notifications',
          type: 'tutorial'
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Zap,
      content: [
        {
          title: 'Excel Add-in',
          description: 'Direct Excel integration',
          type: 'guide'
        },
        {
          title: 'Power BI Connector',
          description: 'Connect with Power BI',
          type: 'tutorial'
        },
        {
          title: 'Custom Integrations',
          description: 'Build your own integrations',
          type: 'reference'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      icon: Settings,
      content: [
        {
          title: 'Custom Formulas',
          description: 'Create advanced calculations',
          type: 'guide'
        },
        {
          title: 'Automation',
          description: 'Automate your analytics workflow',
          type: 'tutorial'
        },
        {
          title: 'Enterprise Features',
          description: 'Team collaboration and management',
          type: 'reference'
        }
      ]
    }
  ];

  const codeExample = `// Initialize Excel Analytics SDK
import ExcelAnalytics from '@excel-analytics/sdk';

const analytics = new ExcelAnalytics({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Upload and analyze a file
async function analyzeFile(file) {
  try {
    const result = await analytics.upload({
      file: file,
      options: {
        autoAnalyze: true,
        chartTypes: ['bar', 'line', 'scatter']
      }
    });
    
    console.log('Analysis complete:', result);
    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
  }
}`;

  const quickStartSteps = [
    {
      step: 1,
      title: "Create Account",
      description: "Sign up for a free Excel Analytics account"
    },
    {
      step: 2,
      title: "Upload Data",
      description: "Upload your first Excel file or CSV"
    },
    {
      step: 3,
      title: "Generate Charts",
      description: "Create beautiful visualizations automatically"
    },
    {
      step: 4,
      title: "Share Insights",
      description: "Export or share your analytics results"
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    content: section.content.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <BookOpen className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Complete guides, tutorials, and references to help you master our analytics platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-8"
            >
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <section.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="flex items-center w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    <Download className="w-4 h-4 mr-2" />
                    Download SDK
                  </button>
                  <button className="flex items-center w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    <GitBranch className="w-4 h-4 mr-2" />
                    View on GitHub
                  </button>
                  <button className="flex items-center w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    API Playground
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'getting-started' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Quick Start */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Quick Start Guide
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Get started with Excel Analytics in just 4 simple steps:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {quickStartSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Code Example
                    </h3>
                    <button
                      onClick={() => copyToClipboard(codeExample)}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <code>{codeExample}</code>
                  </pre>
                </div>
              </motion.div>
            )}

            {/* Documentation Sections */}
            {activeSection !== 'getting-started' && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {filteredSections
                  .find(section => section.id === activeSection)
                  ?.content.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-emerald-600 mr-3" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.type === 'tutorial' ? 'bg-blue-100 text-blue-800' :
                            item.type === 'guide' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.type}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
              </motion.div>
            )}

            {/* No Results */}
            {searchTerm && filteredSections.every(section => section.content.length === 0) && (
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
                  Try searching with different keywords or browse the sections above.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Contact Support
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;