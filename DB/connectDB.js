import mongoose from "mongoose";

// connecting to database
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  const connectionUrl = process.env.DB_URI;
  
  if (!connectionUrl) {
    console.error('MONGODB_URI is not defined in environment variables');
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(connectionUrl, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    isConnected = true;
    console.log(`Database connected successfully`);
    mongoose.set("strictQuery", false);
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
};

export default connectDB;
