import React , { useContext, useState, useEffect }from 'react';
import './Cart.css';
import Button from '../button/Button';
import {Link, Redirect} from 'react-router-dom'
import { CartContext } from '../cart_context/CartContext'
import { UserContext } from '../user_context/UserContext'
import ProductTable from '../product_table/ProductTable'
import { updateCart } from '../methods/Methods'

const Cart = () => {

	const [ cart, setCart ] = useContext(CartContext);
	const [ user, setUser ] = useContext(UserContext);
	const [ mobile, setMobile ] = useState(false)

	useEffect( () =>{
		if (window.innerWidth <= 760){
			setMobile(true)
		}
	} )

	window.addEventListener( 'resize', () =>{
		
		if (window.innerWidth <= 760){
			setMobile(true)	
		}
		else {
			setMobile(false)
		}
	})


	const updateItem  = ( action, id ) =>
		{
			const key = user['key']
			updateCart(key, action, id)
				.then((data) => {
					if (data != null){
						setCart(data)
					}
				})
		}

	const cartTotal  = () => {
		var total = 0
		for (var item of cart){
		console.log(item.relative_total)
			total+= parseFloat(item['relative_total'])
		}
		return `${total.toFixed(2)}€`
	}


	return(
		<div className='page-column'>
		{
			user['key'] == null ?
			<Redirect to='/' /> :
			null
		}
			<ProductTable cart={cart} updateItem={updateItem}  mobile={mobile}/> 
			<div className='btn-wrap'>
				<Link to='/'><Button text='Go back to shop'/> </Link>
				<Link to='/checkout'><Button text='Check-Out'/> </Link>
			</div>
		</div>
	);

}


export default Cart;
