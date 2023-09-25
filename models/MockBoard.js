const mongoose = require('mongoose')

const MockBoardSchema = new mongoose.Schema({
    madeBy: {
        type: String,
        required: true,
    },
    board: {
        type: Array,
        required: true,
    },
    draftOrder: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("MockBoard", MockBoardSchema);