// Debug script to check MongoDB connection string
require("dotenv").config({ path: ".env.local" });

function getDbURI(dbname) {
  const user = encodeURIComponent(process.env.NEXT_PUBLIC_MONGODB_USER || "");
  const pwd = encodeURIComponent(process.env.NEXT_PUBLIC_MONGODB_PWD || "");
  const MONGO_DB_URI_DEV = `mongodb://127.0.0.1:27017/${dbname}?retryWrites=true&w=majority`;
  const LIVE_URI = `mongodb+srv://${user}:${pwd}@cluster0.2f29nts.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  const ENV = process.env.NODE_ENV || "development";

  console.log("Environment variables:");
  console.log("NEXT_PUBLIC_MONGODB_USER:", process.env.NEXT_PUBLIC_MONGODB_USER);
  console.log("NEXT_PUBLIC_MONGODB_PWD:", process.env.NEXT_PUBLIC_MONGODB_PWD ? "[SET]" : "[NOT SET]");
  console.log("NODE_ENV:", ENV);
  console.log("APP_NAME:", process.env.APP_NAME);
  console.log("DARAJA_API_APP_NAME:", process.env.DARAJA_API_APP_NAME);
  
  console.log("\nGenerated URIs:");
  console.log("DEV URI:", MONGO_DB_URI_DEV);
  console.log("LIVE URI:", LIVE_URI);
  
  // Current logic always returns LIVE_URI because (1 !== 1) is always false
  if (1 !== 1) return ENV === "production" ? LIVE_URI : MONGO_DB_URI_DEV;
  return LIVE_URI;
}

const dbName = process.env.APP_NAME || process.env.DARAJA_API_APP_NAME || "test-db";
const MONGO_DB_URI = getDbURI(dbName);

console.log("\nFinal connection URI:", MONGO_DB_URI);
console.log("Database name:", dbName);
