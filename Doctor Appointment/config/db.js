const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/doctor-appointment';
    
    // Check if we're in test mode or if MongoDB is not available
    if (process.env.NODE_ENV === 'test' || !mongoUri.includes('mongodb')) {
      console.log('⚠️  Running without MongoDB - using in-memory storage');
      return;
    }
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.log('⚠️  Running without MongoDB - using in-memory storage');
    // Don't exit the process, let it continue with in-memory storage
  }
};

module.exports = connectDB; 