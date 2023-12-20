import mongoose from "mongoose";
import { DB_NAME } from "../config/Enum.js";

export const connectDB = async () => {
  try {
    const mongodbInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log("Successfully mongodb connected!!")
  } catch (error) {
    console.log(`Error occur in connect mongodb: ${error}`)
    throw new Error(e);
  }
};

// export default connectDB