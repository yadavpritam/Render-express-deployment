const userModel = require("../module/user"); // models folder ka naam use karo
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

// Signup
const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const result = await userModel.create({
            email,
            password: hashedPassword,
            username
        });

        // Generate token with expiry
        const token = jwt.sign(
            { email: result.email, id: result._id },
            SECRET_KEY,
           // { expiresIn: "30d" } // token 1 hour me expire hoga
        );

        res.status(201).json({ user: result, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Signin
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            SECRET_KEY,
            //{ expiresIn: "30h" }
        );

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, signin };
