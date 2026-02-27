import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log("MONGO", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDb connection fail ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
