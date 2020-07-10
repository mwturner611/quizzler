import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Home() {
	const { userData } = useContext(UserContext);

	return (
		<div className='page'>
			{userData.user ? (
				<h1>Welcome {userData.user.displayName}</h1>
			) : (
				<div>
					<h2>You are not logged in</h2>
				</div>
			)}
		</div>
	);
}
