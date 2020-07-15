import React, { useContext, useEffect, useState } from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';


function List(props) {
    return(
    <ListGroupItem>Name: {props.name}, Subtitle: {props.descr}</ListGroupItem>
				
    );
}

export default List;