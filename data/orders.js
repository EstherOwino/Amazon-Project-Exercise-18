export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
console.log(orders);

export function getOrders(orderId){
  let orderItems;
  orders.forEach((order)=>{
    if(orderId === order.id ){
      orderItems = order;
    }
  });
  return orderItems;
};

//a function to get the products in order

export function getOrderProducts(productId){
  let matchingOrderProducts;
  orders.forEach((order)=>{
    order.products.forEach((orderProduct)=>{
      if(productId === orderProduct.productId){
        matchingOrderProducts = orderProduct;
      }
    });
  });
  return matchingOrderProducts;
}

console.log(getOrderProducts("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"));


