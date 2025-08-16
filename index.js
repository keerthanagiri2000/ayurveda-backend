import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDb } from "./db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS to allow requests from frontend
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Connect to MongoDB
connectDb();

// Middleware to Parse Json
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/doctors", doctorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});