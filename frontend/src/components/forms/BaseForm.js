import React, {useEffect, useContext, useState} from 'react'
import './BaseForm.css'
import { Redirect } from 'react-router-dom'
import  { sendPostForm, getCookie}  from '../methods/Methods'
import Button from '../button/Button'
import {UserContext} from '../user_context/UserContext'



const BaseForm = ( { fields, target_url, costumClass, btnText, btnOnClick } ) => {

	const [user, setUser] = useContext(UserContext)
	const [ toLogin, setToLogin ] = useState(false)
	const [ toHome, setToHome ] = useState(false)


	const handleRedirect = () => {
		if ( toLogin === true ){
			return <Redirect to='signin'/>
		}
		if ( toHome === true ){
			return <Redirect to='/' />
		}
		return null
	}

	return(
		<div>
		{
			handleRedirect()
		}
		<form className='form'>
		{
			fields.map( (ele, index) => (

				<div style={{display:'flex', flexDirection:'column'}}>
				<label htmlFor={`${ele}-field`} >{ele}</label>
				<input required className='text-input' type={
					ele.includes('password')
					? 'password'
					: 'text'
				} id={

					ele.includes(' ') ?
					`${ele.replace(' ','-')}-field` :
					`${ele}-field`

				} ></input>
				</div>
			))

		}
		</form>	
		<Button text= { btnText == null ? 'Done' : btnText } 
			onclick={ () =>
					{
						btnOnClick == undefined ?
							sendPostForm( fields, target_url )
							.then( result =>{
								if ( result != null && result != false){
									setUser(result)
									return true
								}
								if (result){
									return true
								}
								return null
							
							})
							.then ( result =>{
								if (result != null){
									if(target_url == 'login'){
										setToHome(true)	
									}
									if ( target_url === 'register' ){
										setToLogin(true)	
									}
								}
							}) :
						
							btnOnClick()
					}
				}/>
		</div>
	);
}



export default BaseForm;
