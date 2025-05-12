import mongoose from "mongoose";

// connecting to database
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  const connectionUrl = process.env.DB_URI;
  try {
    await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = true;
    console.log(`Database connected successfully`);
    mongoose.set("strictQuery", false);
  } catch (err) {
    console.log("Getting Error from DB connection: " + err.message);
    // Optionally, rethrow the error or handle it as needed
    // throw err;
  }
};

export default connectDB;
