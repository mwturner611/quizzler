import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem,  Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Card = (props) => {
    const [cards, setCards] = useState([]);
    const deckID = props.location.state.deckID;
    const deckName = props.location.state.name;
    const [newKeyWord, setNewKeyWord] = useState([]);
	const [newDefinition, setNewDefinition] = useState([]);
    const newCard = {keyWord: newKeyWord,definition:newDefinition};
    const [check, setCheck] = useState(false);
    const history = useHistory();

    const findCards = (deckID) => {
        API.getCard(deckID)
          .then(res =>{
             setCards(res.data)
            resetForm()}
            )
            .catch(err => {console.log(err)
                setCheck(!check)
            });
    };

    // reset from function
    const resetForm = () =>{
        setNewKeyWord('');
        setNewDefinition('');
    }

    	// delete a deck function
	const removeCard = (cardID) =>{
		API.deleteCard(cardID)
		.then(() => findCards(deckID))
		.catch(err => console.log(err));
    };
    
    const addCard = (deckID,cardData) =>{
		API.createCard(deckID,{
			keyWord:cardData.keyWord,
			definition: cardData.definition
		})
		.then(() => findCards(deckID))
		.catch(err => console.log(err));
    };

    const handleKeyWordChange = (event) =>{
		const entered = event.target.value;
		setNewKeyWord(entered)
	};

	const handleDefinitionChange = (event) =>{
		const entered = event.target.value;
		setNewDefinition(entered)
	};
    
	// go to review page
	const review = (deckID,deckName) => {
		history.push({
			pathname: '/review',
			state: { deckID: deckID, name: deckName },
		});
	};

    useEffect(() => {
        findCards(deckID)
    }, [check]);

    return(
        <div>
            <h1>{deckName}: Cards<Button onClick={() => review(deckID,deckName)}>Review Now</Button></h1>
            <ListGroup>
            <ListGroupItem>    
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="Keyword" className="mr-sm-2">Keyword</Label>
                         <Input value={newKeyWord} onChange={handleKeyWordChange} type="input" name="input" id="keyword" placeholder="New KeyWord" />
                    </FormGroup>
                     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="examplePassword" className="mr-sm-2">Definition</Label>
                        <Input value={newDefinition} onChange={handleDefinitionChange} type="input" name="definition" id="definition" placeholder="New Definition" />
                    </FormGroup>
                    <Button onClick={() => addCard(deckID,newCard)}>Add New Card</Button>
                    </Form>
                    </ListGroupItem>
            
                {cards.map (card => (
                    <ListGroupItem>
                        Keyword:  {card.keyWord}    Definition:   {card.definition}
                        <Button onClick={() => removeCard(card._id)}>Delete</Button>
                    </ListGroupItem>
    ))}
    </ListGroup>
        </div>
  );
            
    

};
export default Card;