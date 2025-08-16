import Slot from "../models/slot.js";

export const createNewSlot = async (req, res) => {
    try {
        const { doctorId, specialization, startTime, endTime } = req.body;
        const slot = new Slot({ doctorId, specialization, startTime, endTime });
        await slot.save();
        res.status(201).json({ success: true, message: "Slot added successfully"})
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

export const getAllSlotList = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const total = await Slot.countDocuments();
        const slots = await Slot.find().populate("doctorId", "name mode") .skip((page -1) * limit).limit(limit);
        res.status(200).json({ success: true, data: slots, total, page, limit });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

export const getSlotById = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (!slot) {
            return res.status(404).json({ success: false, message: "Slot not found" });
        }
        res.status(200).json({ success: true, data: slot });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

export const updateSlot = async (req, res) => {
    try {
        const { startTime, endTime } = req.body;
        const slot = await Slot.findByIdAndUpdate(
            req.params.id,
            { startTime: startTime, endTime: endTime },
            { new:true, runValidators:true }
        );

        if (!slot) {
            return res.status(404).json({ success: false, message: "Slot not found" });
        }
        res.status(200).json({ success: true, data: slot, message: "Slot updated successfully" });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
};

