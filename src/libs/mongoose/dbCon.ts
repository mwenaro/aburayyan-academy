import mongoose from "mongoose";
let isConnected = false;
// c9XddCqLzuNiDNDQ

function getDbURI(dbname: string) {
  const MONGO_DB_URI_DEV = `mongodb://127.0.0.1:27017/${dbname}?retryWrites=true&w=majority`;
  const LIVE_URI = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_USER}:${process.env.NEXT_PUBLIC_MONGODB_PWD}@cluster0.2f29nts.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  const ENV = process.env.NODE_ENV || "developemnt";

  return ENV === "production" ? LIVE_URI : MONGO_DB_URI_DEV;
  // return LIVE_URI
}

export async function dbCon() {
  // const MONGO_DB_URI = getDbURI('splendid_media_db')
  const MONGO_DB_URI = getDbURI(process.env.APP_NAME! || process.env.DARAJA_API_APP_NAME! || 'test-db')   
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_DB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
