const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const playerInfoSchema = new mongoose.Schema({
    _id: {
        type: ObjectId
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    position: {
        type: String,
    }

});

const playerInfo = mongoose.model("Player", playerInfoSchema)
module.exports = playerInfo