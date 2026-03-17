import "./config/dotenv.ts"
import express from "express";
import { connectDb } from "./lib/db.ts";

await connectDb();

const app = express();

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
