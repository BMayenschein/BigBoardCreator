const express = require('express')
const router = express.Router()
const rankedController = require('../controllers/ranked')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureGuest, rankedController.getPlayers) ;
router.get('/getUserBoard', rankedController.getUserBoard);

//Last route because it overrides everything
router.get('/:userName', ensureAuth, rankedController.getPlayers);


router.post('/addToBoard', rankedController.addToBoard);
router.post('/saveBoard', rankedController.saveBoard);


module.exports = router
