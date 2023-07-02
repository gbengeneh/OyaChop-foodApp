// Select DOM elements
const productsEl = document.querySelector(".items-container");
const category = document.querySelector(".categories");

// Fetch and render products
function renderProducts() {
  // Fetch product data from the API
  fetch("http://localhost/api/fooditems.php")
    .then((response) => response.json())
    .then((completeData) => {
      // Extract products from the fetched data
      const products = completeData[0].all_foods;

      // Add event listener for category selection
      category.addEventListener("click", handleCategorySelection);

      // Render products initially
      renderProductItems(products);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Handle category selection
function handleCategorySelection(event) {
  if (event.target.classList.contains("category-btn")) {
    // Get the selected category from the clicked button
    const selectedCategory = event.target.dataset.name;

    // Highlight the selected category button
    highlightCategoryButton(event.target);

    // Filter and show/hide products based on the selected category
    filterProductsByCategory(selectedCategory);
  }
}

// Highlight the selected category button
function highlightCategoryButton(selectedButton) {
  const activeButton = category.querySelector(".active");
  activeButton.classList.remove("active");
  selectedButton.classList.add("active");
}

// Filter and show/hide products based on the selected category
function filterProductsByCategory(selectedCategory) {
  const productItems = productsEl.querySelectorAll(".item");
  productItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-name");
    if (selectedCategory === "all" || selectedCategory === itemCategory) {
      item.classList.add("show");
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
      item.classList.remove("show");
    }
  });
}

// Render product items
function renderProductItems(products) {
  productsEl.innerHTML = "";

  products.forEach((product) => {
    const productItem = createProductItemMarkup(product);
    productsEl.insertAdjacentHTML("beforeend", productItem);
  });
}

// Create HTML markup for a product item
function createProductItemMarkup(product) {
  return `
    <div class="item ${product.category_id}" data-name="${product.category_id}">
      <div class="item-img">
        <img src="http://localhost/food_order/images/food/${product.image_name}" alt="">
      </div>
      <div class="item-name">
        <h5>${product.title}</h5>
        <p>${product.description}</p>
      </div>
      <div class="price-cart">
        <span class="price">N ${product.price}</span>
        <span class="addtocart" onclick="addToCart(${product.id})">Add to cart</span>
      </div>
    </div>
  `;
}

// Call the renderProducts function to start rendering
renderProducts();







const cartItemsEl = document.querySelector(".cart-items");
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