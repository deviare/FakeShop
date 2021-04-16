
import React from 'react'
import './Login.css'
import BaseForm from '../forms/BaseForm'


const Signup = () => {

	const fields = [
		'email',
		'password',
	]

	return(
		<div className='page-column'>
			<h1 style = {{width:'100vw', margin:'auto'}}>Login</h1>
			<div className='form-wrap'>
				<BaseForm fields={fields} target_url='login'/>
			</div>
		</div>
	);

}


export default Signup;
