import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const AuthButtons = () => {
	const { userData, setUserData } = useContext(UserContext);
	const history = useHistory();

	const register = () => {
		history.push('/register');
	};
	const login = () => {
		history.push('/login');
	};
	// this will return userdata hook back to original state and remove token from local storage
	const logout = () => {
		setUserData({
			token: undefined,
			user: undefined,
		});
		localStorage.setItem('auth-token', '');
	};
	return (
		<nav className='auth-buttons'>
			{userData.user ? (
				<Button color='warning' onClick={logout}>
					Log Out
				</Button>
			) : (
				<div>
					<Button color='info' onClick={register}>
						Register
					</Button>
					<Button color='info' onClick={login}>
						Login
					</Button>
				</div>
			)}
		</nav>
	);
};

export default AuthButtons;
