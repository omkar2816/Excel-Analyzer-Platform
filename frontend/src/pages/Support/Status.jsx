import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Server,
  Database,
  Wifi,
  Shield,
  Zap,
  Globe,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

const Status = () => {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) {
        setLastUpdated(new Date());
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const systemStatus = {
    overall: 'operational',
    uptime: 99.98
  };

  const services = [
    {
      name: 'Web Application',
      status: 'operational',
      description: 'Main analytics platform and user interface',
      uptime: 99.99,
      responseTime: '234ms',
      icon: Globe
    },
    {
      name: 'File Processing',
      status: 'operational', 
      description: 'Excel file upload and processing service',
      uptime: 99.95,
      responseTime: '1.2s',
      icon: Server
    },
    {
      name: 'Analytics Engine',
      status: 'operational',
      description: 'Data analysis and chart generation',
      uptime: 99.97,
      responseTime: '890ms',
      icon: Zap
    },
    {
      name: 'Database',
      status: 'operational',
      description: 'User data and file metadata storage',
      uptime: 100.0,
      responseTime: '45ms',
      icon: Database
    },
    {
      name: 'Authentication',
      status: 'operational',
      description: 'User login and security services',
      uptime: 99.99,
      responseTime: '123ms',
      icon: Shield
    },
    {
      name: 'API Services',
      status: 'operational',
      description: 'REST API and data endpoints',
      uptime: 99.96,
      responseTime: '178ms',
      icon: Wifi
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'completed',
      severity: 'maintenance',
      startTime: new Date(Date.now() - 86400000 * 2), // 2 days ago
      endTime: new Date(Date.now() - 86400000 * 2 + 3600000), // 1 hour duration
      description: 'Routine database optimization to improve query performance. No user impact expected.',
      updates: [
        {
          time: new Date(Date.now() - 86400000 * 2 + 3600000),
          message: 'Maintenance completed successfully. All services restored.'
        },
        {
          time: new Date(Date.now() - 86400000 * 2 + 1800000),
          message: 'Maintenance in progress. Systems operating normally.'
        },
        {
          time: new Date(Date.now() - 86400000 * 2),
          message: 'Maintenance window started. No user impact expected.'
        }
      ]
    },
    {
      id: 2,
      title: 'File Upload Intermittent Issues',
      status: 'resolved',
      severity: 'minor',
      startTime: new Date(Date.now() - 86400000 * 7), // 7 days ago
      endTime: new Date(Date.now() - 86400000 * 7 + 7200000), // 2 hours duration
      description: 'Some users experienced timeouts when uploading large files.',
      updates: [
        {
          time: new Date(Date.now() - 86400000 * 7 + 7200000),
          message: 'Issue resolved. Upload timeouts have been fixed.'
        },
        {
          time: new Date(Date.now() - 86400000 * 7 + 3600000),
          message: 'We have identified the cause and are implementing a fix.'
        },
        {
          time: new Date(Date.now() - 86400000 * 7),
          message: 'Investigating reports of upload timeouts for files larger than 25MB.'
        }
      ]
    }
  ];

  const metrics = [
    { label: 'Global Uptime', value: '99.98%', trend: 'stable' },
    { label: 'Avg Response Time', value: '312ms', trend: 'improving' },
    { label: 'Active Users', value: '2,847', trend: 'growing' },
    { label: 'Files Processed Today', value: '18,432', trend: 'growing' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'outage': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'degraded': return AlertTriangle;
      case 'outage': return XCircle;
      case 'maintenance': return Clock;
      default: return Activity;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'major': return 'border-orange-500 bg-orange-50';
      case 'minor': return 'border-yellow-500 bg-yellow-50';
      case 'maintenance': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
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
            <div className="flex items-center justify-center mb-6">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                systemStatus.overall === 'operational' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <Activity className="w-16 h-16 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              System Status
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real-time status of our analytics platform and services.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="text-lg font-semibold text-green-600">
                All Systems Operational
              </span>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service Status
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                autoRefresh 
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                  : 'border-gray-300 text-gray-600 bg-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </button>
            <button 
              onClick={() => setLastUpdated(new Date())}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Now
            </button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {metric.label}
                </h3>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'growing' ? 'bg-green-500' :
                  metric.trend === 'improving' ? 'bg-blue-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <service.icon className="w-8 h-8 text-emerald-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {service.status === 'operational' ? 'Operational' : service.status}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Uptime:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {service.uptime}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Response:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {service.responseTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Incidents & Maintenance
          </h2>
          
          {incidents.length > 0 ? (
            <div className="space-y-6">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className={`border-l-4 rounded-r-lg p-6 bg-white dark:bg-gray-800 shadow-lg ${getSeverityColor(incident.severity)}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        incident.status === 'resolved' || incident.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : incident.status === 'investigating'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {incident.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {incident.startTime.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {incident.description}
                  </p>
                  
                  <div className="space-y-3">
                    {incident.updates.map((update, updateIndex) => (
                      <div key={updateIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {update.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {update.time.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Recent Incidents
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All systems have been running smoothly. We'll update this page if any issues arise.
              </p>
            </div>
          )}
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
          <p className="text-emerald-100 mb-6">
            Subscribe to status updates and be the first to know about any service changes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button className="bg-white text-emerald-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Status;