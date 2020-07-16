import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem,  Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Review(props){
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState([]);
    const deckID = props.location.state.deckID;
    const deckName = props.location.state.name;
    let i = 0;

    function findCards(deckID){
        API.getCard(deckID)
          .then(res =>
             setCards(res.data)
            )
            .catch(err => console.log(err));
    };

    function nextItem(){
        if (i = 0){
            setCurrentCard(cards[0]);
            i = i+1;
        }
        else if(i !== 0 && i < cards.length){
            setCurrentCard(cards[i])
            i = i + 1;
        }
        else{
            // Ask the user what they want to do
        }
    }

    function previousItem(){
        if (i = 0){
            // Ask the user what they want to do
        }
        else if(i !== 0){
            i = i -1;
            setCurrentCard(cards[i])
        }
        else{
            setCurrentCard(cards[0]);
            i = i+1; 
        }
    }
    
    useEffect(() => {
        findCards(deckID)
    }, []);

    return(
        <div>
            <h1>Review {deckName}</h1>
            <Button onClick={() => nextItem()}>Next Card</Button>
            {currentCard.keyWord}
            {currentCard.definition}
            <Button onClick={() => previousItem()}>Previous Card</Button>
        </div>
    )



};