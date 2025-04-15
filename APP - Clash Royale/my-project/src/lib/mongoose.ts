import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL!;

if (!MONGODB_URI) {
  throw new Error('MONGO_URL não está definido no .env');
}

let isConnected = false;

export async function connect() {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI);
  isConnected = true;
}

export default mongoose;
