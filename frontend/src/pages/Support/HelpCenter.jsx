import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  MessageCircle, 
  Send, 
  User, 
  Bot,
  Search,
  BookOpen,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Zap,
  ArrowLeft,
  Bug
} from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: "Hi! I'm your Excel Analytics Assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const helpCategories = [
    {
      icon: BarChart3,
      title: "Getting Started",
      description: "Learn the basics of our analytics platform",
      articles: [
        "How to upload your first Excel file",
        "Understanding the dashboard",
        "Basic data visualization",
        "Setting up your account"
      ]
    },
    {
      icon: FileText,
      title: "Data Analysis",
      description: "Advanced analytics and insights",
      articles: [
        "Advanced chart configurations",
        "Statistical analysis tools",
        "Data preprocessing options",
        "Export and sharing features"
      ]
    },
    {
      icon: Settings,
      title: "Account Management",
      description: "Manage your profile and settings",
      articles: [
        "Profile customization",
        "Privacy settings",
        "Notification preferences",
        "Account security"
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Data protection and security features",
      articles: [
        "Data encryption standards",
        "Privacy policy overview",
        "GDPR compliance",
        "Secure file handling"
      ]
    }
  ];

  const quickActions = [
    { icon: BookOpen, title: "View Documentation", action: () => navigate('/support/documentation') },
    { icon: MessageCircle, title: "Contact Support", action: () => scrollToChat() },
    { icon: Bug, title: "Report Issue", action: () => window.open('mailto:support@excelanalytics.com?subject=Issue Report&body=Please describe the issue you encountered:', '_blank') }
  ];

  const scrollToChat = () => {
    document.getElementById('ai-chat').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      type: 'user',
      message: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(userInput);
      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('upload') || message.includes('file')) {
      return "To upload a file, go to the Files section in your dashboard and click 'Upload New File'. We support Excel files (.xlsx, .xls) up to 50MB. Make sure your data is properly formatted with headers in the first row.";
    } else if (message.includes('chart') || message.includes('visualization')) {
      return "You can create various charts including bar charts, line graphs, pie charts, and 3D visualizations. After uploading your data, go to the Charts section and select your preferred visualization type. Our Smart Chart Configurator will help you choose the best chart for your data.";
    } else if (message.includes('account') || message.includes('profile')) {
      return "You can manage your account in the Settings section. There you can update your profile information, change password, configure notifications, and manage privacy settings.";
    } else if (message.includes('security') || message.includes('privacy')) {
      return "We take security seriously! All data is encrypted in transit and at rest using industry-standard encryption. Your files are processed securely and automatically deleted after analysis. Check our Privacy Policy for detailed information.";
    } else if (message.includes('pricing') || message.includes('cost')) {
      return "Our platform offers flexible pricing plans. You can start with our free tier which includes basic analytics features. For advanced features and higher usage limits, check out our Pro and Enterprise plans in the Settings section.";
    } else {
      return "I'm here to help! You can ask me about uploading files, creating charts, account management, security features, or any other aspect of the platform. For specific technical issues, you can also contact our support team directly.";
    }
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
            <HelpCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get instant help with our AI assistant, browse helpful articles, or contact our support team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              onClick={action.action}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left"
            >
              <action.icon className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {action.title}
              </h3>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Help Categories */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Browse Help Topics
              </h2>
              <div className="grid gap-6">
                {helpCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-start">
                      <category.icon className="w-8 h-8 text-emerald-600 mt-1 mr-4 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {category.description}
                        </p>
                        <ul className="space-y-2">
                          {category.articles.map((article, articleIndex) => (
                            <li key={articleIndex}>
                              <button className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors text-sm">
                                {article}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Chat Assistant */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              id="ai-chat"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <div className="flex items-center mb-6">
                <Bot className="w-8 h-8 text-emerald-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get instant help
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <div className="flex items-start">
                        {message.type === 'bot' && (
                          <Bot className="w-4 h-4 mr-2 mt-0.5 text-emerald-600" />
                        )}
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-xs">
                      <div className="flex items-center">
                        <Bot className="w-4 h-4 mr-2 text-emerald-600" />
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;