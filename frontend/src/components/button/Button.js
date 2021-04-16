import React, {useState, useEffect } from 'react';
import './Button.css'

const Button = ({
	text,
	style,
	color,
	dimension,
	onclick

}) => {


	const [ classes, setClasses ] = useState('btn')

	
	useEffect( () => {

		if (color == 'secondary'){

			setClasses('btn-secondary')
		}

	}
	,[])



	return(

		<button className={ classes } onClick={ () => onclick()   }  >{text}</button>

	)
}


export default Button;
