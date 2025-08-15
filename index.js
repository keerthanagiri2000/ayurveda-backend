import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDb();

// Middleware to Parse Json
app.use(express.json());

app.use("/api/doctors", doctorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});