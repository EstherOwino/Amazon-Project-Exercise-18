import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts , loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';

async function loadPage(){ //async makes a function return a promise
  try {
    //throw 'error1' //manually creates an error
    //await loadProductsFetch();
    //await loadCartFetch();

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])
  }
  catch(error){
    console.log('Unexpected error. Please try again later.'); 
  }

  renderOrderSummary();
  renderPaymentSummary();
  //await is used in place of then
  //we can only use await when we are inside an async function
  //async await only works with promises
 // return 'value2'; //resolve(value2);
 //await can only be used inside an async function
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),

new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((values)=>{
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
  loadProducts(()=>{
  resolve('value1');
  });

}).then((value)=>{

  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
it's similar to a done function
when a promise is created it runs the inner function immediately
resolve is a function that works like te done function
*/

/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
