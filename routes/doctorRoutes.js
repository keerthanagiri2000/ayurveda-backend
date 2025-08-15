import express from "express";
import { createNewDoctor, getAllDoctors, getDoctorById, updateDoctor } from "../controllers/doctorController.js";

const router = express.Router();

// Create new doctor
router.post("/", createNewDoctor);

// Get all doctors list
router.get("/", getAllDoctors);

// Get doctor by Id
router.get("/:id", getDoctorById);

// Update only doctor mode and status by Id
router.patch("/:id", updateDoctor);

export default router;