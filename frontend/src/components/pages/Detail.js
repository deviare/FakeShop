import React, { useState, useContext } from 'react';
import './Detail.css';
import {useParams, useLocation} from 'react-router-dom'
import Button from '../button/Button'
import { FaPlus, FaMinus } from 'react-icons/fa' 
import { UserContext } from '../user_context/UserContext'
import { CartContext } from '../cart_context/CartContext'
import { updateCart } from '../methods/Methods'

const Detail = ()=> {
	
	const {id} = useParams();
	const location = useLocation()
	const [ user, setUser ] = useContext(UserContext)
	const [ cart, setCart ] = useContext(CartContext)
	const [ quantity, setQuantity ] = useState(1)
	const { item = 'defaultValue' } = location.state || {}

	const updateQuantity = ( action  ) => {
		if (action == 'add'){
			const update = quantity +1
			setQuantity(update)
		}
		if ( action == 'remove' ){
			if(quantity > 1){
				const update = quantity -1
				setQuantity(update)
			}
		}
	}

	const addToCart = ( id, quantity ) => {
			const key = user['key']
			const action = 'add';
			if (key != null){
				updateCart( key, action, id, quantity )
				.then (( data ) => {
					setCart(data)
				})
				setQuantity(1)
			}
	}

	return(
		<div className='page' >
				<div className='img' style={{backgroundImage:`url(${item['image']})`}}></div>
				<div className='wrapper'>
					<h2 className='product-title'>{item['name']}</h2>
				<p>{item['description']}</p>
					<div className='bottom-wrap'>
						<b className='price'>{`${ (quantity*item['price']).toFixed(2)  }€`}</b>
		 				<FaMinus onClick={ () => updateQuantity('remove') }/>
						<label>{quantity}</label>
						<FaPlus onClick={ () => updateQuantity('add') }/>
						<Button text='Add to cart' onclick={ ()=> addToCart( item['id'], quantity  )  } />
		 			</div>
		 		</div>
		</div>

	)
}

export default Detail;
