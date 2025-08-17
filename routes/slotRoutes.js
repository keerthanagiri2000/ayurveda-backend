import express from "express";
import { availableSlotsForTheDoctor, createNewSlot, getAllSlotList, getSlotById, lockSlot, updateSlot } from "../controllers/slotController.js";

const router = express.Router();
// ADMIN API'S
// Create new slot
router.post("/", createNewSlot);

// Get all slot list
router.get("/", getAllSlotList);

// Get slot by Id
router.get("/:id", getSlotById);

// Update slot only start and end time 
router.patch("/:id", updateSlot);

// USER API'S
// Available slots for the doctor
router.get("/available/:doctorId", availableSlotsForTheDoctor);

// Lock slot
router.post("/:id/lock", lockSlot);



export default router;