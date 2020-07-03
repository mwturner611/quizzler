const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: 'Email is Required',
		match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
	},
	password: {
		type: String,
		trim: true,
		required: 'Password is Required',
		validate: [
			({ length }) => length >= 8,
			'Password should be 8 characters or more.',
		],
	},
	userCreated: {
		type: Date,
		default: Date.now,
	},
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
