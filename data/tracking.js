import { loadProductsFetch, products } from '../data/products.js';
import { cart } from './cart-class.js';


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

