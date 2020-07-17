import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem,  Button, Form, FormGroup, Label, Input} from 'reactstrap';
import CardTester from '../CardTester/CardTester';

export default function Review(props){
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const deckID = props.location.state.deckID;
    const deckName = props.location.state.name;
    const [nextDisabled, setNextDisabled] = useState(false);
    const [previousDisabled, setPreviousDisabled] = useState(true);
    const [count, setCount] = useState(0);
    const [check, setCheck] = useState(false);

    function findCards(deckID){
        API.getCard(deckID)
            .then(res => {
                setCards(res.data);
                setCurrentCard(res.data[0]);
            })
            .catch(err => {
                console.log(err);
                setCheck(!check);
            });
    };

    function nextItem(){
        setCount(count+1);
        setCardOnPage(count+1);
    }

    function previousItem(){
        setCount(count-1);
        setCardOnPage(count-1);
    }

    function setCardOnPage(num){
        if (num < 1){
            setPreviousDisabled(true);
            setCurrentCard(cards[num]);
        } else if (num > 0) {
            setPreviousDisabled(false);
            setCurrentCard(cards[num]);
        } else if (num > cards.length) {
            setNextDisabled(true);
            setPreviousDisabled(true);
        }
    }
    
    useEffect(() => {
        findCards(deckID)
    }, [check]);

    return(
        <div>
            <h1>Review {deckName}</h1>
            <div className='conatainer'>
                <div className='row'>
                    <div className='col-3'>
                        {previousDisabled === true ? (
                            <Button onClick={() => previousItem()} disabled>Previous Card</Button>
                        ) : (
                            <Button onClick={() => previousItem()}>Previous Card</Button>
                        )}
                    </div>
                    <div className='col-6'>
                        {/* {cards.map(card => (
                            <CardTester 
                            keyword={card.keyWord}
                            definition={card.definition}
                            />
                        ))} */}
                        {currentCard ? (
                            <CardTester 
                            keyword={currentCard.keyWord}
                            definition={currentCard.definition}
                            />
                        ) : (
                            <h4>Great job, you have finished your review!</h4>
                        )}
                        
                    </div>
                    <div className='col-3'>
                        {nextDisabled === true ? (
                            <Button onClick={() => nextItem()} disabled>Next Card</Button>
                        ) : (
                            <Button onClick={() => nextItem()}>Next Card</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )



};