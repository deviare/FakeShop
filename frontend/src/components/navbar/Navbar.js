import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import NavbarMenu from './NavbarMenu';
import {FaBars, FaTimes} from 'react-icons/fa';
const Navbar = () => {


	const [click, setClick] = useState(false);
	const handleClick = () => { setClick(!click) }
	const [button, setButton] = useState(false);
	const [mobile, setMobile] = useState(false);
	const handleMobile = ()=> {

		if (window.innerWidth > 760){
			setButton(true);
			setMobile(false);
		}
		else{
			setButton(false);
			setMobile(true);
		}
	};

	const closeMenu = ()=> {
		const menu = document.querySelector('.menu');
		menu.classList.remove('navbar-active');
		setClick(false);
	}
	window.addEventListener('resize', handleMobile);

	useEffect( () => handleMobile(), [] )

	return(
		<div className='navbar'>
			<div >
				<Link className='navbar-logo' to='/' onClick={closeMenu}><h1  >LOGO</h1></Link>
			</div>
			{ mobile ? (
				<div className='navbar-icon' onClick={handleClick}>
					{ click ? <FaTimes/> : <FaBars/> }
				</div>
			):null
			}
			<NavbarMenu mobile={mobile} active={click} updateClick={handleClick}/>
		</div>
	);
}

export default Navbar;
