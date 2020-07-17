import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import ErrorNotice from '../ErrorNotice';
import setAuthToken from '../../utils/setAuthToken';
import API from '../../utils/Api';

const Register = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordcheck, setPasswordcheck] = useState();
	const [displayName, setDisplayName] = useState();
	const [error, setError] = useState('');
	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log('error', err.response.data.msg);
		try {
			const newUser = { email, password, passwordcheck, displayName };
			await API.postUserRegister(newUser);
			const loginRes = await API.postNewUser(email,password);
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});
			setAuthToken(loginRes.data.token);
			localStorage.setItem('auth-token', loginRes.data.token);
			history.push('/');
			// catch block for handling sign-up/sign-in errors
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg);
			console.log(err.response.data);
		}
	};

	return (
		<div className='page'>
			<h2>Sign up here</h2>
			{error && (
				<ErrorNotice message={error} clearError={() => setError(undefined)} />
			)}
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
