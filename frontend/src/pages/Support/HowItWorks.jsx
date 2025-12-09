import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload,
  BarChart3,
  Download,
  CheckCircle,
  ArrowRight,
  FileSpreadsheet,
  Zap,
  Target,
  Users,
  TrendingUp,
  Settings,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Upload Your Data',
      description: 'Upload Excel or CSV files with your data. Our platform supports various file formats and sizes.',
      icon: Upload,
      details: [
        'Drag & drop interface for easy file uploads',
        'Support for .xlsx, .csv, and .xls formats',
        'Automatic data validation and cleaning',
        'Large file support up to 50MB',
        'Secure file processing'
      ],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 2,
      title: 'Smart Analysis',
      description: 'Our AI analyzes your data and suggests the best visualization options automatically.',
      icon: Zap,
      details: [
        'AI-powered data pattern recognition',
        'Automatic chart type suggestions',
        'Data quality assessment',
        'Column type detection',
        'Statistical insights generation'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      title: 'Generate Charts',
      description: 'Create beautiful, interactive charts with just one click. Choose from multiple visualization types.',
      icon: BarChart3,
      details: [
        '15+ chart types available',
        'Interactive and responsive designs',
        'Customizable colors and themes',
        'Real-time chart updates',
        'Professional-grade visualizations'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Export & Share',
      description: 'Export your charts as images or share interactive dashboards with your team.',
      icon: Download,
      details: [
        'High-resolution image exports (PNG, SVG)',
        'Interactive dashboard sharing',
        'Embed charts in websites',
        'Team collaboration features',
        'Version history tracking'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      title: 'Easy to Use',
      description: 'No technical skills required. Just upload, analyze, and visualize.',
      icon: Target
    },
    {
      title: 'Fast Processing',
      description: 'Get insights from your data in seconds, not hours.',
      icon: Zap
    },
    {
      title: 'Professional Results',
      description: 'Create presentation-ready charts and dashboards.',
      icon: TrendingUp
    },
    {
      title: 'Team Collaboration',
      description: 'Share and collaborate on data insights with your team.',
      icon: Users
    }
  ];

  const useCases = [
    {
      title: 'Business Analytics',
      description: 'Track KPIs, sales performance, and business metrics',
      example: 'Sales reports, revenue tracking, customer analytics'
    },
    {
      title: 'Financial Reporting',
      description: 'Create financial dashboards and budget analysis',
      example: 'Budget vs actual, expense tracking, profit analysis'
    },
    {
      title: 'Marketing Insights',
      description: 'Analyze campaign performance and customer data',
      example: 'Campaign ROI, lead generation, customer segmentation'
    },
    {
      title: 'HR Analytics',
      description: 'Workforce analytics and performance tracking',
      example: 'Employee performance, attendance, hiring metrics'
    }
  ];

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-emerald-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlay}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Tour' : 'Start Tour'}</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your Excel data into beautiful, interactive visualizations in just 4 simple steps. 
            No coding required – just upload, analyze, and share.
          </p>
        </motion.div>

        {/* Interactive Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'scale-105 transform' 
                    : 'hover:scale-102 transform'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  activeStep === index
                    ? 'border-emerald-500 bg-white dark:bg-gray-800 shadow-xl'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50'
                }`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                
                {/* Step Number */}
                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  activeStep === index
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {step.id}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${steps[activeStep].color} flex items-center justify-center mr-6`}>
                {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {steps[activeStep].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps[activeStep].details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Excel Analytics?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Perfect for Every Industry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {useCase.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Examples: {useCase.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Upload your first file and see the magic happen in seconds.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/analytics')}
              className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;