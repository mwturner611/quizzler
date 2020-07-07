const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 5 },
	displayName: { type: String },
	decks: [
		{
			name: String,
			descr: String,
			cards: [
				{
					keyWord: { type: String },
					definition: { type: String },
				},
			],
		},
	],
});

module.exports = User = mongoose.model('user', UserSchema);
