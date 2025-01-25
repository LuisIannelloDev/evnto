import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };
(global as any).mongoose = cached;

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'evnto',
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};
