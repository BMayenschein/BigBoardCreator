const express = require('express')
const router = express.Router()
const rankedController = require('../controllers/ranked')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', ensureGuest, rankedController.getPlayers) ;
router.get('/getUserBoard', rankedController.getUserBoard);
router.get('/sortByName', rankedController.sortByName);
router.get('/sortByPosition', rankedController.sortByPosition);
router.get('/sortByPoints', rankedController.sortByPoints);
router.get('/sortByRebounds', rankedController.sortByRebounds);
router.get('/sortByAst', rankedController.sortByAst);


//Last route because it overrides everything
router.get('/:userName', ensureAuth, rankedController.getPlayers);


router.post('/addToBoard', rankedController.addToBoard);
router.post('/saveBoard', rankedController.saveBoard);


module.exports = router
