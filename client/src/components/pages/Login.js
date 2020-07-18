import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../ErrorNotice';
import UserContext from '../../contexts/UserContext';
import { Button } from 'reactstrap';
import setAuthToken from '../../utils/setAuthToken';
import API from '../../utils/Api';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');
	const { setUserData } = useContext(UserContext);
	const history = useHistory();
	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginUser = { email, password };
			const loginRes = await API.postUser(loginUser);
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});
			setAuthToken(loginRes.data.token);
			localStorage.setItem('auth-token', loginRes.data.token);
			history.push('/');
		} catch (err) {
			err.response.data.msg && setError(err.response.data.msg);
			console.log(err.response.data);
		}
	};
	return (
		<div className='page'>
			<h2>Welcome back. Log in</h2>
			{error && (
				<ErrorNotice message={error} clearError={() => setError(undefined)} />
			)}
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
				<Button>
					<input type='submit' value='Log in' />
				</Button>
			</form>
		</div>
	);
};

export default Login;
