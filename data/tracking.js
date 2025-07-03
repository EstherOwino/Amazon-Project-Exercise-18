import { loadProductsFetch, products } from '../data/products.js';
import { cart } from './cart-class.js';
import { getOrders, orders } from './orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function trackingOrders(productId){
    let trackedOrders;
    cart.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            trackedOrders = cartItem;
        }
    });
    return trackedOrders;
}

export function trackingProducts(productId){
    let trackedProducts;
    products.forEach((product)=>{
        if(productId === product.id){
            trackedProducts = product;
        }
    });
    return trackedProducts;
}



