const express = require('express')
const router = express.Router()
const rankedController = require('../controllers/ranked')

router.get('/', rankedController.getPlayers) 

module.exports = router
