import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDb();

// Middleware to Parse Json
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});