import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, deletePost } from '../../../_actions/post_actions';
import { withRouter } from 'react-router-dom';
import EditPage from '../EditPage/EditPage';
import './allPosts.css';
import moment from 'moment';

function AllPosts(props) {
	const dispatch = useDispatch();

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
						console.log(post)
						date = new Date(post.date);
						return (
							<Fragment key={post._id}>
								{editing === false ? (
									<div className='profile col-xs-12 col-sm-8 col-md-6 col-lg-4'>
										<div className='profile-blog blog-border'>
											<img className='rounded-img' src='data:image/jpeg;base64,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' alt='' />
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
