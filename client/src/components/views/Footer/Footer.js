import React from 'react';
import { FaGlobeAmericas, FaGithub, FaLinkedin } from 'react-icons/fa';
import './footer.css';

function Footer() {
	return (
		<div className='footer'>
			<div className='footer-icon-area'>
				<a href="https://www.linkedin.com/in/mike-bocon/" target='_blank' rel="noopener noreferrer" className='footer-icon'><FaLinkedin /></a>
				<a href="https://github.com/mbocon" target='_blank' rel="noopener noreferrer" className='footer-icon'><FaGithub /></a>
				<a href="http://www.mikebocon.com" target='_blank' rel="noopener noreferrer" className='footer-icon'><FaGlobeAmericas /></a>
			</div>
		</div>
	);
}

export default Footer;
