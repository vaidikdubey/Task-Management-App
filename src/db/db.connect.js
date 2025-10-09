import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected✔️");
  } catch (error) {
    console.error("MongoDB connection failed❌", error);
    process.exit(1); //Because the project requires db connection for running
  }
};

export default connectDB;