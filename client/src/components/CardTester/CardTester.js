import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import './CardTester.css';

function CardTester(props) {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    return(

        <div className='mt-3'>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" infinite>
                <div className="card w-100 text-center">
                    <div className="card-body">
                        <h5 className="card-title">Keyword</h5>
                        <p className="card-text">{props.keyword}</p>
                        <button onClick={handleFlip} className="btn btn-primary">View definition</button>
                    </div>
                </div>
        
                <div className="card w-100 text-center">
                    <div className="card-body">
                        <h5 className='card-title'>Definition</h5>
                        <p className="card-text">{props.definition}</p>
                        <button onClick={handleFlip} className="btn btn-primary">View keyword</button>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
		
    )
}

export default CardTester;
