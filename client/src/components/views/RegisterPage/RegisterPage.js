import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import './registerPage.css';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
	
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [github, setGithub] = useState('');
	const [linkedin, setLinkedIn] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const [validated, setValidated] = useState(false);

	const handleSubmit = e => {

		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		setValidated(true);

		let dataToSubmit = {
			name: name,
			email: email,
			linkedin: linkedin,
			github: github,
			password: password,
		};

		dispatch(registerUser(dataToSubmit)).then(response => {
			if (response.payload.success) {
				props.history.push('/login');
			} else {
				console.log(response.payload.err.errmsg);
			}
		});
	};

	const handleChange = e => {
		if (e.target.id === 'name') setName(e.target.value);
		if (e.target.id === 'email') setEmail(e.target.value);
		if (e.target.id === 'linkedin') setLinkedIn(e.target.value);
		if (e.target.id === 'github') setGithub(e.target.value);
		if (e.target.id === 'password') setPassword(e.target.value);
		if (e.target.id === 'password2') setPassword2(e.target.value);
	};

	return (
		<div className='app'>
			<h2>Registration</h2>
			<Form className='register-form' noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Row>
					<Form.Group controlId='name' onChange={handleChange}>
						<Form.Label>Name</Form.Label>
						<Form.Control type='text' placeholder='Enter name' required />
						<Form.Control.Feedback type='invalid'>Name is required.</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='email' onChange={handleChange}>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' placeholder='Enter email' required />
						<Form.Control.Feedback type='invalid'>Email is required</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='github' onChange={handleChange}>
						<Form.Label>Github</Form.Label>
						<Form.Control type='text' placeholder='Enter Github Profile URL' />
					</Form.Group>

					<Form.Group controlId='linkedin' onChange={handleChange}>
						<Form.Label>Linkedin</Form.Label>
						<Form.Control type='text' placeholder='Enter LinkedIn Profile URL' />
					</Form.Group>

					<Form.Group controlId='password' onChange={e => handleChange(e)}>
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' placeholder='Password' required />
						<Form.Control.Feedback type='invalid'>Password is required.</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='password2' onChange={handleChange}>
						<Form.Label>Password confirmation</Form.Label>
						<Form.Control type='password' placeholder='Confirm password' required />
						<Form.Control.Feedback type='invalid'>Please confirm password.</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>

				<Button variant='primary'  className='register-btn' type='submit required'>
					Register
				</Button>
			</Form>
			<Footer />
		</div>
	);
}

export default withRouter(RegisterPage);
