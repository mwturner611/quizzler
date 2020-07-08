const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 5 },
	displayName: { type: String },
	// decks: [{ type: Schema.Types.ObjectId, ref: 'Deck' }]
});

module.exports = User = mongoose.model('user', UserSchema);
