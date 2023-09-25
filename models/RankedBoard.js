const mongoose = require('mongoose')

const RankedBoardSchema = new mongoose.Schema({
    madeBy: {
        type: String,
        required: true,
    },
    board: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model("RankedBoard", RankedBoardSchema);