import React, { useState, useEffect, useContext } from 'react';
import './NavbarMenu.css';
import {Link} from 'react-router-dom';
import {BiCart}  from 'react-icons/bi';
import Navbar from './Navbar';
import { UserContext } from '../user_context/UserContext';
import { CartContext } from '../cart_context/CartContext';


import { checkCookieLogin, logOut } from '../methods/Methods';

const NavbarMenu = ({mobile, active, updateClick}) => {
	
	const [user, setUser] = useContext(UserContext);
	const [cart, setCart] = useContext(CartContext);
	const [numberOfProducts, SetNumberOfProducts ]  = useState(0)
	const [name, setName] = useState('')

	useEffect( () => {

		if( user.username != null ){
			setName(user.username.toString())	
			console.log('name -> ',name)
			console.log('user.username -> ',user.username)
		}
	}
	,[user])

	useEffect( () => {
		var total = 0
		for (var i=0; i<cart.length; i++){
			total += parseInt(cart[i]['quantity'])
			const number = '0'
		}
		SetNumberOfProducts(total)
	}
	,[cart])

	useEffect( () => {
		checkCookieLogin()
			.then((data) => {
				if (data != null){
					setUser(data)
					setName(user.username)
				}
	 		})
	}, [])
	
	const doLogout = () =>{
		const key = user['key']
		logOut(key)
			.then( (success) => {
				if (success){
					setUser({});
				}
			})
		}

	const setClassesMenu = ()=> {
		var classes = ""
		mobile ? classes="navbar-mobile menu": classes="navbar-menu menu"; 
		active ? classes+=' navbar-active' : null;
		return classes;
	}

	
	const closeMenu = ()=> {
		if (mobile && active){
			const menu = document.querySelector('.menu');
			menu.classList.remove('navbar-active');
			updateClick();	
		}
	}

	const setClassesDropdown = () => {
		if (mobile){
			return ' drop-container dropdown-mobile dropdown-deactive'
		} else {
			return 'drop-container dropdown dropdown-deactive'
		}
	}

	const toggleDropdown = () =>{
		const dropdown = document.querySelector('.drop-container')
		if (dropdown.classList.contains('dropdown-active')){
			dropdown.classList.remove('dropdown-active')
			dropdown.classList.add('dropdown-deactive')
		} else {
			dropdown.classList.remove('dropdown-deactive')
			dropdown.classList.add('dropdown-active')
		}
	}

	if (user['key'] != null ){
		return(
		<ul className={ setClassesMenu() } >
			<li className ="account-item">
				<label className='menu-item' onClick= { ()=> toggleDropdown() } > Account </label>
				<div className={setClassesDropdown()}>
					<ul className='dropdown-menu '>
						<li>
							<Link to='/account'
			className='menu-item' 
			onClick={ () => { 
				closeMenu() 
				toggleDropdown() 
			}}> {user.username}</Link> 
						</li>
						<li>
							<Link to='/'
			className='menu-item'
			onClick={ () =>{
				closeMenu()
				toggleDropdown()
				doLogout()
			}}> logOut < /Link> 
						</li>
					</ul>
				</div>

			</li>
			
			<li className='cart-icon'>
				<Link to='/cart'className='menu-item cart' onClick={ () => closeMenu()}>
					<BiCart/>
					<div className='products-number'>
					<svg viewBox="0 0 24 24">
						<ellipse cx="14" cy="-1" rx="10" ry="8" fill='white'>
						</ellipse>
					</svg>
					<p >{numberOfProducts} </p>	
					</div>
				</Link>
			</li>
		</ul>
		)

		} else {

		return (
		<ul className={ setClassesMenu() } >
			<li>
				<Link to='/signup'className='menu-item' onClick={ () => closeMenu()}>SignUp</Link>
			</li>
			<li>
				<Link to='/signin'className='menu-item' onClick={ () => closeMenu()}>LogIn</Link>
			</li>
		</ul>
		)
	}

	
	
}

export default NavbarMenu;

		
