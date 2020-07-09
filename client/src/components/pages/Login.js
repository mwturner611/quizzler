import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Axios from 'axios';
const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	// handle submit
	const handleSubmit = async (e) => {
		console.log('clicked');
		e.preventDefault();
		const loginUser = { email, password };
		const loginRes = await Axios.post(
			'http://localhost:3001/api/users/login',
			loginUser
		);
		setUserData({
			token: loginRes.data.token,
			user: loginRes.data.user,
		});
		localStorage.setItem('auth-token', loginRes.data.token);
		history.push('/');
	};
	return (
		<div className='page'>
			<h2>Welcome back. Log in</h2>
			<form className='form' onSubmit={handleSubmit}>
				<label htmlFor='login-email'>Email</label>
				<input
					id='login-email'
					type='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='login-password'>Password</label>
				<input
					id='login-password'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type='submit' value='Log in' />
			</form>
		</div>
	);
};

export default Login;
