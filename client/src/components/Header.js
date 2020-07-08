import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';

const Header = () => {
	return (
		<header id='header'>
			<Link to='/'>
				<h1 className='title'>Quizzler</h1>
			</Link>
			<AuthButtons />
		</header>
	);
};

export default Header;
