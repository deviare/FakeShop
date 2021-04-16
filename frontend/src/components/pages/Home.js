import React ,{ useState, useEffect } from 'react';
import './Home.css';
import Card from '../card/Card';
import {getProduct, getCsrfToken} from '../methods/Methods'


const Home = ()=>{

	const [products, setProducts ] = useState([]);

	useEffect( () => {
		getCsrfToken()
			.then( (data) => {
				if (data['message'] != null){
					return true
				}
				return false
			})
			.then ( success => {
				if (success){
					getProduct()
						.then( (items) => {
							if (items != null){
								setProducts(items)
							}
						})
				}
			})
		}
		,[])

	return (
			<div className='page'>
	 		{
				products.map( (ele, index) =>(
	 				<Card 
						id={ele['id']}
						name={ele['name']}
						price={ele['price']}
						img_path={`http://127.0.0.1:8000/${ele['image']}`}
						description={ele['description']}
					/>
				))
			}	
			</div>
	);
}

export default Home;
