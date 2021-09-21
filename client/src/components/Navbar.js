import React from 'react';

import './Navbar.css';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='navbar_logo'>
				<h2>Truck App</h2>
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
