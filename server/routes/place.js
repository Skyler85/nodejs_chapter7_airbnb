const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { addPlace } = require('../controllers/placeController');
const router = express.Router();

router.route('/').post(isLoggedIn, addPlace);

module.exports = router;