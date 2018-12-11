const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title:{
        type: String,
        required:[true,'title is required']
    },
    beschrijving:{
        type: String
    },
    ontwikkelaar: String


})


const game = mongoose.model('game',GameSchema);

module.exports = game;