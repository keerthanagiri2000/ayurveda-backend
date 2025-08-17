import Appointment from "../models/appointment.js";
import Slot from "../models/slot.js";

export const newAppointment = async (req, res) => {
    try {
        const { userId, doctorId, slotId } = req.body;
        if (!userId || !doctorId || !slotId) {
            return res.status(400).json({
                success: false,
                message: "userId, doctorId and slotId are required",
            });
        }

        const appointment = new Appointment({ userId, doctorId, slotId });
        await appointment.save();
        await Slot.findByIdAndUpdate(
            slotId,
            {
                $set: {
                    booked: true,
                    locked: false,
                    lockedAt: null
                }
            },
            { new: true }
        );
        res.status(201).json({ success: true, message: "Appointment added successfully" });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}