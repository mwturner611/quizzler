import React from 'react';

const ErrorNotice = (props) => {
	return (
		<div className='error-notice'>
			<span>{props.message}</span>
			<button onClick={props.clearError}>x</button>
		</div>
	);
};

export default ErrorNotice;
