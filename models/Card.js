const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	
    keyWord: { type: String, required: true },
    definition: { type: String, required: true }
    
});

module.exports = Card = mongoose.model('Card', CardSchema);