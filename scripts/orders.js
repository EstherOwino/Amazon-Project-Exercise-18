import { orders} from "../data/orders.js";
import { getProduct, loadProductsFetch, products  } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import { cart } from "../data/cart-class.js";

loadProductsFetch().then(() => {
  renderOrdersPage();
});

function renderOrdersPage(){
let renderOrdersPage;

orders.forEach((order)=>{

  renderOrdersPage = 
  `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          `;

          order.products.forEach((orderProduct)=>{

            const productId = orderProduct.productId;
            console.log(productId);
            const matchingProduct = getProduct(productId);

            if(!matchingProduct){
              console.warn(`The product with id ${orderProduct.productId} is not here.`);
              return;
            }

            renderOrdersPage += 
            `
            <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}" alt="">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${orderProduct.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again-message"
                data-product-id = "${orderProduct.productId}">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productId}">
                <button class="track-package-button button-secondary js-track-package-button">
                  Track package
                </button>
              </a>
            </div>
          </div>
        `
      })
  })
   renderOrdersPage += `
      </div> <!-- close order-container -->
  `;
document.querySelector('.js-orders-grid').innerHTML = renderOrdersPage;
console.log(orders);

function updateCartQuantity(){
        let cartQuantity = 0;
        cart.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

document.querySelectorAll('.js-buy-again-message').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    cart.addToCart(productId);
    //console.log(productId);
    updateCartQuantity();
  })
})
}

console.log(orders);

