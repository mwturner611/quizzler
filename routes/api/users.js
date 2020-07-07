// const usersController = require('../../controllers/usersController');
const User = require('../../models/User');
module.exports = (app) => {
	app.get('/api/users', (req, res) => {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.json(err));
	});
};
