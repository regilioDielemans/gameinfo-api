const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OntwikkelaarSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    Headquarters: String,
    Founder: String,
    games: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'game' 
    }] 
})

//TODO: change lowercase t to uppercase t
const Ontwikkelaar = mongoose.model('ontwikkelaar', OntwikkelaarSchema);

module.exports = Ontwikkelaar;