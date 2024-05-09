const Booking = require("../models/Booking");

exports.createBookings = async (req, res) => {
    try {
        const userData = req.user;

        const {
            place,
            checkIn,
            checkOut,
            numOfGuests,
            name,
            phone,
            price,
        } = req.body

        const booking = await Booking.create({
            user: userData.id,
            place,
            checkIn,
            checkOut,
            numOfGuests,
            name,
            phone,
            price,
        })

        res.status(200).json({
            booking
        })
    } catch (error) {
        res.status(500).json({ 
            error,
            message: "Internal Server Error"
         })
    }
}

exports.getBookings = async (req, res) => {
    try {
        const userDate = req.user;

        if(!userDate) {
            return res.status(401).json({
                error: "You do not have permission"
            })
        }

        const booking = await Booking.find({ user: userDate.id }).populate('place')

        res.status(200).json({ booking, success: true })
    } catch (error) {
        res.status(500).json({ 
            error,
            message: "Internal Server Error"
         })
    }
}