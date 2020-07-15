import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import axios from 'axios';
import List from '../List';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default function Home() {
	const { userData } = useContext(UserContext);
	const [userDecks, setDecks] = useState([]);

	// save a new deck
	function saveDeck(deck){
		axios.post('/api/deck',{
			name: deck.name,
			descr: deck.descr,
			userID: deck.userID
		})
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

	// go to a deck's card page


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
					  <List 
					   name={deck.name}
					   descr={deck.descr}
					   key={deck._id}
					  />
					))}
				
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
