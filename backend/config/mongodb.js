import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Node.js / Windows DNS querySrv ECONNREFUSED error with MongoDB Atlas
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
    console.error("DNS Server setting error:", e.message);
}

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
    }
}

export default connectDB;