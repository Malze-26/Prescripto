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
        const dbName = process.env.MONGODB_DB_NAME || 'prescripto';
        mongoose.connection.on('connected', () => console.log("Database Connected to", dbName));
        
        // Strip trailing slash if present on MONGODB_URI
        const baseUri = process.env.MONGODB_URI.endsWith('/') 
            ? process.env.MONGODB_URI.slice(0, -1) 
            : process.env.MONGODB_URI;

        await mongoose.connect(`${baseUri}/${dbName}`);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
    }
}

export default connectDB;