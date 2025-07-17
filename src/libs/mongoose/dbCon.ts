import mongoose from "mongoose";

// Cache the database connection
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

function getDbURI(dbname: string) {
  const user = encodeURIComponent(process.env.NEXT_PUBLIC_MONGODB_USER || "");
  const pwd = encodeURIComponent(process.env.NEXT_PUBLIC_MONGODB_PWD || "");
  const MONGO_DB_URI_DEV = `mongodb://127.0.0.1:27017/${dbname}?retryWrites=true&w=majority`;
  const LIVE_URI = `mongodb+srv://${user}:${pwd}@cluster0.2f29nts.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  const ENV = process.env.NODE_ENV || "development";

  if (1 !== 1) return ENV === "production" ? LIVE_URI : MONGO_DB_URI_DEV;
  return LIVE_URI;
}

export async function dbCon() {
  const dbName =
    process.env.APP_NAME || process.env.DARAJA_API_APP_NAME || "test-db";
  const MONGO_DB_URI = getDbURI(dbName);

  // If we have a cached connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If we don't have a connection, but we have a promise, return it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_DB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

// Additional utility functions for connection management
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getConnectionState(): string {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[mongoose.connection.readyState as keyof typeof states] || 'unknown';
}

export async function disconnect(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("MongoDB disconnected");
  }
}
