import React from 'react';
import { Button, ListGroupItem} from 'reactstrap';
import deleteImg from '../images/close.png';


function ListCards(props) {
    return(
        
        <div className='mb-3 mx-5'>
            <ListGroupItem className='deck-border list-card'>
                <div className='row'>
                    <div className='col-md-8 pt-3'>
                        <h3>{props.name}</h3>
                        <p>{props.descr}</p>
                    </div>
                    <div className='col-md-4'>
                        <div className='row'>
                            <div className='col-md-12 col-lg-6'>
                                <Button className='btn-block btn-decks d-flex justify-content-center align-items-center mt-3' onClick={() => props.cards(props.deck)}>Edit</Button>
                                <Button className='btn-block btn-decks d-flex justify-content-center align-content-center' onClick={() => props.review(props.deck)}>Review</Button>
                            </div>
                            <div className='col-md-12 col-lg-6 d-flex justify-content-end align-items-start'>
                                <Button className='deleteBtnStyle bg-transparent' onClick={() => props.removeDeck(props.deck._id)}><img className='delete-btn' src={deleteImg} alt='delete button'/></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </ListGroupItem>
        </div>
				
    );
}

export default ListCards;