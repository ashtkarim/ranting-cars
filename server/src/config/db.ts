import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = "mongodb://mongodb:27017/ranting_car";
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
