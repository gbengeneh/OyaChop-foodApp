 // Select DOM elements
 const productsEl = document.querySelector(".items-container");
 const category = document.querySelector(".categories");
 
 let products = []; // Define products at the top level
 
 // Fetch and render products
 function renderProducts() {
   // Fetch product data from the API
   fetch("http://localhost/api/fooditems.php")
     .then((response) => response.json())
     .then((completeData) => {
       // Extract products from the fetched data
       products = completeData[0].all_foods;
 
       // Add event listener for category selection only on dashboard.html
       if (isDashboardPage) {
         category.addEventListener("click", handleCategorySelection);
       }
 
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
   if (productsEl) {
     productsEl.innerHTML = "";
 
     products.forEach((product) => {
       const productItem = createProductItemMarkup(product);
       productsEl.insertAdjacentHTML("beforeend", productItem);
     });
 
     // Add event listener for "Add to cart" button
     const addToCartButtons = document.querySelectorAll('.addtocart');
     addToCartButtons.forEach((button) => {
       const productId = button.dataset.productId;
       button.addEventListener('click', () => addToCart(productId));
     });
   }
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
         <span class="addtocart" data-product-id="${product.id}">Add to cart</span>
       </div>
     </div>
   `;
 }
 
 // Call the renderProducts function to start rendering
 renderProducts();
 
 // Check if the current page is cart.html or dashboard.html
 const isCartPage = window.location.pathname.includes('cart.html');
 const isDashboardPage = window.location.pathname.includes('dashboard.html');
 
 // Load cart items from localStorage if available
 let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
 
 // Add to cart function
 function addToCart(productId) {
   if (isDashboardPage) {
     // Code to add item to cart
     if (cart.some((product) => product.id === productId)) {
       alertify.set('notifier', 'position', 'top-right');
       alertify.warning('Item already in cart');
     } else {
       const foodItem = products.find((product) => product.id === productId);
 
       cart.push({
         ...foodItem,
         numberOfUnits: 1,
       });
     }
 
     // Save cart items to localStorage
     localStorage.setItem('cart', JSON.stringify(cart));
 
     updateCart();
     updateCartQuantity();

   }
 }
 
 // Update cart only on the dashboard.html page
 function updateCart() {
   if (isDashboardPage) {
     // Code to update cart
     renderCartItems();
     updateCartQuantity(); // Update the cart quantity in the navigation
   }
 }
 
 // Render cart items only on the cart.html page
 function renderCartItems() {
   if (isCartPage) {
     const cartItemsContainer = document.querySelector('.cart-items');
     const subtotalElement = document.getElementById('subtotal');
     const taxElement = document.getElementById('tax');
     const totalElement = document.getElementById('total');
 
     if (cartItemsContainer && subtotalElement && taxElement && totalElement) {
       // Code to render cart items
       cartItemsContainer.innerHTML = ""; // Clear the cart items container
 
       cart.forEach((product, index) => {
         const cartItem = createCartItemMarkup(product, index);
         cartItemsContainer.insertAdjacentHTML('beforeend', cartItem);
       });
 
       // Update cart quantity
       const cartQuantityElements = document.querySelectorAll('.cartQuantity');
       cartQuantityElements.forEach((element) => {
         element.textContent = calculateCartQuantity();
       });
 
       // Calculate and update subtotal, tax, and total
       const subtotal = calculateSubtotal();
       const tax = calculateTax(subtotal);
       const total = subtotal + tax;
       subtotalElement.textContent = `N ${subtotal.toFixed(2)}`;
       taxElement.textContent = `N ${tax.toFixed(2)}`;
       totalElement.textContent = `N ${total.toFixed(2)}`;
 
       // Add event listeners to "Remove" links
       const removeLinks = document.querySelectorAll('.remove-link');
       removeLinks.forEach((link) => {
         link.addEventListener('click', handleRemoveItemClick);
       });
 
       // Add event listeners to quantity inputs
       const quantityInputs = document.querySelectorAll('.quantity-input');
       quantityInputs.forEach((input) => {
         input.addEventListener('input', handleQuantityInputChange);
       });
     }
   }
 }
 
 // Create HTML markup for a cart item
 function createCartItemMarkup(product, index) {
   const subtotal = product.price * product.numberOfUnits;
   return `
     <tr>
       <td>
         <div class="cart-info">
           <img src="http://localhost/food_order/images/food/${product.image_name}">
           <div>
             <p>${product.title}</p>
             <a href="#" class="remove-link" data-product-index="${index}">Remove</a>
           </div>
         </div>
       </td>
       <td><input type="number" value="${product.numberOfUnits}" data-product-index="${index}" class="quantity-input" min="1"></td>
       <td>N ${product.price}</td>
       <td>N ${subtotal}</td>
     </tr>
   `;
 }
 
 // Calculate the subtotal based on the cart items
 function calculateSubtotal() {
   let subtotal = 0;
   cart.forEach((product) => {
     subtotal += product.price * product.numberOfUnits;
   });
   return subtotal;
 }
 
 // Calculate the tax based on the subtotal
 function calculateTax(subtotal) {
   const taxRate = 0.08; // Assuming 8% tax rate
   return subtotal * taxRate;
 }
 
 // Handle quantity input change
 function handleQuantityInputChange(event) {
   const productIndex = event.target.dataset.productIndex;
   const newQuantity = parseInt(event.target.value);
 
   if (newQuantity >= 1) {
     // Update the quantity in the cart array
     cart[productIndex].numberOfUnits = newQuantity;
 
     // Save updated cart items to localStorage
     localStorage.setItem('cart', JSON.stringify(cart));
 
     // Update the cart display
     renderCartItems();
 
     // Update cart quantity
     const cartQuantityElements = document.querySelectorAll('.cartQuantity');
     cartQuantityElements.forEach((element) => {
       element.textContent = calculateCartQuantity();
     });

   }
 }
 
 // Calculate the total quantity in the cart
 function calculateCartQuantity() {
   let totalQuantity = 0;
   cart.forEach((product) => {
     totalQuantity += product.numberOfUnits;
   });
   return totalQuantity;
 }
 
 
 
 // Handle click event on "Remove" link
 function handleRemoveItemClick(event) {
   event.preventDefault();
   const productIndex = event.target.dataset.productIndex;
 
   // Remove the item from the cart array
   cart.splice(productIndex, 1);
 
   // Save updated cart items to localStorage
   localStorage.setItem('cart', JSON.stringify(cart));
 
   // Update the cart display
   renderCartItems();
   updateCartQuantity();
 }
 
 // Update cart quantity on both cart.html and dashboard.html pages
 function updateCartQuantity() {
   const cartQuantitySpans = document.querySelectorAll('.cartQuantity');
   if (cartQuantitySpans.length > 0) {
     cartQuantitySpans.forEach((span) => {
       span.textContent = calculateCartQuantity();
     });
   }
 }
 
 // Call necessary functions based on the current page
 document.addEventListener('DOMContentLoaded', () => {
   renderCartItems();
   updateCart();
   updateCartQuantity();
 });
 






// API








// Function to send a POST request to add an item to the cart
// function addToCart(productId) {
//   const addToCartEndpoint = "http://localhost/api/add-to-cart"; // Replace with your actual API endpoint URL

//   // Prepare the request payload
//   const payload = {
//     productId: productId,
//     userId: getUserId(), // Retrieve the currently logged-in user ID
//     quantity: 1, // Assuming a quantity of 1 for simplicity
//   };

//   // Send the POST request to the API endpoint
//   fetch(addToCartEndpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the API response
//       if (data.success) {
//         // Item added to cart successfully
//         console.log("Item added to cart!");
//       } else {
//         // Error occurred while adding the item to cart
//         console.error("Failed to add item to cart:", data.error);
//       }
//     })
//     .catch((error) => {
//       console.error("Error occurred while making the request:", error);
//     });
// }

// Helper function to retrieve the user ID
// function getUserId() {
//   // Implement your logic to retrieve the user ID, e.g., from the session or authentication token
//   return "user123"; // Replace with the actual user ID
// }

// Example usage:
// addToCart("product123"); // Call this function when adding an item to the cart
