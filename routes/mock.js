const express = require('express')
const router = express.Router()
const mockController = require('../controllers/mock')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureGuest, mockController.getPlayers) ;
router.get('/getUserBoard', mockController.getUserBoard);
router.get('/getDraftOrder', mockController.getDraftOrder);

//Last route because it overrides everything
router.get('/:userName', ensureAuth, mockController.getPlayers);


router.post('/addToBoard', mockController.addToBoard);
router.post('/saveBoard', mockController.saveBoard);


module.exports = router