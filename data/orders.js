export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
//console.log(orders);

export function getOrders(productId){
  let orderItems;
  orders.forEach((order)=>{
    if(productId === orders.id ){
      orderItems = order;
    }
  });
  return orderItems;
};

//a function to get the products in orders


