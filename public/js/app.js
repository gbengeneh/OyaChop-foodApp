// import { products } from ".js/products";

//select element
const productsEl = document.querySelector(".items-container");
const cartItemsEl = document.querySelector(".cart-items");
const categoryBtn = document.querySelectorAll(".category-btn")


//render products

function renderProducts(filterItems){
  products.forEach((product) => {
    productsEl.innerHTML += `
      <div class="item" data-name="${product.category}">
        <div class="item-img">
          <img src="${product.imgSrc}" alt="">
        </div>

        <div class="item-name">
          <h5>${product.name}</h5>

          <p>${product.decription}</p>
        </div>

        <div class="price-cart">
          <span class="price">N ${product.price}</span>
          <span class="addtocart" onclick="addToCart(${product.id})">Add to cart</span>
        </div>
      </div>
    
    `
  })
}
renderProducts();

// define the filterItems function
const filterItems = e => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active")

  // iterate over each product item 
  products.forEach(product => {
  //add hide product to hide the product initially
  product.classList.add("hide");
  })
}

// add click event to category button
categoryBtn.forEach(button => button.addEventListener("click", filterItems))




// create a cart array

let cart = [];
//add to cart function

function addToCart(id){
  //check if product already exist in cart
  if (cart.some((item)=> item.id === id)){
    alert("food already in cart")
  }else{
    const item = products.find((product)=> product.id === id)

    cart.push({
      ...item,
      numberOfUnits : 1,
    });

  }
  updateCart();
}

// update cart

function updateCart(){
  renderCartItems();
  // renderSubtotal();
}

// render cart items

function renderCartItems(){

  cart.forEach((item)=>{
    cartItemsEl.innerHTML = `
      <tr>
      <td>
        <div class="cart-info">
          <img src="${item.imgSrc}">
          <div>
            <p>${item.name}</p>
            <a href="#">Remove</a>
          </div>
        </div>
      </td>
      <td><input type="number" value="${item.numberOfUnits}"></td>
      <td>N ${item.price}</td>
      <td>N 4500</td>
      </tr>
    `
  })
}




// function updateSubtotal() {
//   // Calculate subtotal based on cart items
//   let subtotal = 0;
//   cart.forEach((item) => {
//     subtotal += item.price * item.numberOfUnits;
//   });

//   // Update subtotal element on the page
//   const subtotalEl = document.querySelector("#subtotal");
//   subtotalEl.textContent = `N ${subtotal}`;
// }