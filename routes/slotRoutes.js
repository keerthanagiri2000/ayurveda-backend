import express from "express";
import { createNewSlot, getAllSlotList, getSlotById, updateSlot } from "../controllers/slotController.js";

const router = express.Router();

// Create new slot
router.post("/", createNewSlot);

// Get all slot list
router.get("/", getAllSlotList);

// Get slot by Id
router.get("/:id", getSlotById);

// Update slot only start and end time 
router.patch("/:id", updateSlot);

export default router;