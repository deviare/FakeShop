import  React, { useEffect, useContext, createContext, useState } from 'react'
import {UserContext} from '../user_context/UserContext'
import { getCartItems } from '../methods/Methods'



export const CartContext = createContext();



export const CartContextProvider = (props) => {


	const [ user, setUser ] = useContext(UserContext)
	const [ cart, setCart ] = useState([]);
	

	useEffect( () => {
		const key = user['key']
		console.log('user key in CartContext -> ', key)
		if (key != null){
			getCartItems(key)
				.then( data => {
					if (data != false){
						setCart(data)
					}
				})
		}
	}
	,[user])



	return(

		<CartContext.Provider value={[cart, setCart]}>{props.children}</CartContext.Provider>
	)



}



