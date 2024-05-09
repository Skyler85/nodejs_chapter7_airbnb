const Place = require("../models/Place");

// 숙소 추가
exports.addPlace = async (req, res) => {
    try {
        const userData = req.user;
        console.log({userData: userData})

        const { title, address, addedPhotos, description, perks, extraInfo, maxGuests, price } = req.body;

        const place = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price,
        });
        res.status(200).json({ place });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
};


exports.getPlaces = async (req, res) => {
    try {
        const place = await Place.find();
        res.status(200).json({
            places,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// 유저가 등록한 숙소만 보여주기
exports.userPlaces = async (req, res) => {
    try {
        const userDate = req.user;
        const id = userDate.id;
        res.status(200).json(await Place.find({ owner: id }));
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// 숙소 자세히 보기 Page
exports.singlePlace = async (req, res) => {
    try {
        const {id} = req.params;
        const place = await Place.findById(id);

        if (!place) {
            return res.status(400).json({
                message: "Place Not Found"
            })
        }

        res.status(200).json({
            place
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

// 검색한 숙소 리스트 보기
exports.searchPlaces = async (req, res) => {
    try {
        const searchWord = req.params.key

        if (searchWord === '') return res.status(200).json(await Place.find())

        const searchMatches = await Place.find({ address: {$regex: searchWord, $options: 'i'}})
        res.status(200).json(searchMatches)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}


