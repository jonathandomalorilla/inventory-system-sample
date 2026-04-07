import mongoose from "mongoose";

/**
 * Database Connection
 * Connects to MongoDB using Mongoose
 * Environment variable: MONGO_URI
 */
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(mongoURI);

        console.log("✓ MongoDB connection established successfully");
        console.log(`✓ Connected to: ${mongoURI.split('@')[1]?.split('/')[0] || 'local'}`);
        
        return mongoose.connection;
    } catch (error) {
        console.error("✗ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

// Handle connection errors after initial connection
mongoose.connection.on('disconnected', () => {
    console.error('✗ MongoDB disconnected unexpectedly');
});

mongoose.connection.on('reconnected', () => {
    console.log('✓ MongoDB reconnected');
});

export default connectDB;