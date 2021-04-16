import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './App.css';
import  Home from './components/pages/Home';
import  Detail from './components/pages/Detail';
import  Cart from './components/pages/Cart';
import Signup  from './components/pages/Signup';
import Login from './components/pages/Login';
import Checkout from './components/pages/Checkout';
import Account from './components/pages/Account';


import { UserContextProvider } from './components/user_context/UserContext'
import { CartContextProvider } from './components/cart_context/CartContext'


class App extends Component {
  render() {



    return (
      <Router >
	    
	    <UserContextProvider>
	    <CartContextProvider>
		    <Navbar/>
		    <div style={{display:'flex', flexDirection:'column'}}>
		    <Switch>
			<Route exact path='/'>
				<Home/>
			</Route>
			<Route exact path='/pr/:id'  >
				<Detail/>
			</Route>
			<Route exact path='/cart'>
				<Cart/>
			</Route>
			<Route exact path='/signin'>
				<Login/>
			</Route>
			<Route exact path='/signup'>
				<Signup/>
			</Route>
			<Route exact path='/checkout'>
				<Checkout />
			</Route>
			<Route exact path='/account'>
				<Account />
			</Route>
		    </Switch>	

		    <Footer/>
		    </div>
	    
	    </CartContextProvider>
	    </UserContextProvider>
      </Router>
    );
  }
}

export default App;
