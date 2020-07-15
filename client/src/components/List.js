import React, { useContext, useEffect, useState } from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function List(props) {
    return(
    <ListGroupItem>Name: {props.name}, Subtitle: {props.descr} <Link to ={{
        pathname:'/card',
        aboutProps:{
            deckID: props.key
        }
    }}></Link></ListGroupItem>
				
    );
}

export default List;