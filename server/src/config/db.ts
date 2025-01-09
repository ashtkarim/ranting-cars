import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = `mongodb://${process.env.DB_USR}:${process.env.DB_PASS}@${process.env.DB_SERVER}:27017/${process.env.DB_NAME}?authSource=admin`;
    console.log(uri);
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
