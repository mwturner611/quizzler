import React, { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import axios from 'axios';

export default function Home() {
	const { userData } = useContext(UserContext);
	const testDeck = {
		name:'NEWtestDeck',
		descr:'This is a NEW descr.',
		userID: '5f0da396d12a5029c5796843'
	}

	function saveDeck(deck){
		axios.post('/api/deck',{
			name: deck.name,
			descr: deck.descr,
			userID: deck.userID
		})
		.catch(err => console.log(err));
	}
	function findDecks(ID){

		API.getDeck(ID)
		.then(res => 
			console.log(res.data)
			)
			.catch(err => console.log(err));
	}

	// useEffect(() => {
	// 	saveDeck(testDeck)
	// }, []);
	

	return (
		<div className='page'>
			{userData.user ? (
				<div>
				<h1>Welcome {userData.user.displayName}</h1>
				<button onClick={() => saveDeck(testDeck)}>Save test deck</button>
				<button onClick={() => findDecks(testDeck)}>Retrieve test deck</button>
				</div>
			) : (
				<div>
					<h2>You are not logged in</h2>
				</div>
			)}
		</div>
	);
}
