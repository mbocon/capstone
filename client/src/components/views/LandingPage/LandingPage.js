import React, { Fragment } from 'react';
import './LandingPage.css';

function LandingPage() {
	return (
		<Fragment>
			<div className='app'>
				<h2 className='welcome-h2'>Welcome to SWAPPORT</h2>
				<div className='landing-about'>
					<p>A place where people can come together and share their skills</p>
					<p>Register and create a post about what you're trying to learn</p>
					<p>Include what you're willing to teach someone else in exchange</p>
					<p>Connect and SWAPPORT each other</p>
				</div>
			</div>
		</Fragment>
	);
}

export default LandingPage;
