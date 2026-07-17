
 let bagItemObject;

onload()
function onload(){
   
  loadBagItemObject()
  displayBagItem()
  bagsummary()


}

function loadBagItemObject(){

 bagItemObject = bagItems.map(itemId => {
  for(let i = 0 ; i <= items.length; i++){
    if(itemId == items[i].id){
      return items[i]
    }
  }

})

}

function displayBagItem(){
  let itemContainer = document.querySelector('.bag-items-container')
  let innerHtml ='';
  bagItemObject.forEach(bagItem => {
    innerHtml += generateItem(bagItem)
    
  });
 
  itemContainer.innerHTML = innerHtml;
  let emptymessage = document.querySelector('.empty-message');
  if(bagItemObject.length == 0){
    emptymessage.style.display  = 'block'
  
  }
 
}

function removeitem(itemId){
  bagItems = bagItems.filter(bagitemId => bagitemId != itemId );

  localStorage.setItem("bagItems" , JSON.stringify(bagItems))
  loadBagItemObject();
  displayBagItem();
  bagsummary()
  showAddToBag()
  
  
}




function generateItem(item){
  const itemQty = item.quantity || 1;
  return` <div class="bag-item-container">
          <div class="item-left-part">
            <img src=${item.image} alt="" class="bag-item-img">
          </div>
          <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item}</div>
            <div class="price-container">
            <span class="current-price">Rs${item.currentPrice}</span>
            <span class="original-price">Rs${item.originalPrice}</span>
            <span class="discount-percentage">(${item.discount})</span>
           
            </div>
            <div class="quantity-controller" style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
              <button onclick="changeQuantity(${item.id}, -1)" style="padding: 2px 8px; cursor: pointer;">-</button>
              <span class="item-quantity" style="font-weight: bold;">${itemQty}</span>
              <button onclick="changeQuantity(${item.id}, 1)" style="padding: 2px 8px; cursor: pointer;">+</button>
            </div>
            <div class="return-period">
              <span class="return-period-days">14 Days</span>
              Return Available
            </div>
            <div class="delivery-details">
              Deliverd by
              <span class="delivery-details-days">10 oct 2025</span>
            </div>

          </div>
          <div class="remove-from-cart" onclick="removeitem(${item.id})">X</div>
        </div>`
}


function changeQuantity(itemId, change) {
  let item = bagItemObject.find(prod => prod.id === itemId);
  
  if (item) {
    if (!item.quantity) {
      item.quantity = 1;
    }
    
    item.quantity += change;
    
    if (item.quantity < 1) {
      item.quantity = 1; 
    }
    
   
    displayBagItem();
    bagsummary();      
} 
}
 function bagsummary(){
  let bagSummary = document.querySelector(".bag-summary")

     let totalPrice = bagItemObject.reduce( (acc,item) =>{
      let qty = item.quantity || 1;
    return  acc + Number((item.originalPrice )* qty) ;
  },0)

  let discountAmount = bagItemObject.reduce((acc,item) => {
     let qty = item.quantity || 1;
    return acc + Number((item.originalPrice - item.currentPrice) * qty)
  },0)
  let convenience = 99;
  let totalAmount = (totalPrice - discountAmount) + convenience;

let totalItemsCount = bagItemObject.reduce((acc, item) => acc + (item.quantity || 1), 0);
  

if(bagItemObject.length > 0 ) {
  bagSummary.style.visibility = 'visible'
  bagSummary.innerHTML = `<div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItemsCount} items)</div>
          <div class="price-item">
            <span class="price-item-tag"> Total Rs </span>
            <span class="price-item-value">  ₹${totalPrice}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag"> Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount"> -₹ ${discountAmount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹${convenience}</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹${totalAmount}</span>
          </div>
        </div>
        <button class="btn-placed-order">
          PLACED ORDER
        </button>
      </div>
      <div class="form-container">
    <form action="" class="form" type="submit">
      <input type="text" class="name-input" placeholder="Your Name" required> <br>
      <input type="text" class="address-input" placeholder="your Address" required><br>
      <input type="number"  class="number-input" placeholder="Your Phone Number" required>
      <button  class="order-btn">Confirm Order</button>
    </form>
   </div>
   </div>
      `
        placeorder()
}else{
  bagSummary.style.visibility = "hidden"
}
  
 }
 
 function placeorder(){
  let btn = document.querySelector('.btn-placed-order');

btn.addEventListener("click", function(){
  let formcontainer = document.querySelector('.form-container')
  formcontainer.style.display = "block"
  console.log("click")
})
 
let confirmOrder = document.querySelector('.form')
  confirmOrder.addEventListener('submit', function(event){
     event.preventDefault()
   
    let name = document.querySelector('.name-input')
    let address= document.querySelector('.address-input')
    let number = document.querySelector('.number-input')

    let nameDetail = document.querySelector('.name-input').value
    let addressDetail = document.querySelector('.address-input').value
    if(name.value.trim() == "") {
     return  alert("please enter your name")
    }
    if(address.value.trim() ==""){
      return alert("please enter address")
    }
    if(number.value.length !=10){
       return alert("please enter correct number")
    }
    
      let formcontainer = document.querySelector('.form-container')
  formcontainer.style.display = "none"


  let newOrder = {
    orderDate: new Date().toLocaleDateString(),
    customerName: nameDetail,
    customerAddress: addressDetail,
    items: bagItemObject,
  };
 
  let existingOrders = JSON.parse(localStorage.getItem('orderItem')) ||[];
  

  existingOrders.push(newOrder)

  localStorage.setItem("orderItem", JSON.stringify(existingOrders))
   alert(`Order placed Successfully ${bagItemObject.length}`);
})

 }


  