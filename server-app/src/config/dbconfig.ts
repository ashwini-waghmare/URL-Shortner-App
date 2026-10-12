import mongoose from "mongoose";

const connectDB = async () => {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error("CONNECTION_STRING is missing. Add it to server-app/.env.");
        process.exit(1);
    }

    try {
        const connect = await mongoose.connect(connectionString);
        console.log("Database connected:",connect.connection.host , connect.connection.name);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
      }
};

export default connectDB;