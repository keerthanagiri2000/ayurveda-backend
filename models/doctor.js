import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, },
        specialization: { type: String, required: true, },
        mode: { type: String, enum: ["in_person", "online"], required: true, },
        image: { type: String, required: true,},
        status: { type: String, enum: ["active", "in_active"], default: "active", }
    },
    { timestamps: true }
);

doctorSchema.index({ name: 1 });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ mode: 1 });

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;