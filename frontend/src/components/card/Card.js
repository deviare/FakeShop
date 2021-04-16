

import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from '../button/Button';
import './Card.css'
import { updateCart } from '../methods/Methods'
import {UserContext} from '../user_context/UserContext'
import {CartContext} from '../cart_context/CartContext'


const Card = ({
	id,
	name,
	price,
	img_path,
	description
}) => {

	
	const [ user, setUser ] = useContext(UserContext);
	const [ cart, setCart ] = useContext(CartContext);
	
	const [ item, setItem ] = useState({});

	useEffect( () => {

		setItem(
			{
				'id':id,
				'name':name,
				'price':price,
				'image':img_path,
				'description':description
			}
		)

	}
	,[])


	const addItem  = () =>
		{
			const key = user['key']
			const action = 'add'
			const id_item = id
			updateCart(key, action, id_item)
				.then((data) => {
					if (data != null){
						setCart(data)
					}
				})
		}


	return(
		<div className='card'>
			<div className='img-product' style={{backgroundImage:`url(${img_path})`}}/>
			<Link  to={{ pathname:`/pr/${id}`, state:{item} }} className='name-product'>{name}</Link>
			<p className='price-product'>{price}</p>
			<Button onclick= { () => addItem() } text='Add to cart'/>

		</div>
	)
}


export default Card;


