import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import API from '../../utils/Api';
import {
	ListGroup,
	ListGroupItem,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

export default function Home() {
	const { userData } = useContext(UserContext);
	const userID = userData.user;
	const [userDecks, setDecks] = useState([]);
	const history = useHistory();
	const [newTitle, setNewTitle] = useState([]);
	const [newDescr, setNewDescr] = useState([]);
<<<<<<< HEAD
	const newDeck = { name: newTitle, descr: newDescr };
=======
	const newDeck = {name: newTitle,descr:newDescr};
	const [check, setCheck] = useState(false);
	

>>>>>>> cf8d210825f23b1272daa646412ea9825a6eb927

	// save a new deck
	function saveDeck(deck) {
		API.createDeck({
			name: deck.name,
			descr: deck.descr,
		})
			.then(() => findDecks())
			.catch((err) => console.log(err));
	}

	// collect what's entered in title field set state
	function handleTitleChange(event) {
		const entered = event.target.value;
		setNewTitle(entered);
	}

	// collect what's entered in descr. field and set state
	function handleDescrChange(event) {
		const entered = event.target.value;
		setNewDescr(entered);
	}

	// find decks
	function findDecks() {
		API.getDeck()
<<<<<<< HEAD
			.then((res) => setDecks(res.data))
			.catch((err) => console.log(err));
	}
=======
		.then(res => 
			setDecks(res.data)
			)
			.catch(err => {console.log(err)
				setCheck(!check)
			});
	};
>>>>>>> cf8d210825f23b1272daa646412ea9825a6eb927
	// update a deck function

	// delete a deck function
	function removeDeck(deckID) {
		API.deleteDeck(deckID)
			.then(() => findDecks())
			.catch((err) => console.log(err));
	}

	// go to a deck's card page
	const cards = (deck) => {
		history.push({
			pathname: '/cards',
			state: { deckID: deck._id, name: deck.name },
		});
	};
	// go to review page
	const review = (deck) => {
		history.push({
			pathname: '/review',
			state: { deckID: deck._id, name: deck.name },
		});
	};

	// bring up the user's decks on entering page
	// useEffect(() => {
	// 	setAuthToken(userData.token);
	// }, []);

	useEffect(() => {
<<<<<<< HEAD
		findDecks();
	}, []);
=======
	 	findDecks();
	},[check]);
>>>>>>> cf8d210825f23b1272daa646412ea9825a6eb927

	return (
		<div className='page'>
			{userData.user ? (
				<div>
					<h1>Welcome {userData.user.displayName}</h1>
					<h4>Your Decks</h4>
					<ListGroup>
						<TransitionGroup className='deck-list'>
							{userDecks.map((deck) => (
								<CSSTransition key={deck.name} timeout={500} classNames='fade'>
									<ListGroupItem>
										Name: {deck.name} Descr: {deck.descr}
										<Button onClick={() => cards(deck)}>Edit Cards</Button>
										<Button onClick={() => review(deck)}>Review Deck</Button>
										<Button onClick={() => removeDeck(deck._id)}>Delete Deck</Button>
									</ListGroupItem>
								</CSSTransition>
							))}
							<ListGroupItem>
								<Form inline>
									<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
										<Label for='Keyword' className='mr-sm-2'>
											Name
										</Label>
										<Input
											onChange={handleTitleChange}
											type='email'
											name='email'
											id='keyword'
											placeholder='Title the deck'
										/>
									</FormGroup>
									<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
										<Label for='examplePassword' className='mr-sm-2'>
											Description
										</Label>
										<Input
											onChange={handleDescrChange}
											type='email'
											name='definition'
											id='definition'
											placeholder='Describe the deck'
										/>
									</FormGroup>
									<Button onClick={() => saveDeck(newDeck)}>Add New Deck</Button>
								</Form>
							</ListGroupItem>
						</TransitionGroup>
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
