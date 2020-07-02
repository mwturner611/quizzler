const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    cards: [
        {
            keyWord: {type: String},
            definition: {type: String}
        }

    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Deck = mongoose.model("Deck",DeckSchema);

module.exports = Deck;