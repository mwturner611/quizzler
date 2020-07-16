import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem,  Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Card(props) {
    const [cards, setCards] = useState([]);
    const deckID = props.location.state.deckID;
    // const [newKeyWord, setNewKeyWord] = useState([]);
	// const [newDefinition, setNewDefinition] = useState([]);
	// const newCard = {KeyWord: newKeyWord,definition:newDefinition,deckID:deckID};

    function findCards(deckID){
        API.getCard(deckID)
          .then(res =>
             setCards(res.data)
            )
            .catch(err => console.log(err));
    };

    // function addCard(cardData){
	// 	API.createCard({
	// 		keyWord:cardData.keyWord,
	// 		definition: cardData.definition,
	// 		deckID: cardData.deckID
	// 	})
	// 	.then(() => findCards(deckID))
	// 	.catch(err => console.log(err));
    // };

    // function handleKeyWordChange(event){
	// 	const entered = event.target.value;
	// 	setNewKeyWord(entered)
	// };

	// function handleDefinitionChange(event){
	// 	const entered = event.target.value;
	// 	setNewDefinition(entered)
	// };
    
//    update a card function
//  delete a card function

    useEffect(() => {
        findCards(deckID)
    }, []);

    return(
        <div>
            <h1>Cards Page</h1>
            <ListGroup>
                {cards.map (card => (
                <ListGroupItem>    
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="Keyword" className="mr-sm-2">Keyword</Label>
                         <Input type="email" name="email" id="keyword" placeholder={card.keyWord} />
                    </FormGroup>
                     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="examplePassword" className="mr-sm-2">Definition</Label>
                        <Input type="email" name="definition" id="definition" placeholder={card.definition} />
                    </FormGroup>
                    <Button>Update</Button>
                    <Button>Delete</Button>
                    </Form>
                    </ListGroupItem>
    ))}
    {/* <ListGroupItem>    
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="Keyword" className="mr-sm-2">Keyword</Label>
                         <Input onChange={handleKeyWordChange} type="input" name="input" id="keyword" placeholder="New KeyWord" />
                    </FormGroup>
                     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="examplePassword" className="mr-sm-2">Definition</Label>
                        <Input onChange={handleDefinitionChange} type="input" name="definition" id="definition" placeholder="New Definition" />
                    </FormGroup>
                    <Button onClick={() => addCard(newCard)}>Add New Card</Button>
                    </Form>
                    </ListGroupItem> */}
    </ListGroup>
        </div>
  );
            
    

};