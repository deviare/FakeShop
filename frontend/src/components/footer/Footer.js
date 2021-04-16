import React from 'react';
import './Footer.css'
import {ImFacebook} from 'react-icons/im'
import {FaTwitter, FaInstagram} from 'react-icons/fa'


const Footer = () =>{
	return(
		<div className='footer'>
			<div className='icons-wrap'>
				<FaTwitter/>
				<FaInstagram/>
				<ImFacebook/>
			</div>
		</div>
	);
}


export default Footer;



