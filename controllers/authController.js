import User from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
        return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
        userName,
        email,
        password: hashedPassword
        });
+
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ success: true, message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: true, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: true, message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ success: true, message: "Login successful", token, data: user});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}