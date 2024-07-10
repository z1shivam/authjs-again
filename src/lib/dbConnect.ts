import { env } from "@/env";
import mongoose from "mongoose";

let isConnected = false; // Track the connection state

async function dbConnect(): Promise<void> {
  if (isConnected) {
    console.log(`Already connected to DB.`);
    return;
  }
  try {
    const db = await mongoose.connect(env.MONGO_URL, {
      dbName: env.MONGO_DB,
    });
    isConnected = db.connections[0]!.readyState === 1;
    console.log(`DB connected successfully! - ${db.connection.host}`);
  } catch (error) {
    console.log(`DB connection failed. - ${error}`);
    process.exit(1);
  }
}

export default dbConnect;
