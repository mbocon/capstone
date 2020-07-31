import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, deletePost } from '../../../_actions/post_actions';
import { withRouter } from 'react-router-dom';
import './allPosts.css';
import './allPostsSASS.scss';
import { useEffect } from 'react';

function AllPosts(props) {
	const dispatch = useDispatch();

	let [posts, setPosts] = useState([]);

	useEffect(()=>{
		dispatch(getPosts()).then(response => {
			if (response.payload) {
				setPosts(response.payload);
			} else {
				console.log('error getting posts');
			}
		});
	})

	
	console.log(localStorage.userId, 'is the user id');

	const handleDelete = id => {
		let dataToSubmit = {
			postId: id,
			userId: localStorage.userId,
		};
		dispatch(deletePost(dataToSubmit)).then(response => {
			if (response.payload) {
				dispatch(getPosts()).then(response => {
					if (response.payload) {
						setPosts(response.payload);
					} else {
						console.log('error getting posts');
					}
				});
			} else {
				console.log('error deleting');
			}
		});
	};

	posts = posts.reverse();

	return (
		<div className='all-posts'>
			{posts.length > 0 &&
				posts.map(post => {
					return (
						<div className='outer-div' key={post.id}>
						
							<div className={localStorage.userId === post.user ? 'inner-div-alt' : 'inner-div'}>
								<div className='front'>
									<div className='front__bkg-photo'></div>
									<div className='front__face-photo'>
										<img
											src='https://images.unsplash.com/photo-1517384084767-6bc118943770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
											alt=''
										/>
									</div>
									<div className='front__text'>
										<h3 className='front__text-header'>{post.author}</h3>
										<p className='front__text-para'>Wants to learn: <span className="info">{post.seeking}</span></p>
										<p className='front__text-para'>Willing to teach: <span className="info">{post.offering}</span></p>
										{localStorage.userId === post.user ? (
											<div className='post-btns'>
												<button className='edit-btn btn btn-success'>Edit</button>
												<button onClick={() => handleDelete(post._id)} className='delete-btn btn btn-danger'>
													Delete
												</button>
											</div>
										) : (
											<i class="fa fa-share flip-icon"></i>
										)}
									</div>
								</div>
								<div className='back'>
									<div className='social-media-wrapper'>
										<a href='#' className='social-icon'>
											<i className='fa fa-envelope' aria-hidden='true'></i>
										</a>
										<a href='#' className='social-icon'>
											<i className='fa fa-github-square' aria-hidden='true'></i>
										</a>
										<a href='#' className='social-icon'>
											<i className='fa fa-linkedin-square' aria-hidden='true'></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default withRouter(AllPosts);

// <div className='post-card container' key={post._id}>
// 								<h6>
// 									<span className='post-content'> Posted by:</span> {post.author}
// 								</h6>
// 								<p>
// 									<span className='post-content'> Seeking: </span>
// 									{post.seeking}
// 								</p>
// 								<p>
// 									<span className='post-content'> Offering: </span>
// 									{post.offering}
// 								</p>
// 								<p>
// 									<span className='post-content'> Available: </span>
// 									{post.available}
// 								</p>
//
// 								</div>
