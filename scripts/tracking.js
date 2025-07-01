import { trackingProducts } from "../data/tracking.js";
import { trackingOrders } from "../data/tracking.js";
import { loadProductsFetch, products } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDeliveryOption } from "../data/deliveryOptions.js";


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

    renderTrackingPage +=`

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;
    document.querySelector('.js-order-tracking').innerHTML = renderTrackingPage;
};

console.log(cart);
