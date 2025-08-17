import express from "express";
import { newAppointment } from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create new appointment
router.post("/", authMiddleware, newAppointment);

export default router;