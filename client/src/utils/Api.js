import axios from 'axios';

export default {
	// deck calls
	// create a new deck
	createDeck: function (deckData) {
		return axios.post('/api/deck', deckData);
	},
	// get all decks for a user
	getDeck: function () {
		return axios.get('/api/user/decks', {
			headers: {
				'x-auth-token': localStorage.getItem('auth-token'),
			},
		});
	},
	// update a deck
	updateDeck: function (deckID, deckData) {
		return axios.put('/api/deck/' + deckID, deckData);
	},
	// delete a deck
	deleteDeck: function (deckID) {
		return axios.delete('/api/deck/' + deckID);
	},

	// card calls
	// new card
	createCard: function (deckID, cardData) {
		return axios.post('/api/card/' + deckID, cardData);
	},
	// get all cards
	getCard: function (deckID) {
		return axios.get('/api/cards/' + deckID);
	},
	// update card
	updateCard: function (cardID, cardData) {
		return axios.put('/api/card/' + cardID, cardData);
	},
	// delete a card
	deleteCard: function (cardID) {
		return axios.delete('/api/card/' + cardID);
	},
	// post user login
	postUser: function (loginUser) {
		return axios.post('http://localhost:3001/api/users/login', loginUser);
	},
	// post user register
	postUserRegister: function (newUser) {
		return axios.post('http://localhost:3001/api/users/register', newUser);
	},
	// post new user login
	postNewUser: function (email, password) {
		return axios.post('http://localhost:3001/api/users/login', {
			email,
			password,
		});
	},
};
