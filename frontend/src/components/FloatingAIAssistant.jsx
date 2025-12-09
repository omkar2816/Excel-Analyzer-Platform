import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot,
  Minimize2,
  Maximize2,
  Brain,
  Zap
} from 'lucide-react';

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      message: "Hi! I'm your Excel Analytics Assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      type: 'user',
      message: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(userInput);
      setMessages(prev => [...prev, {
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
    } else if (message.includes('sdk') || message.includes('api') || message.includes('developer')) {
      return "Learn how our platform works! Visit our 'How it Works?' section to see a step-by-step guide on uploading data, generating insights, and creating beautiful visualizations. Perfect for understanding the complete workflow from data upload to chart export.";
    } else if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! You can visit our Help Center for detailed guides, check the FAQ section for common questions, or contact our support team directly through the contact form in the footer.";
    } else {
      return "I'm here to help! You can ask me about uploading files, creating charts, account management, security features, our SDK & APIs, or any other aspect of the platform. For specific technical issues, you can also contact our support team directly.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Robot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 backdrop-blur-md text-white rounded-full shadow-2xl hover:shadow-emerald-500/25 dark:hover:shadow-emerald-400/30 transition-all duration-300 flex items-center justify-center z-50 group"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(20, 184, 166, 0.9) 100%)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* AI Robot Icon */}
            <div className="relative">
              <Bot className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
              />
              <Brain className="absolute -bottom-1 -left-1 w-3 h-3 text-yellow-300 opacity-70" />
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                />
              ))}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Glassmorphism Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              width: isMinimized ? 320 : 400,
              height: isMinimized ? 64 : 520
            }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{
              background: document.documentElement.classList.contains('dark') 
                ? 'rgba(17, 24, 39, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: document.documentElement.classList.contains('dark')
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: document.documentElement.classList.contains('dark')
                ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Glassmorphism Header */}
            <div 
              className="text-white p-3 flex items-center justify-between relative overflow-hidden flex-shrink-0 h-16"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(20, 184, 166, 0.9) 100%)',
                backdropFilter: 'blur(15px)',
                borderBottom: document.documentElement.classList.contains('dark')
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    className="absolute w-2 h-2 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-center relative z-10">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-2 relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Bot className="w-4 h-4" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-transparent border-t-white/40 rounded-full"
                  />
                  <Zap className="absolute -top-0.5 -right-0.5 w-2 h-2 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm flex items-center">
                    AI Assistant
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1 w-1.5 h-1.5 bg-green-400 rounded-full"
                    />
                  </h3>
                  {!isMinimized && <p className="text-xs text-emerald-100">Neural Network • Online</p>}
                </div>
              </div>
              <div className="flex items-center space-x-1 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-6 h-6 rounded-lg transition-colors flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3 h-3" />
                  ) : (
                    <Minimize2 className="w-3 h-3" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-lg transition-colors flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>
            </div>

            {/* Glassmorphism Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  {/* Messages with glassmorphism background - Scrollable */}
                  <div 
                    className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3 scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent"
                    style={{
                      background: document.documentElement.classList.contains('dark')
                        ? 'rgba(0, 0, 0, 0.1)'
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      scrollBehavior: 'smooth',
                      maxHeight: '280px'
                    }}
                  >
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs p-3 rounded-2xl backdrop-blur-md break-words ${
                            message.type === 'user'
                              ? 'text-white rounded-br-lg'
                              : 'text-gray-900 dark:text-white rounded-bl-lg'
                          }`}
                          style={{
                            background: message.type === 'user' 
                              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(20, 184, 166, 0.9) 100%)'
                              : document.documentElement.classList.contains('dark')
                                ? 'rgba(55, 65, 81, 0.8)'
                                : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            border: document.documentElement.classList.contains('dark')
                              ? '1px solid rgba(255, 255, 255, 0.1)'
                              : '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: message.type === 'user' 
                              ? 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                              : document.documentElement.classList.contains('dark')
                                ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                                : 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <div className="flex items-start">
                            {message.type === 'bot' && (
                              <div className="relative mr-2 mt-0.5">
                                <Bot className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full"
                                />
                              </div>
                            )}
                            <p className="text-sm leading-relaxed">{message.message}</p>
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
                        <div 
                          className="p-3 rounded-2xl rounded-bl-lg max-w-xs backdrop-blur-md"
                          style={{
                            background: document.documentElement.classList.contains('dark')
                              ? 'rgba(55, 65, 81, 0.8)'
                              : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            border: document.documentElement.classList.contains('dark')
                              ? '1px solid rgba(255, 255, 255, 0.1)'
                              : '1px solid rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <div className="flex items-center">
                            <div className="relative mr-2">
                              <Bot className="w-4 h-4 text-emerald-400" />
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-1 border border-emerald-400/30 rounded-full border-t-emerald-400"
                              />
                            </div>
                            <div className="flex space-x-1">
                              <motion.div 
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1 bg-emerald-400 rounded-full"
                              />
                              <motion.div 
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                                className="w-1 h-1 bg-emerald-400 rounded-full"
                              />
                              <motion.div 
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                className="w-1 h-1 bg-emerald-400 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Glassmorphism Input */}
                  <div 
                    className="p-3 border-t flex-shrink-0"
                    style={{
                      background: document.documentElement.classList.contains('dark')
                        ? 'rgba(17, 24, 39, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(15px)',
                      borderTop: document.documentElement.classList.contains('dark')
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                        style={{
                          background: document.documentElement.classList.contains('dark')
                            ? 'rgba(55, 65, 81, 0.9)'
                            : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: document.documentElement.classList.contains('dark')
                            ? '1px solid rgba(255, 255, 255, 0.2)'
                            : '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={!userInput.trim() || isTyping}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 text-white rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(20, 184, 166, 0.9) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <Send className="w-3 h-3 relative z-10" />
                        <motion.div
                          animate={!userInput.trim() ? {} : { scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-white/20 rounded-xl"
                        />
                      </motion.button>
                    </div>
                    
                    {/* Glassmorphism Quick Actions */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {['Upload file', 'Create chart', 'Account help', 'API docs'].map((action, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setUserInput(action)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-2 py-1 text-xs rounded-md transition-all duration-200 text-emerald-700 dark:text-emerald-300"
                          style={{
                            background: document.documentElement.classList.contains('dark')
                              ? 'rgba(16, 185, 129, 0.3)'
                              : 'rgba(16, 185, 129, 0.2)',
                            backdropFilter: 'blur(5px)',
                            border: document.documentElement.classList.contains('dark')
                              ? '1px solid rgba(16, 185, 129, 0.4)'
                              : '1px solid rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                      Press Enter to send • Powered by Neural AI
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIAssistant;