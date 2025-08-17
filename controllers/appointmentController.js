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

export const userBasedAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.query;

        let query = { userId };
        if (status && status !== 'all') query.status = status;

        const appointments = await Appointment.find(query)
            .populate('doctorId', 'name specialization')
            .populate('slotId', 'startTime endTime');

        res.status(200).json({ success: true, data: appointments });

    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}

export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        const slot = await Slot.findById(appointment.slotId);
        const hoursLeft = (new Date(slot.startTime) - new Date()) / 36e5;
        if (hoursLeft < 24) return res.status(400).json({ success: false, message: 'Cannot cancel within 24 hours' });

        slot.booked = false;
        await slot.save();

        appointment.status = 'cancelled';
        await appointment.save();

        res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });

    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}