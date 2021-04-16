import React , {useState, useEffect, useContext} from 'react'
import './AddressCard.css'
import Button from '../button/Button'
import {UserContext} from '../user_context/UserContext'
import {deleteAddress} from '../methods/Methods'

const AddressCard = ( {address, rerender} ) => {

	const [user, setUser] = useContext(UserContext)

	const fillForm = () => {
		const inputs = document.querySelectorAll('input')
		inputs.forEach( (input) => {
			input.value = input.id.includes('postal') ?
					address[input.id.replace('-field','').replace('-', '_')] :
					address[input.id.replace('-field','')]
		})
	}

	const deleteShippingAddress = () =>{
		const key = user['key']
		deleteAddress( key, address )
			.then( result => {
				if (result !== null){
					rerender()
				}
			})
	}

	return (
		<div className='address-card'>
			<div>
				<label>Phone</label>
				<p>{ address['phone'] }</p>
			</div>
			<div>
				<label>City</label>
				<p>{ address['city'] }</p>
			</div>
			<div>	
				<label>Address</label>
				<p>{ address['address'] }</p>
			</div>

			<div>
				<label>Postal Code</label>
				<p>{ address['postal_code'] }</p>
			</div>
			<div className='address-btn-wrap'>
				<Button text='Use this address'  onclick={ () => fillForm() } />
				<Button text='Delete this address'  onclick={ () => deleteShippingAddress() } />
			</div>
		</div>
	)
}

export default AddressCard
