import express from "express";
import multer from "multer";
import { createNewDoctor, getAllDoctors, getDoctorById, updateDoctor } from "../controllers/doctorController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, fileName + "_" + file.originalname);
    }
});

const upload = multer ({ storage });

// Create new doctor
router.post("/", upload.single("image"), createNewDoctor);

// Get all doctors list
router.get("/", getAllDoctors);

// Get doctor by Id
router.get("/:id", getDoctorById);

// Update only doctor mode and status by Id
router.patch("/:id", updateDoctor);

export default router;