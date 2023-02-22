import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URL: string = process.env.MONGODB_URL || '';

if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

mongoose.set('strictQuery', false);

// eslint-disable-next-line consistent-return
async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.set('strictQuery', false);

    cached.promise = mongoose
      .connect(MONGODB_URL, options)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
}

export default connect;
