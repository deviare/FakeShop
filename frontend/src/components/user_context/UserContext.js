import React, { useEffect, useState, createContext } from 'react'
import { requestUserDetails } from '../methods/Methods'



export const UserContext = createContext();

export const UserContextProvider = (props)  => {

	const [user, setUser ] = useState({});

	useEffect( () => {
			const key = user['key'];
			const username = user['username']
			if (key != null &&  username == null){
				requestUserDetails( key )
					.then( data => {
						if (data != null){
							setUser(data)
						}
					} )
			}

	},[user])


	return (
		<UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>
	)

}


