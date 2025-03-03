const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = "123AdilM@lik";

// Hashing the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Web Token Generation
const generateToken = (user) => { 
    return jwt.sign(
        { id: user._id, role: user.role }, 
        secretKey, 
        { expiresIn: "1h" }
    );
};

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(name, email, password, role);
        console.log("Signup request received:", req.body); 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" }); 
        }
        // Hash password
        const hashedPassword = await hashPassword(password);
        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user" 
        });

        await newUser.save();
        // Generate token
        const token = generateToken(newUser);
        res.status(201).json({ message: "User Registered Successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" }); 
        }
        // Check password match
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password or invalid user, try again" });
        }
        // Generate token
        const token = generateToken(existingUser); 
        console.log("Generated Token:", token);
        
        return res.status(200).json({
            message: "User Login Successful",
            token,
            role: existingUser.role, 
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
