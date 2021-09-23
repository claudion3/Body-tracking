import React from 'react';

import './Navbar.css';

const Navbar = ({ title }) => {
	return (
		<nav className='navbar' data-testid='navbar'>
			<div className='navbar_logo'>
				<h2>{title}</h2>
			</div>
			<div className='hamburger_menu'>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</nav>
	);
};

export default Navbar;
