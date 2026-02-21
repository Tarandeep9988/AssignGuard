import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error("Missing MONGODB_URI in environment");
}

let cached = global._mongoose;

if (!cached) {
	cached = global._mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(uri, {
				serverSelectionTimeoutMS: 30000,
				socketTimeoutMS: 30000,
				maxPoolSize: 10,
			})
			.then((mongooseInstance) => {
				console.log("✓ MongoDB connected");
				return mongooseInstance;
			})
			.catch((err) => {
				console.error("✗ MongoDB connection failed:", err.message);
				throw err;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
};

export default connectDb;
