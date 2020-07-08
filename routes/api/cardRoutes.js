const Card = require('../../models/Card');
const User = require('../../models/User');
const Deck = require('../../models/Deck');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
	app.get('/api/cards', (req, res) => {
		res.json('success');
	});
};
