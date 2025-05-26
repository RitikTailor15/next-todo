import mongoose from "mongoose";

async function connectToDB() {
  const MONGO_URL = process.env.MONGO;
  if (!MONGO_URL) {
    throw new Error("Please provide the Mongo DB url!!");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  await mongoose.connect(MONGO_URL, { bufferCommands: false });
  return mongoose;
}

export default connectToDB;
