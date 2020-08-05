import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, deletePost } from '../../../_actions/post_actions';
import { withRouter } from 'react-router-dom';
import EditPage from '../EditPage/EditPage';
import './allPosts.css';
import moment from 'moment';

function AllPosts(props) {
	const dispatch = useDispatch();
	console.log(localStorage)
	let [posts, setPosts] = useState([]);
	let [editing, setEditing] = useState(false);
	let [searchTerm, setSearchTerm] = useState('');
	let [newPost, setNewPost] = useState(false);

	useEffect(() => {
		setNewPost(localStorage.newPost);
		if (newPost === 'true') {
			dispatch(getPosts()).then(response => {
				if (response.payload) {
					setPosts(response.payload);
					localStorage.removeItem('newPost');
				} else {
					console.log('error getting posts');
				}
			});
		} 
		if (localStorage.deletedPost === 'true'){
			dispatch(getPosts()).then(response => {
				if (response.payload) {
					setPosts(response.payload);
					localStorage.removeItem('deletedPost');
				} else {
					console.log('error getting posts');
				}
			});
		}
	});

	useEffect(() => {
		if (searchTerm === '') {
			dispatch(getPosts()).then(response => {
				if (response.payload) {
					setPosts(response.payload);
				} else {
					console.log('error getting posts');
				}
			});
		} else if (searchTerm !== '') {
			const results = posts.filter(post => post.offering.toLowerCase().includes(searchTerm));
			setPosts(results);
		}
	}, [searchTerm, editing]);

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
						localStorage.setItem('deletedPost', true)
					} else {
						console.log('error getting posts');
					}
				});
			} else {
				console.log('error deleting');
			}
		});
	};

	const toggleEdit = postId => {
		localStorage.setItem('thePostId', postId);
		editing === false ? setEditing(true) : setEditing(false);
	};

	const handleSearch = e => {
		setSearchTerm(e.target.value);
	};

	let date;

	return (
		<div className='all-posts row'>
			{editing === false ? (
				<div className='search'>
					<input type='text' onChange={handleSearch} placeholder='Search offered skills' className='search-bar' />
				</div>
			) : null}

			{posts.length > 0 &&
				posts
					.slice(0)
					.reverse()
					.map(post => {
						// console.log(post)
						date = new Date(post.date);
						return (
							<Fragment key={post._id}>
								{editing === false ? (
									<div className='profile col-xs-12 col-sm-8 col-md-6 col-lg-4'>
										<div className='profile-blog blog-border'>
											<img className='rounded-img' src={post.avatar} alt='' />
											<div className='name-location'>
												<strong>{post.author}</strong>
												<span className='post-time'>Posted {moment(date).fromNow(true)} ago</span>
											</div>
											<div className='clearfix margin-bottom-20'></div>
											<p className='skills-p'>
												<span className='info'>Asking:</span> {post.seeking}
											</p>
											<p className='skills-p'>
												<span className='info'>Offering:</span> {post.offering}
											</p>
											<hr />
											<div>
												<ul className='ul'>
													{localStorage.userId === post.user ? (
														<div className='post-btns'>
															<button onClick={() => toggleEdit(post._id)} className='edit-btn btn '>
																Edit
															</button>
															<button onClick={() => handleDelete(post._id)} className='delete-btn btn'>
																Delete
															</button>
														</div>
													) : (
														<ul className='list-inline social-list'>
															<li>
																<a href={`mailto:${post.email}`} className='social-icon'>
																	<i className='fa fa-envelope' aria-hidden='true'></i>
																</a>
															</li>
															<li>
																<a href={`${post.github}`} className='social-icon' target="_blank" rel="noopener noreferrer">
																	<i className='fa fa-github-square' aria-hidden='true'></i>
																</a>
															</li>
															<li>
																<a href={`${post.linkedin}`} className='social-icon' target="_blank" rel="noopener noreferrer">
																	<i className='fa fa-linkedin-square' aria-hidden='true'></i>
																</a>
															</li>
														</ul>
													)}
												</ul>
											</div>
										</div>
									</div>
								) : (
									<EditPage
										props={props}
										post={post}
										postId={localStorage.thePostId}
										toggleEdit={toggleEdit}
										searchTerm={searchTerm}
										setSearchTerm={setSearchTerm}
									/>
								)}
							</Fragment>
						);
					})}
		</div>
	);
}

export default withRouter(AllPosts);
