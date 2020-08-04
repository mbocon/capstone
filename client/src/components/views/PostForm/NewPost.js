import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../_actions/post_actions';
import './newPost.css';

function NewPost(props) {
	const dispatch = useDispatch();

	const [seeking, setSeeking] = useState('');
	const [offering, setOffering] = useState('');

	const handleSubmit = e => {
		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		let dataToSubmit = {
			seeking: seeking,
			offering: offering,
            author: localStorage.user,
			user: localStorage.userId,
			email: localStorage.email,
			github: localStorage.github,
			linkedin: localStorage.linkedin,
			avatar: localStorage.avatar
		};

		dispatch(createPost(dataToSubmit)).then(response => {
			if (response.payload) {
				form.reset();
				localStorage.setItem('newPost', true)
				props.props.history.push('/home');
			} else {
				console.log(response.payload);
			}
		});
	};

	const handleChange = e => {
		if (e.target.id === 'seeking') setSeeking(e.target.value);
		if (e.target.id === 'offering') setOffering(e.target.value);
	};

	return (
		<div className='new-post'>
		<div className="new-post-area">
			<h3 className='create-h3'>Create a post</h3>
			<Form className='new-post-form' onSubmit={handleSubmit}>
				<Form.Row>
				
					<Form.Group controlId='seeking' onChange={handleChange}>
						<Form.Label>I want to learn</Form.Label>
						<Form.Control type='text' placeholder='Desired skills' required />
						<Form.Control.Feedback type='invalid'>Required field</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId='offering' onChange={handleChange}>
						<Form.Label>I can teach</Form.Label>
						<Form.Control type='text' placeholder='Enter skills' required />
						<Form.Control.Feedback type='invalid'>Required field</Form.Control.Feedback>
                    </Form.Group>
    
				</Form.Row>

				<Button variant='primary' type='submit' className='create-post-btn'>
					Submit
				</Button>
			</Form>
			</div>
			<div className="instructions">
				<h6>How to?</h6>
				<p className='instructions-p'>Create a post describing what skill(s) you want to learn</p>
				<p className='instructions-p'>Include the skill(s) you can teach your connection in return</p>
				<p className='instructions-p'>Scroll through your feed and see if anyone is offering the skill(s) you desire</p>
				<p className='instructions-p'>If you find a match, connect with them and coordinate a schedule</p>
			</div>
		</div>
	);
}

export default NewPost;
