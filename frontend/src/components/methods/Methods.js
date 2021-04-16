import {useContext} from 'react'

const BASE_URL = 'http://127.0.0.1:8000/'

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export async function sendOrder (key, cart) {
	const token = getCookie('csrftoken')
	const url = BASE_URL+'process_order'
	return await fetch ( url, {
		method:'POST',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':`Token ${key}`,
			'X-CSRFToken':token
		},
		body:JSON.stringify(cart)
	})
	.then ( response => {
		if (response.ok){
			return response.json()
		}
		else{
			return null
		}
	})
}

export async function sendUserInfo( key, info ) {
	const token=getCookie('csrftoken')
	const url = BASE_URL+'update_account'
	return await fetch( url, {
		method:'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
			'Authorization': `Token ${key}`,
			'X-CSRFToken': token
		},
		body: JSON.stringify(info)
	})
	.then( response => {
		if(response.ok){
			return response.json()
		}
		return null
	})
}

export async function deleteAddress (key, data) {
	const token = getCookie('csrftoken');
	const url = BASE_URL+'delete_shipping_address';
	return await fetch ( url, {
		method:'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
			'X-CSRFToken':token,
			'Authorization': `Token ${key}`
		},
		body:JSON.stringify(data)
	})
	.then( (response) => {
		if (response.ok){
			return response.json()
		}
		return null
	})
}

export async function getCsrfToken() {
	const url = BASE_URL+'get_token'
	return await fetch( url, {
		method:'GET',
		headers:{
			'Accept':'application/json'
		}
	})
	.then ( response  =>{
		if (response.ok){
			const cookie = response.headers.get('set-cookie')
		}
		return response.json()
	})
}

export async function getCartItems (key){
	const url = BASE_URL+'get_cart_items'
	const token = getCookie('csrftoken')
	return await fetch( url, {
		method:'POST',
		headers:{
			'Accept':'application/json',
			'Authorization':`Token ${key}`,
			'X-CSRFToken':token
		}
	})
	.then( response => {
		if (response.ok){

			return response.json()
		}
		return false
	})
}


export async function getProduct(){
	const token = getCookie('csrftoken')
	const url = BASE_URL+'all_products'
	return await fetch( url, {
		method:'POST',
		headers: {
			'Accept':'application/json',
			'X-CSRFToken':`${token}`,
		},
	})
	.then(  (response) => {
		return response.json();
	})
}

export async function getShippingAddreses( key ){
	const url = BASE_URL+'get_shipping_address';
	const token = getCookie('csrftoken')
	return await fetch ( url, {
		method:'POST',
		headers:{
			'Accept':'application/json',
			'X-CSRFToken':token,
			'Authorization': `Token ${key}`
		}
	})
	.then ( response => {
		return response.json()
	})
	.then ( data => {
		if (data['message'] != null){
			return null
		}
		return data
	})
}

export async function updateCart(key, action, id, quantity=1 ){
	const url = BASE_URL+'update_item'
	const json = {
		'id':id,
		'action':action,	
		'quantity':quantity	
	}
	return await fetch(url, {
		method:'POST',
		headers:{
			'Authorization':`Token ${key}`,
		},
		body:JSON.stringify(json)
	})
	.then((resp) =>{
		if (resp.ok){
			return resp.json()
		}
		return null
	})
}

export async function logOut( key ){	
	return  await requestLogout( key )
		.then( (data) => {
			if (data != null){
				const loginCookie = getCookie('login')
				if (loginCookie != null){
					var now = new Date();
					now.setMonth(0);
					now.setFullYear(1970)	
					document.cookie = `login=;domain=;path=/;expires=${now.toUTCString()};samesite=lax`
					return true
				}
				return false	
			}
			return false	
		})
	}

export async function requestLogout( key  ) {
	const url = BASE_URL+'logout'
	const token = getCookie('csrftoken');
	return await fetch( url, {
		method:'POST',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'X-CSRFToken':token,
			'Authorization':`Token ${key}`,
		}
	} )
	.then((resp) =>{
		if (resp.ok){
			return resp.json()
		}
		return null
	})
}

export async function  checkCookieLogin() {
	const cookie_body = getCookie('login')
	const key = JSON.parse(cookie_body)['key']
	if (key != null){
		return await requestUserDetails( key )
			.then( (data) => {
				return data
			} )
	}
	return null
}

export  async function  requestUserDetails( key )  {
	const token = getCookie('csrftoken')
	const url = BASE_URL+'user_details';
	return await fetch(url, {
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'X-CSRFToken':token,
			'Authorization':`Token ${key}`,
		}
	})
	.then( response => {
		return response.json()
	})
	.then ( data => {
		if ( data['detail'] == null )
		{
			var user = data
			user['key'] = key
			return user	
		}
		return null
	})
}	







export async function sendPostForm (fields, target_url) {
	var request = {}
	for ( var i=0; i<fields.length; i++ ){
		var name =  fields[i].includes(' ') ? fields[i].replace(' ', '-') : fields[i]
		const field = document.querySelector(`#${name}-field`);
		const value = field.value
		name = fields[i].includes('-') ? fields[i].replace('-', '_') : fields[i]
		name = fields[i].includes(' ') ? fields[i].replace(' ', '_') : fields[i]
		request[name]=value
	}
	const url = `http://127.0.0.1:8000/${target_url}`
	const token = getCookie('csrftoken');
	const handleResponse = (request, data, target_url) => {
	 		const key = data['key']
			if (target_url === 'login'){
				const now = new Date();
				const thisMonth = now.getMonth()
				if (thisMonth < 11 ){
					const nextMonth = thisMonth +1;
	 				now.setMonth(nextMonth)
				} else {
	 				const nextMonth = 0;
					const thisYear = now.getFullYear()
					const nextYear = thisYear + 1
					now.setFullYear(nextYear)
					now.setMonth(nextYear)
				}
				const expire = now
				const cookieBody = { 'key': key }
				document.cookie = `login=${JSON.stringify(cookieBody)};domain=;path=/;expires=${expire.toUTCString()};samesite=lax`
				const userData = requestUserDetails( key ) 
				return userData 
			}
			if (target_url === 'logout'){
				return false
			}
			if (target_url === 'register'){
				return true
			}	
		return false
	}

	const updateView = (data, fields) => {
		const keys = Object.keys(data)
		for (var i=0; i<fields.length; i++){
			const target = document.querySelector('#'+fields[i]+'-field')
			const parent_node = target.parentElement
			const old_spans = parent_node.querySelectorAll('span')
			target.value = ''
			if (old_spans.length !== 0){
				for(var e=0; e<old_spans.length; e++){
					parent_node.removeChild(old_spans[e])
				}
			}
			const error =data[fields[i]] 
			if (error!= null){
				for (var x=0; x<error.length; x++){
					const span = document.createElement('span')
					span.style.color = 'red';
					span.style.fontSize = '.8rem'
					span.innerHTML = error
					parent_node.insertBefore(span, target)
				}
			}
			if (data['non_field_errors'] != null){
				target.value = '';
			}
		}
		if (data['non_field_errors'] != null){
			alert('Wrong credential provided')
		}
	}
	return await fetch(url, {
		method:'POST',
		headers:{
	 		'Content-Type':'application/json',
			'Accept':'application/json',
			'X-CSRFToken':token
		},
		body:JSON.stringify(request)
	})
	.then ( response => {
		return response.json()
	})
	.then ( data => {
		if (data['key'] == null ){
			updateView(data, fields)
			return null
		}else{
			return handleResponse(request, data, target_url)
		}
	})
}
