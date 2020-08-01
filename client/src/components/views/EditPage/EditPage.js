import React, { useState } from 'react';
import './EditPage.css';
import { updatePost } from '../../../_actions/post_actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

function EditPage(props) {
	const dispatch = useDispatch();

	const [updatedSeeking, setSeeking] = useState(props.post.seeking);
	const [updatedOffering, setOffering] = useState(props.post.offering);

	const handleSubmit = e => {
		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		let dataToSubmit = {
			seeking: updatedSeeking,
			offering: updatedOffering,
			author: localStorage.user,
			user: localStorage.userId,
			id: props.post._id,
		};

		dispatch(updatePost(dataToSubmit)).then(response => {
			if (response.payload) {
				form.reset();
				props.setSearchTerm('');
				props.toggleEdit();
			} else {
				console.log(response.payload);
			}
		});
	};

	const handleChange = e => {
		if (e.target.id === 'seeking') setSeeking(e.target.value);
		if (e.target.id === 'offering') setOffering(e.target.value);
	};
	if (props.post.user === localStorage.userId && props.postId === props.post._id) {
		return (
			<div className='edit'>
				<h3 className='edit-h3'>Edit your post</h3>
				<Form className='new-post-form' onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group controlId='seeking' onChange={handleChange}>
							<Form.Label>I want to learn</Form.Label>
							<Form.Control type='text' defaultValue={props.post.seeking} required />
							<Form.Control.Feedback type='invalid'>Required field</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId='offering' onChange={handleChange}>
							<Form.Label>I can teach</Form.Label>
							<Form.Control type='text' defaultValue={props.post.offering} required />
							<Form.Control.Feedback type='invalid'>Required field</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					<Button variant='primary' type='submit' className='create-post-btn'>
						Submit
					</Button>
				</Form>
			</div>
		);
	} else {
		return null;
	}
}

export default EditPage;
