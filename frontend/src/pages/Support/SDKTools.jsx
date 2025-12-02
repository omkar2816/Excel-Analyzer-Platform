import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Download, 
  Copy, 
  CheckCircle,
  Terminal,
  Zap,
  Package,
  GitBranch,
  ExternalLink,
  Settings,
  Book,
  Monitor,
  Smartphone,
  Globe,
  ArrowLeft
} from 'lucide-react';

const SDKTools = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState('javascript');

  const sdkPackages = [
    {
      name: 'JavaScript/TypeScript SDK',
      description: 'Full-featured SDK for web applications',
      icon: Globe,
      language: 'javascript',
      version: '2.1.0',
      downloads: '12.5k',
      install: 'npm install @excel-analytics/sdk',
      size: '45KB gzipped',
      features: [
        'File upload and processing',
        'Chart generation API',
        'Real-time analytics',
        'TypeScript definitions included',
        'Webhook support'
      ]
    },
    {
      name: 'Python SDK',
      description: 'Perfect for data science workflows',
      icon: Terminal,
      language: 'python',
      version: '1.8.2',
      downloads: '8.3k',
      install: 'pip install excel-analytics-python',
      size: '2.1MB',
      features: [
        'Pandas integration',
        'Jupyter notebook support',
        'Batch processing',
        'Advanced statistical analysis',
        'Custom chart templates'
      ]
    },
    {
      name: 'React Components',
      description: 'Pre-built React components for charts',
      icon: Monitor,
      language: 'react',
      version: '3.0.1',
      downloads: '15.7k',
      install: 'npm install @excel-analytics/react',
      size: '78KB gzipped',
      features: [
        'Drop-in chart components',
        'Dark mode support',
        'Responsive design',
        'Custom theming',
        'Accessibility compliant'
      ]
    },
    {
      name: 'Mobile SDK (React Native)',
      description: 'Native mobile app integration',
      icon: Smartphone,
      language: 'react-native',
      version: '1.5.0',
      downloads: '3.2k',
      install: 'npm install @excel-analytics/react-native',
      size: '125KB',
      features: [
        'iOS and Android support',
        'Offline chart viewing',
        'Native performance',
        'Push notifications',
        'Biometric authentication'
      ]
    }
  ];

  const codeExamples = {
    javascript: {
      title: 'JavaScript/TypeScript',
      code: `// Install: npm install @excel-analytics/sdk
import ExcelAnalytics from '@excel-analytics/sdk';

// Initialize the SDK
const analytics = new ExcelAnalytics({
  apiKey: process.env.EXCEL_ANALYTICS_API_KEY,
  environment: 'production'
});

// Upload and analyze a file
async function analyzeExcelFile(file) {
  try {
    const result = await analytics.upload({
      file: file,
      options: {
        autoAnalyze: true,
        generateCharts: ['bar', 'line', 'pie'],
        includeStatistics: true
      }
    });
    
    console.log('Analysis completed:', result.analysisId);
    
    // Generate charts
    const charts = await analytics.generateCharts({
      analysisId: result.analysisId,
      chartTypes: ['bar', 'line'],
      theme: 'modern'
    });
    
    return { analysis: result, charts };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}

// Listen to real-time analysis updates
analytics.on('analysis.progress', (data) => {
  console.log(\`Progress: \${data.percentage}%\`);
});

analytics.on('analysis.complete', (result) => {
  console.log('Analysis finished:', result);
});`
    },
    python: {
      title: 'Python',
      code: `# Install: pip install excel-analytics-python
import excel_analytics as ea
import pandas as pd

# Initialize the client
client = ea.Client(
    api_key=os.getenv('EXCEL_ANALYTICS_API_KEY'),
    environment='production'
)

# Upload and analyze a DataFrame
def analyze_dataframe(df):
    try:
        # Upload DataFrame
        analysis = client.upload_dataframe(
            df,
            options={
                'auto_analyze': True,
                'chart_types': ['bar', 'line', 'scatter'],
                'include_correlation': True
            }
        )
        
        print(f"Analysis ID: {analysis.id}")
        
        # Wait for completion
        result = analysis.wait_for_completion(timeout=300)
        
        # Get insights
        insights = client.get_insights(analysis.id)
        
        # Generate charts
        charts = client.generate_charts(
            analysis.id,
            chart_types=['bar', 'line'],
            export_format='png'
        )
        
        return {
            'analysis': result,
            'insights': insights,
            'charts': charts
        }
        
    except ea.AnalysisError as e:
        print(f"Analysis failed: {e}")
        raise

# Batch processing example
def batch_analyze_files(file_paths):
    results = []
    
    with client.batch_mode():
        for file_path in file_paths:
            df = pd.read_excel(file_path)
            result = analyze_dataframe(df)
            results.append(result)
    
    return results`
    },
    react: {
      title: 'React Components',
      code: `// Install: npm install @excel-analytics/react
import React, { useState } from 'react';
import {
  ExcelChart,
  FileUploader,
  AnalyticsDashboard,
  ChartGallery
} from '@excel-analytics/react';

function MyAnalyticsApp() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    setLoading(true);
    try {
      const result = await uploadAndAnalyze(file);
      setAnalysisData(result);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-app">
      <h1>Excel Analytics Dashboard</h1>
      
      {/* File Upload Component */}
      <FileUploader
        onUpload={handleFileUpload}
        acceptedFormats={['.xlsx', '.xls', '.csv']}
        maxFileSize={50 * 1024 * 1024} // 50MB
        loading={loading}
      />

      {/* Analytics Dashboard */}
      {analysisData && (
        <>
          <AnalyticsDashboard
            data={analysisData}
            theme="modern"
            showStatistics={true}
            showInsights={true}
          />

          {/* Individual Charts */}
          <div className="charts-grid">
            <ExcelChart
              type="bar"
              data={analysisData.chartData}
              title="Sales by Region"
              theme="emerald"
              responsive={true}
            />
            
            <ExcelChart
              type="line"
              data={analysisData.timeSeriesData}
              title="Trends Over Time"
              showTrendline={true}
              animated={true}
            />
          </div>

          {/* Chart Gallery */}
          <ChartGallery
            analysisId={analysisData.id}
            allowDownload={true}
            allowSharing={true}
          />
        </>
      )}
    </div>
  );
}`
    },
    'react-native': {
      title: 'React Native',
      code: `// Install: npm install @excel-analytics/react-native
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {
  ExcelAnalytics,
  FilePicker,
  ChartView,
  OfflineManager
} from '@excel-analytics/react-native';

const AnalyticsScreen = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const pickAndAnalyzeFile = async () => {
    try {
      // Pick file from device
      const file = await FilePicker.pick({
        type: ['xlsx', 'xls', 'csv'],
        maxSize: 50 * 1024 * 1024
      });

      // Upload and analyze
      const result = await ExcelAnalytics.analyze(file, {
        generateCharts: true,
        enableOffline: true, // Cache for offline viewing
        quality: 'high'
      });

      setAnalysisResult(result);
      
      // Save for offline access
      await OfflineManager.cache(result.id, result.data);
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Analytics</Text>
      
      {/* Chart View */}
      {analysisResult && (
        <ChartView
          data={analysisResult.data}
          type="bar"
          style={styles.chart}
          interactive={true}
          showTooltips={true}
          theme="dark"
        />
      )}

      {/* Offline Indicator */}
      <OfflineManager.StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  chart: {
    height: 300,
    marginVertical: 20
  }
});

export default AnalyticsScreen;`
    }
  };

  const tools = [
    {
      name: 'CLI Tool',
      description: 'Command-line interface for batch processing',
      icon: Terminal,
      install: 'npm install -g @excel-analytics/cli',
      features: [
        'Batch file processing',
        'Automated report generation',
        'CI/CD integration',
        'Custom templates'
      ]
    },
    {
      name: 'VS Code Extension',
      description: 'Analyze Excel files directly in VS Code',
      icon: Code,
      install: 'Search "Excel Analytics" in VS Code Extensions',
      features: [
        'In-editor previews',
        'Syntax highlighting',
        'Live chart generation',
        'Debug support'
      ]
    },
    {
      name: 'Excel Add-in',
      description: 'Native Excel integration',
      icon: Package,
      install: 'Download from Microsoft AppSource',
      features: [
        'One-click analysis',
        'Real-time charts',
        'Cloud sync',
        'Collaborative features'
      ]
    }
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
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
            <Code className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              SDK & Developer Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Integrate Excel Analytics into your applications with our comprehensive SDKs and developer tools.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SDK Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Official SDKs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sdkPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mr-4">
                    <pkg.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      v{pkg.version} • {pkg.downloads} downloads
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {pkg.description}
                </p>
                
                <div className="bg-gray-900 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <code className="text-green-400 text-sm">{pkg.install}</code>
                    <button
                      onClick={() => copyToClipboard(pkg.install, `install-${index}`)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === `install-${index}` ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="ml-2 text-gray-900 dark:text-white font-medium">
                      {pkg.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Latest:</span>
                    <span className="ml-2 text-gray-900 dark:text-white font-medium">
                      v{pkg.version}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Features:
                  </h4>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Code Examples
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {Object.entries(codeExamples).map(([key, example]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === key
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Code Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {codeExamples[activeTab].title} Example
                </h3>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeTab].code, 'example')}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {copiedCode === 'example' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  Copy Code
                </button>
              </div>
              
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <code>{codeExamples[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Developer Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Developer Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tool.description}
                </p>
                
                <div className="bg-gray-900 rounded-lg p-3 mb-4">
                  <code className="text-green-400 text-sm">{tool.install}</code>
                </div>
                
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive documentation, join our developer community, or get direct support from our team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center gap-2 bg-white text-emerald-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-200">
              <Book className="w-5 h-5" />
              View Documentation
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
              <GitBranch className="w-5 h-5" />
              View on GitHub
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SDKTools;