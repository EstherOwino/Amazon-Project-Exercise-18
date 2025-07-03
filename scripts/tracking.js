import { trackingProducts } from "../data/tracking.js";
import { trackingOrders } from "../data/tracking.js";
import { loadProductsFetch, products } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { getOrders } from "../data/orders.js";


loadProductsFetch().then(()=>{
    renderTrackingPage();
});


function renderTrackingPage(){
    let renderTrackingPage;

    const url = new URL(window.location.href);
    const productId = url.searchParams.get("productId");
    const matchingProduct = trackingProducts(productId); //for products

    let matchingOrder = trackingOrders(productId); //for cartItems

    cart.cartItems.forEach((cartItem)=>{
      const deliveryOptionId = cartItem.deliveryOptionId;
      const matchingOption = getDeliveryOption(deliveryOptionId);
      const today = dayjs();
      const deliveryDate = today.add(matchingOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

    renderTrackingPage=
    `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${dateString}
      </div>
    `;
    });

    renderTrackingPage += 
    `
    <div class="product-info">
      ${matchingProduct.name}
    </div>
    `

    renderTrackingPage +=
    `
    <div class="product-info">
      Quantity: ${matchingOrder.quantity}
    </div>
    `; 

    //I am making the tracking page interactive over here
    //const url = new URL(window.location.href);
        const orderId = url.searchParams.get("orderId");
        console.log(orderId);
        const matchingOrders = getOrders(orderId);
        console.log(matchingOrders);
    
        const fullOrderDate = matchingOrders.orderTime;
        const orderTime = fullOrderDate.split("T")[0];
    
        console.log(orderTime);
    
    
        const today = dayjs();
        const currentTime = today.format('YYYY-MM-DD');
        console.log(currentTime);
    
        //const productId = url.searchParams.get("productId");
    
        const orderProducts = matchingOrders.products;
        function getOrderProducts(productId){
            let matchingOrderProducts;
            orderProducts.forEach((orderProduct)=>{
                if(productId === orderProduct.productId){
                    matchingOrderProducts = orderProduct;
                }
            });
            return matchingOrderProducts;
        }
        const matchingOrderProducts = getOrderProducts(productId);
        console.log(matchingOrderProducts);
    
        const fullDeliveryDate = matchingOrderProducts.estimatedDeliveryTime;
        const deliveryTime = fullDeliveryDate.split("T")[0];
    
        console.log(deliveryTime);
    
    
        const date1 = new Date(orderTime);
        const date2 =new Date(currentTime);
        const date3 = new Date(deliveryTime);
    
        const diffInCurrentOrderMs = date2 - date1;
        const diffInCurrentOrderDays = diffInCurrentOrderMs / (1000 * 60 * 60 * 24);
        console.log(diffInCurrentOrderDays);
    
        const diffInDeliveryOrderMs = date3 - date1; // Difference in milliseconds
        const diffInDeliveryOrderDays = diffInDeliveryOrderMs / (1000 * 60 * 60 * 24); // Convert ms to days
        console.log(diffInDeliveryOrderDays);
    
        const percentProgress = (diffInCurrentOrderDays / diffInDeliveryOrderDays)*100;
        console.log((percentProgress));


    renderTrackingPage +=`

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label progress-label1">
            Preparing
          </div>
          <div class="progress-label progress-label2">
            Shipped
          </div>
          <div class="progress-label progress-label3">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${percentProgress}%"></div>
        </div>
    `;
    document.querySelector('.js-order-tracking').innerHTML = renderTrackingPage;

    if(percentProgress >= 0 && percentProgress <= 49){
      document.querySelector('.progress-label1').classList.add('current-status');
    }
    else if(percentProgress >= 50 && percentProgress <= 99){
      document.querySelector('.progress-label2').classList.add('current-status');
    }
    else if(percentProgress >= 100){
      document.querySelector('.progress-label3').classList.add('current-status');
    }
};