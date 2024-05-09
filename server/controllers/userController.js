const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
// const cloudinary = require('cloudinary').v2;

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        user = await User.create({
            name, email, password
        })

        cookieToken(user, res)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }

}

exports.login = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const user = await UserActivation.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isPasswordCorrect = await user.isValidatedPassword(password);

        if(!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        cookieToken(user, res)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        })
    }
}