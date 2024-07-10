import { env } from "@/env";
import { connect } from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log(`Already connected to DB.`);
    return;
  }
  try {
    const db = await connect(
      `${env.MONGO_URL}/${env.MONGO_DB}` || "",
      {},
    );
    if (db.connections && db.connections[0]) {
      connection.isConnected = db.connections[0].readyState;
      console.log(`DB connected Successfully! - ${db.connection.host}`);
    } else {
      throw new Error("No connections available");
    }
  } catch (error) {
    console.log(`DB connection failed. - ${error}`);
    process.exit(1);
  }
}

export default dbConnect;
