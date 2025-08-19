import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const ConnectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(MONGODB_URI);
  console.log("DB Connected");
};