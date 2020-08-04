import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import './avatar.css';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../_actions/user_actions';

 function AvatarSelector(props) {
	const state = {
		items: [
			{ id: 1, source: 'https://i.imgur.com/YVHtSQ0.jpg' },
			{ id: 2, source: 'https://i.imgur.com/VDeEChJ.png' },
			{ id: 3, source: 'https://i.imgur.com/lgDPymm.png' },
			{ id: 4, source: 'https://i.imgur.com/OGSU3lG.png' },
            { id: 5, source: 'https://i.imgur.com/o8BIk04.png' },
            { id: 6, source: 'https://i.imgur.com/uQpmlgO.png' },
			{ id: 7, source: 'https://i.imgur.com/Z8fyvpB.png' },
			{ id: 8, source: 'https://i.imgur.com/b1XrOeM.png' },
            { id: 9, source: 'https://i.imgur.com/tmlvI5a.png' },
            { id: 10, source: 'https://i.imgur.com/xOIFDhQ.png' },
			{ id: 11, source: 'https://i.imgur.com/VI2w94M.png' },
			{ id: 12, source: 'https://i.imgur.com/4caQ63W.png' },
            { id: 13, source: 'https://i.imgur.com/fBECS2T.png' },
            { id: 14, source: 'https://i.imgur.com/bN93oBM.png' },
			{ id: 15, source: 'https://i.imgur.com/5lNRc8P.png' },
			{ id: 16, source: 'https://i.imgur.com/8YOby4f.png' },
            { id: 17, source: 'https://i.imgur.com/cW2Z2dU.png' },
            { id: 18, source: 'https://i.imgur.com/1JaBOtz.png' },
			{ id: 19, source: 'https://i.imgur.com/9ZkFUYY.png' },
            { id: 20, source: 'https://i.imgur.com/H6mA7ab.png' },
            { id: 21, source: 'https://i.imgur.com/7Aiix3p.png' },
            { id: 22, source: 'https://i.imgur.com/gRNs2tF.png' },
            { id: 23, source: 'https://i.imgur.com/ZlHa2ow.png' },
            { id: 24, source: ' https://i.imgur.com/Xbl8NJY.png' }
		],
    };
    
    const [selected, setSelected] = useState('')
console.log(props)
	const dispatch = useDispatch();

	const handleChange = e => {
			setSelected(e.item.children.props.src)
	};

	const handleAvatar = e => {
        e.preventDefault();
        let data = {
            avatar: selected,
            id: localStorage.theUserId
        }
		dispatch(updateUser(data)).then(response => {
            console.log(response.payload)
			if (response.payload.success) {
                localStorage.clear()
				props.history.push('/login');
			} else {
				console.log(response.payload);
			}
		});
	};

		console.log(selected);
		const { items } = state;
		return (
			<div className='app'>
				<h2>Select your profile avatar to complete registration</h2>
				<Carousel className='carousel' onChange={handleChange}>
					{items.map(item => (
						<div key={item.id}>
							<img className='avatar-img-select' src={item.source} alt='' />
						</div>
					))}
				</Carousel>
				<button onClick={handleAvatar} className='btn btn-primary avatar-btn'>
					Continue to Login!
				</button>
			</div>
		);
	
}

export default AvatarSelector;