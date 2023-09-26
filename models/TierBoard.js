const mongoose = require('mongoose')

const TierBoardSchema = new mongoose.Schema({
    madeBy: {
        type: String,
        required: true,
    },
    board: {
        type: Array,
        required: true,
    },
    playerPool: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("TierBoard", TierBoardSchema);