const Place = require("../models/Place");

exports.addPlace = async (req, res) => {
    try {
        const userData = req.user;

        const {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price
        } = req.body;

        const place = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price
        })
        res.status(200).json({ place })
        
    } catch (error) {
        res.status(500).json({ 
            message: "Internal Server Error",
            error: error
         })
    }
}