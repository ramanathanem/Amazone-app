import React,{useEffect} from 'react';
import './App.css';
import {Switch,BrowserRouter,Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Header from './components/Header';
import Login from './pages/Home/Login/Login';
import Register from './pages/Home/Register/Register';
import {useDispatch} from "react-redux";
import {auth} from "./utils/firebase";
import { setuser } from './redux/action';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import 'bootstrap/dist/css/bootstrap.css';


const promise=loadStripe("pk_test_51NLRNISJ85bFOLx8SlqCWirUTtzeLbGwErLu0CttrnD1YhMVgRgt1h6Xv1KFFLjCMWU6AH1Owj7kSGtGgXl6Y3Az00tXhn06Zx");
function App() {

  let dispatch=useDispatch();
  useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    dispatch(setuser(authUser))
  } else{
    dispatch(setuser(null));
  }
});
  },[dispatch])
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route path="/payment">
        <Header/>
       <Elements stripe={promise}>
       <Payment/>
       </Elements>
        </Route>
    <Route path="/checkout">
        <Header/>
        <Checkout/>
      </Route>
    <Route path="/product/:id">
        <Header/>
        <SingleProduct/>
      </Route>
    <Route path="/register">
      <Register/>
      </Route>
    <Route path="/login">
      <Login/>
      </Route>
      <Route path="/">
        <Header/>
        <Home/>
      </Route>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
