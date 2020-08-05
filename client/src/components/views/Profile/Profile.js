import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { updateProfile, getUser } from '../../../_actions/user_actions';
import './profile.css';
import { useEffect } from 'react';
import AvatarUpdater from '../Avatar/AvatarUpdater';
import { useSelector } from 'react-redux';

function Profile(props) {
	const dispatch = useDispatch();

	let id = localStorage.userId;

	// const [user, setUser] = useState({});

	const user = useSelector(state => state.user);
	console.log(user, 'is user on EDIT PROFILEt');

	const [name, setName] = useState(localStorage.user);
	const [email, setEmail] = useState(localStorage.email);
	const [github, setGithub] = useState(localStorage.github);
	const [linkedin, setLinkedin] = useState(localStorage.linkedin);
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);
	const [view, setView] = useState('');

	console.log(name, email, github, linkedin);

	const handleSubmit = e => {
		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		let dataToSubmit = {
			name: name,
			email: email,
			github: github,
			linkedin: linkedin,
			id: user.userData._id,
		};

		dispatch(updateProfile(dataToSubmit)).then(response => {
			if (response.payload) {
				form.reset();
				localStorage.setItem('newPost', true);
				props.history.push('/home');
			} else {
				console.log(response.payload);
			}
		});
	};

	const handleChange = e => {
		if (e.target.id === 'email') setEmail(e.target.value);
		if (e.target.id === 'name') setName(e.target.value);
		if (e.target.id === 'github') setGithub(e.target.value);
		if (e.target.id === 'linkedin') setLinkedin(e.target.value);
		console.log(name, email, github, linkedin);
	};

	const toggleShow = e => {
		if (e.target.id === 'edit-profile') {
			setView(e.target.id);
		}
		if (e.target.id === 'edit-avatar') {
			setView(e.target.id);
		}
		if (show === false) {
			setShow(true);
		} else {
			setShow(false);
		}
	};

	return (
		<div className='app'>
			<h4 className='welcome-h4'>Welcome {localStorage.user}</h4>
			{show === false ? <h5 className='profile-h3'>Profile Options</h5> : null}
			{show === false ? (
				<div className='profile-btns'>
					<button id='edit-profile' className='btn btn-primary' onClick={toggleShow}>
						Edit Contact Info
					</button>
					<button id='edit-avatar' className='btn btn-primary' onClick={toggleShow}>
						Change Profile Avatar
					</button>
				</div>
			) : (
				<div className='profile-area'>
					{view === 'edit-profile' ? (
						<div className='profile-form'>
							<Form className='profile-form' noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Row className='profile-form'>
									<Form.Group controlId='name' onChange={handleChange}>
										<Form.Label>Name</Form.Label>
										<Form.Control type='text' placeholder={user.userData.name} />
										<Form.Control.Feedback type='invalid'>Name is required.</Form.Control.Feedback>
									</Form.Group>

									<Form.Group controlId='email' onChange={handleChange}>
										<Form.Label>Email</Form.Label>
										<Form.Control type='email' placeholder={user.userData.email} />
										<Form.Control.Feedback type='invalid'>Email is required</Form.Control.Feedback>
									</Form.Group>

									<Form.Group controlId='github' onChange={handleChange}>
										<Form.Label>Github</Form.Label>
										<Form.Control type='text' placeholder={user.userData.github} />
									</Form.Group>

									<Form.Group controlId='linkedin' onChange={handleChange}>
										<Form.Label>Linkedin</Form.Label>
										<Form.Control type='text' placeholder={user.userData.linkedin} />
									</Form.Group>
								</Form.Row>

								<Button variant='primary' className='register-btn' type='submit required'>
									Edit Profile
								</Button>
							</Form>
							<Button variant='primary' onClick={toggleShow} className='register-btn cancel-btn' type='submit required'>
								Cancel
							</Button>
						</div>
					) : (
						<div>
							<AvatarUpdater id={id} toggleShow={toggleShow} />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Profile;
