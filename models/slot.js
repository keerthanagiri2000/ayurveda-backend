import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
    {
        doctorId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        specialization: {
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        booked: {
            type: Boolean,
            default: false,
        },
        locked: {
            type: Boolean,
            default: false,
        },
        lockedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const Slot = mongoose.model("Slot", slotSchema);
export default Slot;