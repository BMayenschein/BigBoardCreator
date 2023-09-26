const express = require('express')
const router = express.Router()
const tierController = require('../controllers/tier')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureGuest, tierController.getPlayers) ;
router.get('/getUserBoard', tierController.getUserBoard);

//Last route because it overrides everything
router.get('/:userName', ensureAuth, tierController.getUserBoard);


router.post('/addToBoard', tierController.addToBoard);
router.post('/saveBoard', tierController.saveBoard);


module.exports = router