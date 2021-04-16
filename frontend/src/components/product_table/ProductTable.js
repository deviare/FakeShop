import React from 'react'
import './ProductTable.css'
import { FaPlus, FaMinus  } from 'react-icons/fa'


const ProductTable = ( { cart, updateItem, mobile} ) => {


	console.log(updateItem)

	const cartTotal  = () => {
		var total = 0
		for (var item of cart){
		console.log(item.relative_total)
			total+= parseFloat(item['relative_total'])
		}
		return `${total.toFixed(2)}€`
	}




	if (mobile != true){
	return(
		<table  className='product-table'>
			<thead >
				<tr className='header'>
					<td/>
					<td>Product</td>
					<td>Price</td>
					<td>Quantity</td>
					<td>Total</td>
				</tr>
			</thead>
			<tbody>
			{	
				cart.map( ( ele, index ) => (
				<tr className='cart-item'>
					<td className='table-img' 
						style={{backgroundImage:`url(http://127.0.0.1:8000/${ele['image']})`}}/>
					<td>
						<b className='cart-item-name'>
						{ele['name']}
						</b>
					</td>
					<td>
						<p>{`${ele['price']}€`}</p>
					</td>
					<td>
						<div className='cart-quantity'>
							{
								updateItem != null ?
								<FaPlus onClick ={ () => updateItem('add',  ele['item']) } /> :
								null
							}
							<p>{ele['quantity']}</p>
							{
								updateItem != null ?
								<FaMinus onClick ={ () => updateItem('remove',  ele['item']) } /> :
								null
							}
						</div>
					</td>
					<td>
						<p>{`${ele['relative_total']}€`}</p>
					</td>
				</tr>
				))
			}
			</tbody>
			<tfoot>
				<tr>
					<th/>
					<th/>
					<th/>
					<th/>
					<th >
					{
						cartTotal()
					}
					</th>
				</tr>
			</tfoot>
		</table>

	)
	}

	if (mobile === true){

		return(
			
			<div className='table-mobile-wrap'>
			{			
		cart.map(  ele  => ( 
			<table className='table-mobile'>
				<tr>
					<td/>
					<td className='table-img' 
						style={{backgroundImage:`url(http://127.0.0.1:8000/${ele['image']})`}}/>
				</tr>

				<tr>
					<th>Product:</th>
					<td>
						<b className='cart-item-name'>
						{ele['name']}
						</b>
					</td>
				</tr>

				<tr>
					<th>Price:</th>
					<td>
						<p>{`${ele['price']}€`}</p>
					</td>
				</tr>

				<tr>
					<th>Quantity:</th>
					<td>
						<div className='cart-quantity'>
							{
								updateItem != null ?
								<FaPlus onClick ={ () => updateItem('add',  ele['item']) } /> :
								null
							}
							<p>{ele['quantity']}</p>
							{
								updateItem != null ?
								<FaMinus onClick ={ () => updateItem('remove',  ele['item']) } /> :
								null
							}
						</div>
					</td>
				</tr>
				<tr>
					<th>Sub total:</th>
					<td>
						<p>{`${ele['relative_total']}€`}</p>
					</td>
				</tr>
			</table>
			))
			}
			
			<div className='mobile-total-wrap'>

			<label>
			Total:
			</label>
			<div>
			{
				cartTotal()
			}
			</div>
			</div>
		</div>
		)


	}

}



export default ProductTable


