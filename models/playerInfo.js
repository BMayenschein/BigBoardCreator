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
    position: {
        type: String,
    },
    prevTeam: {
        type: String,
    },
    age: {
        type: String,
    },
    height: {
        type: String,
    },
    wingspan: {
        type: String,
    },
    PTS: {
        type: String,
    },
    FG: {
        type: String,
    },
    "3FG": {
        type: String,
    },
    eFG: {
        type: String,
    },
    REB: {
        type: String,
    },
    AST: {
        type: String,
    },
    TO: {
        type: String,
    },
    "A:TO": {
        type: String,
    },
    STL: {
        type: String,
    },
    BLK: {
        type: String,
    },
    STOCK: {
        type: String,
    },
    FT: {
        type: String,
    },
    "FT RATE": {
        type: String,
    },
    "3pt Rate": {
        type: String,
    },
    "TO Rate": {
        type: String,
    },
    "USG Rate": {
        type: String,
    },
});

const playerInfo = mongoose.model("Player", playerInfoSchema)
module.exports = playerInfo


