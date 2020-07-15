import axios from 'axios';

export default {
    createDeck: function(deckData) {
        return axios.post('/api/deck',deckData);
    },

    getDeck: function(deck){
        return axios.get('/api/user/decks',deck);
    }
}