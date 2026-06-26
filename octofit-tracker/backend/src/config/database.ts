import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(MONGO_URL);
  console.log(`Connected to MongoDB at ${MONGO_URL}`);
}

export default mongoose;
