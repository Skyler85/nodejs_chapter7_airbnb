const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });

router.post('/upload', upload.array('photos', 100), async (req, res) => {
    try {
        let imageArray = [];

        for (let index = 0; index < req.files.length; index++) {
            let { path } = req.files[index];
            const result = await cloudinary.uploader.upload(path, {
                folder: 'Airbnb/Places'
            });

            imageArray.push(result.secure_url);            
        }

        res.status(200).json(imageArray);
    } catch (error) {
        res.status(500).json({
            error,
            message: "Internal Server Error"
        });
    }
})

router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/booking', require('./booking'));

module.exports = router;