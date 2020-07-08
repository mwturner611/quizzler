const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	
    keyWord: { type: String },
    definition: { type: String },
    
});

module.exports = Card = mongoose.model('card', CardSchema);