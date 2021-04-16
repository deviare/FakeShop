import React, { useContext, useEffect, useState }from 'react'
import { Redirect } from 'react-router-dom'
import './Account.css'
import {UserContext} from '../user_context/UserContext'
import Button from '../button/Button'
import {sendUserInfo} from '../methods/Methods'


const Account = () => {

	const [ user, setUser ] = useContext(UserContext);
	const [ edit, setEdit ] = useState(false);

	const saveInfo = () => {
		const key = user['key']
		let info = {}
		const inputs = document.querySelectorAll('input')
		const ls = document.querySelector('label')
		for (let input of inputs){
			const name = input.previousElementSibling.innerText.replace(':','')
			const value = input.value
			info[name] = value
		}
		sendUserInfo( key, info )
			.then( data => {
				if (data != null){
					var newUser = {}
					for( let key in user ){
						newUser[key]=user[key]
					}
					for( let key in data ) {
						newUser[key] = data[key]
					}
					setUser(newUser)
					toggleEdit()
				}
				else{
					alert('Error updating user')
				}
			})
	}

	const toggleEdit = () => {
		setEdit(!edit)
	}

	const fields = [
		'username',
		'email'
	]


	return (

		<div className='page-column'>
		{
			user['key'] == null ?
			<Redirect to='/' /> :
			null
		}

		<div className='account-wrap'>
		{
			Object.keys(user).map( (key) => {
				if (fields.includes(key)){
					return (
						<div className='input-wrap'>
							<p>{key}:</p>
							{
								edit == true ?
								<input type='text' defaultValue={user[key]}></input> :
								<span>{user[key]} </span>

							}		
						
						</div>
						)
					}
				}
			)
		}
		<label onClick={ () => toggleEdit() }>Edit</label>
		<Button text='save'  onclick= {
			edit == true ?
			() => saveInfo() :
			null}
		/>
		</div>
		</div>
	)
}

export default Account
