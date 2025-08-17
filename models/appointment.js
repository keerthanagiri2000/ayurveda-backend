import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        doctorId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        slotId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["booked", "cancelled", "completed"],
            required: true,
            default: "booked",
        }
    },
    { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;