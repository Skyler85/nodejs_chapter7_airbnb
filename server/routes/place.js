const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { addPlace, getPlaces, userPlaces, singlePlace, searchPlaces } = require("../controllers/placeController");
const router = express.Router();

router.route("/")
    .post(isLoggedIn, addPlace)
    .get(getPlaces);

router.route('/user').get(isLoggedIn, userPlaces);
router.route('/:id').get(singlePlace)
router.route('/search/:key').get(searchPlaces)
module.exports = router;
