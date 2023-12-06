import React,{useState,useEffect} from 'react';
import "./Login.css";
import {Link, useHistory} from "react-router-dom";
import Amazonlogo from "./Amazon_Logo.png";
import {useSelector,useDispatch} from "react-redux";
import { loginInitiate } from '../../../redux/action';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {user} =useSelector((state)=>state.data);

    let dispatch=useDispatch();
    let history=useHistory();

useEffect(()=>{
if(user){
    history.push("/");
}
},[user, dispatch]);

const singIn = (e) => {
    e.preventDefault();
    dispatch(loginInitiate(email,password));
    setEmail("");
    setPassword("");
};

  return (
    <div className="login" maxWidth="lg md xs">
        <Link to = "/">
            <img src={Amazonlogo} className="login-logo"  alt="logo"/>
        </Link>
       <div className="login-container">
       <h1>Sing In</h1>
       <form>
        <h5>E-Mail</h5>
        <input type="text" value={email} 
        onChange={(e)=> setEmail(e.target.value)}/>
       
   
       <h5>Password</h5>
        <input type="password" value={password} 
        onChange={(e)=> setPassword(e.target.value)}/>
        <button type="sumbit" onClick={singIn} className="login-signIn">
            Sign In
        </button>
            </form>
       <p>
       By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
       </p>
    </div>
    <p>New to Amazon ?</p>
    <Link to="/register">
        <button className="login-register">Create Your Amazon Account</button>
    </Link>
    </div>
  );
};

export default Login;
