import express from "express";
import { cancelAppointment, newAppointment, userBasedAppointments } from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create new appointment
router.post("/", authMiddleware, newAppointment);

// Get appointment based on the user
router.get("/user/:userId", authMiddleware, userBasedAppointments);

// Cancel appointment
router.post("/:id/cancel", authMiddleware, cancelAppointment)

export default router;