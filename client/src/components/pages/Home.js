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

const Home = () => {
	const { userData } = useContext(UserContext);
	const userID = userData.user;
	const [userDecks, setDecks] = useState([]);
	const history = useHistory();
	const [newTitle, setNewTitle] = useState('');
	const [newDescr, setNewDescr] = useState('');
	const newDeck = { name: newTitle, descr: newDescr };
	const [check, setCheck] = useState(false);

	// save a new deck
	const saveDeck = (deck) => {
		API.createDeck({
			name: deck.name,
			descr: deck.descr,
		})
			.then(() => {
			findDecks()
			resetForm()}
			)
			.catch((err) => console.log(err));
	}

	// reset form function
	const resetForm = () => {
		setNewTitle('');
		setNewDescr('');
	}

	// collect what's entered in title field set state
	const handleTitleChange = (event) => {
		const entered = event.target.value;
		setNewTitle(entered);
	}

	// collect what's entered in descr. field and set state
	const handleDescrChange = (event) => {
		const entered = event.target.value;
		setNewDescr(entered);
	}

	// find decks
	const findDecks = () => {
		API.getDeck()
			.then((res) => setDecks(res.data))
			.catch((err) => {
				console.log(err);
				setCheck(!check);
			});
	}

	// delete a deck function
	const removeDeck = (deckID) => {
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

	useEffect(() => {
		findDecks();
	}, [check]);

	return (
		    <div className='page'>
				{userData.user ? (
					<div>
					<h1>Welcome {userData.user.displayName}</h1>
					<h4>Your Decks</h4>
					<ListGroup>
						<TransitionGroup className='deck-list'>
						<ListGroupItem>
								<Form inline>
									<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
										<Label for='Keyword' className='mr-sm-2'>
											Name
										</Label>
										<Input
											onChange={handleTitleChange}
											type='text'
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
											type='text'
											name='definition'
											id='definition'
											placeholder='Describe the deck'
										/>
									</FormGroup>
									<Button onClick={() => saveDeck(newDeck)}>Add New Deck</Button>
								</Form>
							</ListGroupItem>
							{userDecks.map((deck) => (
								<CSSTransition key={deck.id} timeout={500} classNames='fade'>
									<ListGroupItem>
										Name: {deck.name} Descr: {deck.descr}
										<Button  onClick={() => cards(deck)}>Edit Cards</Button>
										<Button  onClick={() => review(deck)}>Review Deck</Button>
										<Button  onClick={() => removeDeck(deck._id)}>Delete Deck</Button>
									</ListGroupItem>
								</CSSTransition>
							))}
							
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

export default Home;