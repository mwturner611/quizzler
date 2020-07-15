import React, { useContext, useEffect, useState } from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';


function ListCards(props) {
    return(
    <ListGroupItem>Name: {props.keyword}, Subtitle: {props.definition}</ListGroupItem>
				
    );
}

export default ListCards;