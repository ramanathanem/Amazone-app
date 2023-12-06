import React,{useState,useEffect} from 'react';
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../../components/Product/CheckoutProduct/CheckoutProduct';
import { getBasketTotal } from "../../utils/BasketTotal";
import { useHistory, Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import {CardElement, useStripe,useElements} from "@stripe/react-stripe-js";

import axios from "../../utils/axios";

const Payment = () => {
    const { basket, user } = useSelector(state => state.data);
   
let dispatch = useDispatch();
let history=useHistory();

const [succeeded, setSucceeded]=useState(false);
const [processing,setProcessing]=useState("");
const [error,setError]=useState(null);
const [disabled,setDisabled]=useState(true);
const [clientSecret,setClientSecret]=useState(true);

useEffect(()=>{
    const getClientSecret = async () =>{
     try {
        const response = await axios({
            method:"POST",
            url:`/payments/create?total=${getBasketTotal(basket) *100}`,
        });
        console.log("getClientSecret__succes",response.data);
        setClientSecret(response?.data?.clientSecret);
     } catch (error) {
        console.log("getClientSecret__error",clientSecret);
        
     }
      
    };
    getClientSecret();
},[basket]);

const stripe=useStripe();
const elements=useElements();


const handleSubmit =async (e) =>{
    e.preventDefault();
    setProcessing(true);
    const payload= await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:elements.getElement(CardElement),
        },
    }).then(({paymentIntent})=>{
        console.log(clientSecret);
        db.collection("users").doc(user && user?.uid).collection("orders").doc(paymentIntent?.id)
        .set({
            basket:basket,
            amount:paymentIntent?.amount,
            created:paymentIntent?.created,
            
        });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.push("/orders");
     
    });
};


const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message:"");
};

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>Checkout{<Link to="/checkout">{basket?.length} items</Link>}</h1>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment-address">
                        <p>{user && user?.email}</p>
                        <p>1/73-5,jeevanagar,emaneswaram,paramakudi</p>
                        <p>Tamilnadu,India</p>
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket && basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment-priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                        <h3>Order Total:{value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing  || disabled  || succeeded}>
                                    <span>{processing? <p> Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Payment;