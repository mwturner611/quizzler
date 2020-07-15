import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { useHistory } from 'react-router-dom';


export default function Home() {
	const { userData } = useContext(UserContext);
	const [userDecks, setDecks] = useState([]);
	const history = useHistory();

	// save a new deck
	function saveDeck(deck){
		API.createDeck({
			name:deck.keyWord,
			descr: deck.definition,
			userID: deck.userID
		})
		.then(() => findDecks())
		.catch(err => console.log(err));
	};
	// find decks
	function findDecks(){
		API.getDeck()
		.then(res => 
			setDecks(res.data)
			)
			.catch(err => console.log(err));
	};
	// update a deck function


	// delete a deck function

	// go to a deck's card page
	const cards = (ID) => {
		history.push({
		pathname:'/cards',
		state:{deckID: ID}
	})
	}

	// bring up the user's decks on entering page
	useEffect(() => {
	 	findDecks()
	}, []);
	

	return (
		<div className='page'>
			{userData.user ? (
				<div>
				<h1>Welcome {userData.user.displayName}</h1>
				<button onClick={() => findDecks()}>Retrieve test deck</button>
				<h4>Your Decks</h4>
				<ListGroup>
					{userDecks.map (deck => (
					  <ListGroupItem>	  
					   Name: {deck.name}   
					   Descr: {deck.descr}
					   <Button onClick={() => cards(deck._id)}>View Cards</Button>
					   <Button>Delete Deck</Button>

					   </ListGroupItem>
					  
					))}
					<ListGroupItem>
         			<Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="Keyword" className="mr-sm-2">Keyword</Label>
                         <Input type="email" name="email" id="keyword" placeholder="New KeyWord" />
                    </FormGroup>
                     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                         <Label for="examplePassword" className="mr-sm-2">Definition</Label>
                        <Input type="email" name="definition" id="definition" placeholder="New Definition" />
                    </FormGroup>
                    <Button>Add New Card</Button>
                    </Form>
                    </ListGroupItem>
				
				</ListGroup>
				</div>
			) : (
				<div>
					<h2>You are not logged in</h2>
				</div>
			)}
		</div>
	);
}
