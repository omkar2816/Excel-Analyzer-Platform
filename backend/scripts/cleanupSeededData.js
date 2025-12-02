import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import UploadedFile from '../models/UploadedFile.js';
import UserActivity from '../models/UserActivity.js';
import ChartHistory from '../models/ChartHistory.js';

dotenv.config();

const cleanupSeededData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/excelAnalytics');
    console.log('Connected to MongoDB');

    console.log('🧹 Starting cleanup of seeded/test data...');

    // Remove seeded UserActivity records
    const deletedActivities = await UserActivity.deleteMany({ 
      'metadata.source': 'seeded_data' 
    });
    console.log(`✅ Removed ${deletedActivities.deletedCount} seeded activities`);

    // Remove sample uploaded files
    const deletedFiles = await UploadedFile.deleteMany({ 
      originalName: { $regex: /^sample_data_\d+\.xlsx$/ } 
    });
    console.log(`✅ Removed ${deletedFiles.deletedCount} sample files`);

    // Remove seeded users (with fake company domains)
    const deletedUsers = await User.deleteMany({
      email: { 
        $regex: /@(techcorp|innovate|dataworks|analytics|insights|solutions|systems|digital|consulting|enterprises|ventures|labs)\.com$/ 
      }
    });
    console.log(`✅ Removed ${deletedUsers.deletedCount} seeded users`);

    // Remove any chart history associated with seeded users/files
    const deletedCharts = await ChartHistory.deleteMany({
      sourceFileName: { $regex: /^sample_data_\d+\.xlsx$|^Generated Chart$/ }
    });
    console.log(`✅ Removed ${deletedCharts.deletedCount} seeded chart records`);

    // Clean up any activities with test markers
    const deletedTestActivities = await UserActivity.deleteMany({
      'metadata.isRealUserActivity': false
    });
    console.log(`✅ Removed ${deletedTestActivities.deletedCount} test activities`);

    console.log('✨ Cleanup completed! Your analytics will now show 100% real user data.');

    // Show current real data counts
    console.log('\n📊 Current Real Data Counts:');
    const realFiles = await UploadedFile.countDocuments({ 
      isActive: true,
      originalName: { $not: { $regex: /^sample_data_\d+\.xlsx$/ } } 
    });
    
    const realUsers = await User.countDocuments({
      email: { $not: { $regex: /@(techcorp|innovate|dataworks|analytics|insights|solutions|systems|digital|consulting|enterprises|ventures|labs)\.com$/ } }
    });
    
    const realActivities = await UserActivity.countDocuments({
      'metadata.source': { $ne: 'seeded_data' },
      'metadata.isRealUserActivity': { $ne: false }
    });
    
    console.log(`- Real Users: ${realUsers}`);
    console.log(`- Real Files: ${realFiles}`);
    console.log(`- Real Activities: ${realActivities}`);

    if (realUsers === 0 && realFiles === 0) {
      console.log('\n🎯 Perfect! Your platform starts with zero, and counters will grow with real usage.');
    }

  } catch (error) {
    console.error('Error cleaning up seeded data:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

cleanupSeededData();