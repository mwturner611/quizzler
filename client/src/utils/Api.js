import axios from 'axios';

export default {
    // deck calls
    // create a new deck
    createDeck: function(deckData) {
        return axios.post('/api/deck',deckData);
    },
    // get all decks for a user
    getDeck: function(){
        return axios.get('/api/user/decks');
    },

    // card calls
    // new card
    createCard: function(cardData){
        return axios.post('/api/card/:deck',cardData);
    },
    // get all cards
    getCard: function(deckID){
        return axios.get('/api/cards/'+ deckID);
    },
    
}