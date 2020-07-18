import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem,  Button, Form, FormGroup, Label, Input} from 'reactstrap';
import CardTester from '../CardTester/CardTester';
import { Link } from 'react-router-dom';

export default function Review(props){
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const deckID = props.location.state.deckID;
    const deckName = props.location.state.name;
    const [nextDisabled, setNextDisabled] = useState(false);
    const [previousDisabled, setPreviousDisabled] = useState(true);
    const [count, setCount] = useState(0);
    const [check, setCheck] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

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
            <h1 className='text-center mt-5'>Review - {deckName}</h1>
            <div className='container mt-5'>
                <div className='row'>
                    {currentCard ? (
                        <div className='col-md-3 col-sm-12 d-flex justify-content-center align-items-start'>
                        {previousDisabled === true ? (
                            <Button onClick={() => previousItem()} disabled>Previous Card</Button>
                        ) : (
                            <Button onClick={() => previousItem()}>Previous Card</Button>
                        )}
                    </div>
                    ) : (
                        <div></div>
                    )}
                    {currentCard ? (
                    <div className='col-md-6 col-sm-12'>
                        
                            <CardTester 
                            keyword={currentCard.keyWord}
                            definition={currentCard.definition}
                            isFlipped={isFlipped}
                            handleFlip={handleFlip}
                            />
                    </div>
                        ) : (
                            <div className='col-12 text-center'>
                                <h4>Great job, you have finished your review!</h4>
                                <Link to='/'>
                                <Button>Back to my Decks</Button>
                                </Link>
                            </div>
                        )}
                    
                    {currentCard ? (
                        <div className='col-md-3 col-sm-12 d-flex justify-content-center align-items-start'>
                        {nextDisabled === true ? (
                            <Button onClick={() => nextItem()} disabled>Next Card</Button>
                        ) : (
                            <Button onClick={() => nextItem()}>Next Card</Button>
                        )}
                    </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )



};