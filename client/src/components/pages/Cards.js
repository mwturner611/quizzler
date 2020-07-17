import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem,  Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Card(props) {
    const [cards, setCards] = useState([]);
    const deckID = props.location.state.deckID;
    const deckName = props.location.state.name;
    const [newKeyWord, setNewKeyWord] = useState([]);
	const [newDefinition, setNewDefinition] = useState([]);
    const newCard = {keyWord: newKeyWord,definition:newDefinition};
    const [check, setCheck] = useState(false);

    function findCards(deckID){
        API.getCard(deckID)
          .then(res =>
             setCards(res.data)
            )
            .catch(err => {console.log(err)
                setCheck(!check)
            });
    };

    	// delete a deck function
	function removeCard(cardID){
		API.deleteCard(cardID)
		.then(() => findCards(deckID))
		.catch(err => console.log(err));
    };
    
    function addCard(deckID,cardData){
		API.createCard(deckID,{
			keyWord:cardData.keyWord,
			definition: cardData.definition
		})
		.then(() => findCards(deckID))
		.catch(err => console.log(err));
    };

    function handleKeyWordChange(event){
		const entered = event.target.value;
		setNewKeyWord(entered)
	};

	function handleDefinitionChange(event){
		const entered = event.target.value;
		setNewDefinition(entered)
	};
    
//    update a card function

    useEffect(() => {
        findCards(deckID)
    }, [check]);

    return(
        <div>
            <h1>{deckName}: Cards</h1>
            <ListGroup>
                {cards.map (card => (
                    <ListGroupItem>
                        Keyword:  {card.keyWord}    Definition:   {card.definition}
                        <Button onClick={() => removeCard(card._id)}>Delete</Button>
                    </ListGroupItem>
    ))}
    <ListGroupItem>    
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="Keyword" className="mr-sm-2">Keyword</Label>
                         <Input onChange={handleKeyWordChange} type="input" name="input" id="keyword" placeholder="New KeyWord" />
                    </FormGroup>
                     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="examplePassword" className="mr-sm-2">Definition</Label>
                        <Input onChange={handleDefinitionChange} type="input" name="definition" id="definition" placeholder="New Definition" />
                    </FormGroup>
                    <Button onClick={() => addCard(deckID,newCard)}>Add New Card</Button>
                    </Form>
                    </ListGroupItem>
    </ListGroup>
        </div>
  );
            
    

};