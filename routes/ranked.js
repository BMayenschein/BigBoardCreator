const express = require('express')
const router = express.Router()
const rankedController = require('../controllers/ranked')

router.get('/', rankedController.getPlayers) ;
router.get('/getUserBoard', rankedController.getUserBoard);

//Last route because it overrides everything
router.get('/:username', rankedController.getPlayers);


router.post('/addToBoard', rankedController.addToBoard);
router.post('/saveBoard', rankedController.saveBoard);


module.exports = router
