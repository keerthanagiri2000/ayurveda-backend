import Doctor from "../models/doctor.js";

export const getAllDoctors = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const total = await Doctor.countDocuments();
        const doctors = await Doctor.find().skip((page - 1) * limit).limit(limit);
        res.status(200).json({ success: true, data: doctors, total, page, limit });
    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}

export const createNewDoctor = async (req, res) => {
     try {
        const { name, specialization, mode } = req.body;
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const doctor = new Doctor({ name, specialization, mode, image: imageUrl });
        await doctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, message: error.message });
    }
}

export const getDoctorById = async (req, res) => {
     try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.status(200).json({ success: true, data: doctor });
    }  catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}

export const updateDoctor = async (req, res) => {
    try {
        const { mode, status } = req.body;
        if(!["in_person", "online"].includes(mode)) {
            return res.status(400).json({ success: false, message: "Invalid mode value" });
        }

         if(!["active", "in_active"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updateData = {};
        if(mode) updateData.mode = mode;
        if (status) updateData.status = status
        ;

        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        } 
        res.status(200).json({ success: true, data: doctor, message: "Doctor details updated successfully" });

    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}