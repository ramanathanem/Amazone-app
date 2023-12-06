import React from 'react';
import './CheckoutProduct.css';
import {useDispatch} from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { removeFromBaket } from '../../../redux/action';
const CheckoutProduct = ({id,title,image,rating,price,}) => {
    let dispatch=useDispatch();
    const removeItemFromBasket = ()=> {
        dispatch(removeFromBaket(id));
    };
  return (
    <div className="checkout-product" maxWidth="lg md xs">
        <img src={image} alt="" className="checkout-product-image"/>
        <div className="checkout-product-info">
            <p className="checkout-product-title">{title}</p>
            <p className="checkout-product-price">
                <strong>$</strong>
                <strong>{price}</strong>
            </p>
            <div className="checkout-product-rating">
            {Array(rating)
    .fill()
    .map((_,index) => (
    <p key={index}>⭐</p>
    ))}
    </div>
    <button onClick={removeItemFromBasket}>
        <i>
            <ShoppingCartOutlinedIcon/>
            </i>
        Remove from Basket
    </button>
            
        </div>
    </div>
  )
}

export default CheckoutProduct;