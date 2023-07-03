const express = require('express')
const router = express.Router()
const rankedController = require('../controllers/ranked')

router.get('/', rankedController.getPlayers) ;
router.post('/addToBoard', rankedController.addToBoard);

module.exports = router
