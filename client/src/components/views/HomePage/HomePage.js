import React, { Fragment } from 'react';
import NewPost from '../PostForm/NewPost';
import AllPosts from '../AllPosts/AllPosts';
import Footer from '../Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './homePage.css';

function HomePage(props) {
	console.log(localStorage);

	return (
		<Fragment>
			<div className='welcome'>
				<h3 className='welcome-h3'>Hello {localStorage.user}</h3>
			</div>
			<div className='app'>
				<div className='home-main'>
					<NewPost props={props} />
					<AllPosts />
				</div>
			</div>
			<Footer />
		</Fragment>
	);
}

export default withRouter(HomePage);
