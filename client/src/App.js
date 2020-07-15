import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Cards from './components/pages/Cards'
import Header from './components/Header';
import UserContext from './contexts/UserContext';

function App() {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	useEffect(() => {
		const isLoggedIn = async () => {
			let token = localStorage.getItem('auth-token');
			if (token === null) {
				localStorage.setItem('auth-token', '');
				token = '';
			}
			const tokenRes = await Axios.post(
				'http://localhost:3001/api/users/tokenIsValid',
				null,
				{ headers: { 'x-auth-token': token } }
			);
			if (tokenRes.data) {
				const userRes = await Axios.get('http://localhost:3001/api/users', {
					headers: { 'x-auth-token': token },
				});
				setUserData({
					token,
					user: userRes.data,
				});
			}
		};

		isLoggedIn();
	}, []);

	return (
		<div>
			<BrowserRouter>
				<UserContext.Provider value={{ userData, setUserData }}>
					<Header />
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/register' component={Register} />
							<Route path='/login' component={Login} />
							<Route path='/card' component={Cards}/>
						</Switch>
					</div>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
