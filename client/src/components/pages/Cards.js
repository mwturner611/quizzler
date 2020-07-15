import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import axios from 'axios';
import List from '../List';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default function Card(props) {
    const [cards, setCards] = useState([]);
    const deckID = props.location.state.deckID;

    function findCards(deckID){
        API.getCard(deckID)
          .then(res =>
             setCards(res.data)
            )
            .catch(err => console.log(err));
    };

    useEffect(() => {
        findCards()
    }, []);

    return(
        <div>
            Cards Page {deckID};
        </div>
    );

};