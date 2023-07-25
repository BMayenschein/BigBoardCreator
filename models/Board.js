const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
    madeBy: {
        type: String,
        required: true,
    },
    board: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model("Board", BoardSchema);