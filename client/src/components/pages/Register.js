import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Axios from 'axios';

const Register = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordcheck, setPasswordcheck] = useState();
	const [displayName, setDisplayName] = useState();
	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { email, password, passwordcheck, displayName };
		await Axios.post('http://localhost:5000/api/users/register', newUser);
		const loginRes = await Axios.post('http://localhost:5000/api/users/login', {
			email,
			password,
		});
		setUserData({
			token: loginRes.data.token,
			user: loginRes.data.user,
		});
		localStorage.setItem('auth-token', loginRes.data.token);
		history.push('/');
	};

	return (
		<div className='page'>
			<h2>Sign up here</h2>
			<form className='form' onSubmit={handleSubmit}>
				<label htmlFor='register-email'>Email</label>
				<input
					id='register-email'
					type='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='register-password'>Password</label>
				<input
					id='register-password'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					placeholder='verify password'
					type='password'
					onChange={(e) => setPasswordcheck(e.target.value)}
				/>
				<label htmlFor='register-displayname'>Username</label>
				<input
					id='register-displayname'
					type='text'
					onChange={(e) => setDisplayName(e.target.value)}
				/>
				<input type='submit' value='register' />
			</form>
		</div>
	);
};

export default Register;
