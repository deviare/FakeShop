import React from 'react'
import './Signup.css'
import BaseForm from '../forms/BaseForm'


const Signup = () => {

	const fields = [
		'username',
		'email',
		'password',
		'confirm password'
	]

	return(
		<div className='page-column'>
			< h1 style = {{width:'100vw', margin:'auto'}}>sign up</h1>
			
			<div className='form-wrap'>
				<BaseForm fields={fields} target_url='register'/>
			</div>
		</div>
	);

}


export default Signup;







