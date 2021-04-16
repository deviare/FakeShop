import React, {useEffect, useContext, useState} from 'react'
import './Checkout.css'
import { Redirect } from 'react-router-dom'
import {CartContext} from '../cart_context/CartContext'
import {UserContext} from '../user_context/UserContext'
import  BaseForm  from '../forms/BaseForm'
import  AddressCard from '../address_card/AddressCard'
import { getShippingAddreses,  sendOrder } from '../methods/Methods'
import Button from '../button/Button'
import ProductTable from '../product_table/ProductTable'

const Checkout = () =>{

	const [ cart, setCart ] = useContext(CartContext)
	const [ user, setUser ] = useContext(UserContext)
	const [ addreses, setAddreses ] = useState([])
	const [ toHome, setToHome ] = useState(false)	
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

	const processOrder = () => {
		const key = user['key']
		const inputs = getInputsValue()
		if (inputs !== false){
			if (cart.length > 0){
				sendOrder(key, inputs)
					.then ( data => {
						if (data != null){
							setCart([])
			 				return true
						}
						else{
							return false
			 			}
					})
					.then( result =>{
			 			if (result === true){
							setToHome(true)	
						}
						else{
							alert('Error processing the order')
						}
			 		})
			} 
		}
	}

	const getInputsValue = () =>{
		var data={}
		const old_spans = document.querySelectorAll('span')
		if (old_spans.length !== 0){
			for(var e=0; e<old_spans.length; e++){
				old_spans[e].parentNode.removeChild(old_spans[e])
			} 
		}
		for( let field of inputFields){
			const input = document.querySelector( 
						field.includes(' ') ? 
						'#'+field.replace(' ', '-')+'-field' :
						'#'+field+'-field'
						)
			const value = input.value
			if (value != ''){
				const name = 	field.includes(' ') ?
						field.replace(' ', '_') :
						field	
				data[name] = value
			}
			else {
				const parent_node = input.parentNode
				const span = document.createElement('span')
				span.style.color = 'red';
				span.style.fontSize = '.8rem'
				span.innerHTML = 'This field is required' 
				parent_node.insertBefore(span, input)
			}
		}

		if (Object.keys(data).length !== 4){
			return false
		}
		return data
	}

	const getAddreses = () => {
		const key = user['key']
		getShippingAddreses(key)
			.then( data => {
				if (data != null){
					setAddreses(data)
				}
			})
	}


	useEffect( () => getAddreses(), [user])

	const inputFields = [
		'phone',
		'city',
		'address',
		'postal code'
	]

	return (
		<div className = 'page-column'>
		{
			user['key'] == null || toHome === true ?
			<Redirect to='/' /> :
			null
		}
		{
			addreses.length > 0 ?
			addreses.map( (ele) => (
				<AddressCard address={ele} rerender={ () => getAddreses() } />
			)) : null
		}
			<div className='checkout-wrap'>
				<div className='checkout-form'>
				<BaseForm  
					fields={ inputFields } 
					btnText='Buy now!' 
					btnOnClick={processOrder}
				/>	
				</div>

			<ProductTable cart={cart} mobile={mobile} />
			</div>
		</div>
	)
}

export default Checkout
