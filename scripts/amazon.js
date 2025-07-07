//..means we are getting out of the current folder
//modules only works with a live server
/*import {cart as myCart} from '../data/cart.js'; cart as my myCart means that the variable
name cart has been changed to myCart*/
//import {cart, addToCart} from '../data/cart.js';
import {cart} from '../../data/cart-class.js'
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid); 
/*renderProductsGrid is known as a callback as it is given to this function to run in the future*/ 

function renderProductsGrid(){
    let productsHTML = '';

    //products.forEach((product) => {
        const url = new URL(window.location.href);
        const search = url.searchParams.get('search');

        let filteredProducts = products;
        if(search){
            filteredProducts = products.filter((product)=>{
                return product.name.includes(search);
            })
        }
        filteredProducts.forEach((product)=>{
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>
                
                <!--This method is called polymorphism which is the use of a method without knowing the class-->
                ${product.extraInfoHTML()}
                

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" 
                data-product-id = "${product.id}">
                    Add to Cart
                </button>
                </div>
        `;
    })

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    function updateCartQuantity(){
        let cartQuantity = 0;
        cart.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;  
            cart.addToCart(productId);
            updateCartQuantity();
        });
    });

    document.querySelector('.js-search-button').addEventListener('click',
        ()=>{
            const search = document.querySelector('.js-search-bar').value;
            window.location.href = `amazon.html?search=${search}`;
        });
}
