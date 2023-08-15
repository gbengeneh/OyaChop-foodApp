// Select DOM elements
const productsEl = document.querySelector(".items-container");
const category = document.querySelector(".categories");

// Check if the current page is cart.html or dashboard.html
const isCartPage = window.location.pathname.includes('cart.html');
const isDashboardPage = window.location.pathname.includes('dashboard.html');
const isProfilePage = window.location.pathname.includes('profile.html');

// Fetch and render products
renderProducts();

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


let cart = [];

// Function to display messages
function displayMessage(message, isSuccess) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.classList.toggle('success', isSuccess);
  messageDiv.classList.toggle('error', !isSuccess);
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.classList.remove('success', 'error');
  }, 4000);
}

// Add to cart function
function addToCart(productId) {
  if (isDashboardPage) {
    // Check if the product is already in the cart
    if (cart.some((product) => product.id === productId)) {
      displayMessage('Item already in cart', false);
    } else {
      const foodItem = products.find((product) => product.id === productId);
      // Save the updated cart to local storage
      saveCartToLocalStorage();
      const BASE_URL = 'http://localhost/api/cart.php';
      const user_id = sessionStorage.getItem('user_id');

      fetch(`${BASE_URL}?api=add_to_cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          food_id: foodItem.id,
          quantity: 1,
          // Include other properties of the foodItem if required
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);

          // Add the added item to the cart array
          cart.push(foodItem);

          // Display success message
          displayMessage('Item added to cart', true);
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);
          // Display error message
          displayMessage('Error adding item to cart', false);
        });
    }
  }
}


//function to save cart to local storage
function saveCartToLocalStorage() {
 localStorage.setItem('cart', JSON.stringify(cart));
}


//function to render cart items from the database
let viewItemsInCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

function renderCart() {
 const BASE_URL = 'http://localhost/api/cart.php';
 const user_id = sessionStorage.getItem('user_id');

 fetch(`${BASE_URL}?api=view_cart`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     user_id: user_id,
     food_id: 1,
     quantity: 1,
   }),
 })
   .then(response => response.json())
   .then(cartData => {
     viewItemsInCart = cartData;
     console.log(viewItemsInCart);

     saveCartToLocalStorage();

     renderCartItems(viewItemsInCart);
     handleQuantity(viewItemsInCart);
     getTotalQuantity();

     updateCartItemsDisplay();
     updateCartTotals();
   })
   .catch(error => {
     console.log(error);
   });
}

// Create HTML markup for a product item
function createCartItemMarkup(itemsInCart) {
 return `
 <tr>
   <td>
     <div class="cart-info" data-product-id="${itemsInCart.id}">
       <img src="http://localhost/food_order/images/food/${itemsInCart.image_name}">
       <div>
         <p>${itemsInCart.title}</p>
         <a href="#" class="remove-link" onclick="handleRemoveItem(event)" data-food-id="${itemsInCart.id}">Remove</a>
       </div>
     </div>
   </td>
   <td><input type="number" id="quantity-box" value="${itemsInCart.quantity}" data-product-index="${itemsInCart.id}" class="quantity-input" min="1"></td>
   <td>N ${itemsInCart.price}</td>
   <td class="subtotal-cell">N ${itemsInCart.price * itemsInCart.quantity}</td>
 </tr> 
 `;
}



// Attach the event listener outside the function
const removeItemLinks = document.querySelectorAll('.remove-link');
removeItemLinks.forEach(removeLink => {
 removeLink.addEventListener('click', handleRemoveItem);
});



// Define the handleRemoveItem function
function handleRemoveItem(event) {
 event.preventDefault(); // Prevent the default link behavior
 
 const BASE_URL = 'http://localhost/api/cart.php';
 const user_id = sessionStorage.getItem('user_id');
 
 const cartItemId = event.target.getAttribute('data-food-id');
 
 fetch(`${BASE_URL}?api=delete_from_cart`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     user_id: user_id,
     food_id: cartItemId,
     quantity: 1,
   }),
 })
   .then(response => response.json())
   .then(data => {
     console.log(data.message);

     alertify.set('notifier', 'position', 'top-right');
     alertify.error(data.message);

     // Introduce a delay before reloading the window
     setTimeout(() => {
       window.location.reload();
     }, 2000);
     
     updateCartItemsDisplay();
   })
   .catch(error => {
     console.error('Error:', error);
   });
}

//define a function to reset the cart and empty all items in cart
function resetCart() {
  const BASE_URL = 'http://localhost/api/cart.php';
  const user_id = sessionStorage.getItem('user_id');

  fetch(`${BASE_URL}?api=reset_cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: user_id,
      food_id: 1,
      quantity: 1,
    }),
  })
    .then(response => response.json())
    .then(data => {

      alertify.set('notifier', 'position', 'top-right');
      alertify.success(data.message);

      // Introduce a delay before reloading the window
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      updateCartItemsDisplay();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//Add event listener to reset cart
const resetBtn = document.querySelector(".cart-reset")
resetBtn.addEventListener('click', () => {
  resetCart()
})

//function to toggle between cart active and cart empty
function updateCartItemsDisplay() {
 const emptyCartDiv = document.getElementById('cartEmpty');
 const activeCartDiv = document.getElementById('cartActive');
 
 if (viewItemsInCart.length === 0) {
   emptyCartDiv.style.display = 'flex';
   activeCartDiv.style.display = 'none';

 } else {
   emptyCartDiv.style.display = 'none';
   activeCartDiv.style.display = 'block';
   
 }
}



//function to handle quantity change and update on the backend
function handleQuantity() {
 if (isCartPage) {
   // Add event listeners to quantity inputs
   const quantityInputs = document.querySelectorAll('.quantity-input');

   quantityInputs.forEach(input => {
     input.addEventListener('input', event => {
       const cartItemId = input.getAttribute('data-product-index');
       const newQuantity = parseInt(event.target.value);
       
       // Update the quantity in viewItemsInCart array
       const cartItemIndex = viewItemsInCart.findIndex(item => item.id === cartItemId);
       if (cartItemIndex !== -1) {
         viewItemsInCart[cartItemIndex].quantity = newQuantity;
       }

       // Update the quantity in the backend using an API call
       const BASE_URL = 'http://localhost/api/cart.php';
       const user_id = sessionStorage.getItem('user_id');

       fetch(`${BASE_URL}?api=update_cart`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           user_id: user_id,
           food_id: cartItemId,
           quantity: newQuantity,
         }),
       })
         .then(response => response.json())
         .then(data => {
           console.log(data);
           const price = parseFloat(input.parentElement.nextElementSibling.textContent.replace('N ', ''));
           const subtotalCell = input.parentElement.nextElementSibling.nextElementSibling;
           const newSubtotal = price * newQuantity;
           subtotalCell.textContent = `N ${newSubtotal.toFixed(2)}`;

           // Update display elements
           updateOverallSubtotal();
           updateTaxAndTotal();

           updateCartQuantity(totalQuantity);

           renderCartItems(viewItemsInCart); // Update the rendered cart items
         })
         .catch(error => {
           console.error('Error updating quantity:', error);
         });
     });
   });
 }
}

// Calculate and update the overall subtotal
function updateOverallSubtotal() {
 const subtotalCells = document.querySelectorAll('.subtotal-cell');
 let overallSubtotal = 0;

 subtotalCells.forEach(cell => {
   const subtotalValue = parseFloat(cell.textContent.replace('N ', ''));
   overallSubtotal += subtotalValue;
 });

 const subtotalElement = document.getElementById('subtotal');
 subtotalElement.textContent = `N ${overallSubtotal.toFixed(2)}`;
}


// Calculate and update tax and overall total
function updateTaxAndTotal() {
 const taxRate = 0.10;
 const overallSubtotal = parseFloat(document.getElementById('subtotal').textContent.replace('N ', ''));
 const taxAmount = overallSubtotal * taxRate;
 const overallTotal = overallSubtotal + taxAmount;

 const taxCell = document.getElementById('tax');
 taxCell.textContent = `N ${taxAmount.toFixed(2)}`;

 const totalCell = document.getElementById('total');
 totalCell.textContent = `N ${overallTotal.toFixed(2)}`;
}


// Calculate and update the initial cart totals
function updateCartTotals() {
 const quantityInputBox = document.querySelectorAll('.quantity-input');
 let initialOverallSubtotal = 0;

 quantityInputBox.forEach(inputBox => {
   
   const quantity = parseInt(inputBox.value);
   const price = parseFloat(inputBox.parentElement.nextElementSibling.textContent.replace('N ', ''));

   initialOverallSubtotal += price * quantity;

   
 });

 const taxRate = 0.10; // Adjust the tax rate as needed
 const initialTaxAmount = initialOverallSubtotal * taxRate;
 const initialOverallTotal = initialOverallSubtotal + initialTaxAmount;

 const overallSubtotalCell = document.getElementById('subtotal');
 overallSubtotalCell.textContent = `N ${initialOverallSubtotal.toFixed(2)}`;

 const taxCell = document.getElementById('tax');
 taxCell.textContent = `N ${initialTaxAmount.toFixed(2)}`;

 const totalCell = document.getElementById('total');
 totalCell.textContent = `N ${initialOverallTotal.toFixed(2)}`;

}



//function to get the total quantity from the backend
function getTotalQuantity() {
  // Store a reference to the current timer
  let timer;

  // Add event listeners to quantity inputs
  const quantityInputs = document.querySelectorAll('.quantity-input');

  quantityInputs.forEach(input => {
    input.addEventListener('input', (event) => {
      const cartItemId = input.getAttribute('data-product-index');
      const newQuantity = parseInt(event.target.value);

      // Clear the previous timer to debounce requests
      clearTimeout(timer);

      // Set a new timer to execute after a delay (e.g., 500ms)
      timer = setTimeout(() => {
        const BASE_URL = 'http://localhost/api/cart.php';
        const user_id = sessionStorage.getItem('user_id');

        fetch(`${BASE_URL}?api=total_items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user_id,
            food_id: cartItemId,
            quantity: newQuantity,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.total_items);

          // Save the new total Quantity to local storage
          localStorage.setItem('totalQuantity', data.total_items);


          // Update each cart quantity element individually
          const cartQuantityElements = document.querySelectorAll('.cartQuantity');
          cartQuantityElements.forEach(element => {
            element.textContent = `${data.total_items}`;
          });

        })
        .catch((error) => console.error('Error updating cart quantity:', error));
      }, 500);
    });
  });
}

// Render cart product items
function renderCartItems(viewItemsInCart) {

 if (isCartPage) {
     const cartItemsContainer = document.querySelector('.cart-items');
     
     if (cartItemsContainer) {
       cartItemsContainer.innerHTML = "";
   
       viewItemsInCart.forEach((itemsInCart) => {
         const testCartItem = createCartItemMarkup(itemsInCart);
         cartItemsContainer.insertAdjacentHTML("beforeend", testCartItem);
       });
   }

 }
}


// Initialize overall subtotal, tax, and overall total
document.addEventListener('DOMContentLoaded', () => {
// Call the renderCart function to start rendering cart items
renderCart();
renderCartItems()
});

//define a function to get the user details from the backend and render on the frontend
function getUser() {
  if (isProfilePage) {
    const BASE_URL = 'http://localhost/api/profile.php';
    const user_id = sessionStorage.getItem('user_id');

    fetch(`${BASE_URL}?api=view_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        new_password: 1,
      }),
    })
    .then(response => response.json())
    .then(data => {

      const userDetails = data.user
      console.log(userDetails)
      // Update the user details in the HTML
      const userFirstName = document.getElementById("user_firstname");
      const userLastName = document.getElementById("user_lastname");
      const userEmail = document.getElementById("user_email");
      const userPhone = document.getElementById("user_phone");
      const userProfilePic = document.querySelectorAll(".profile-image");

      // Update the elements with the fetched data
      userFirstName.value = userDetails.firstname;
      userLastName.value = userDetails.lastname;
      userEmail.value = userDetails.email;
      userPhone.value = userDetails.phone_number;
      //update the images on mobile and desktop view
      userProfilePic.forEach(image => {
        image.src = `http://localhost/api/${userDetails.picture}`;
      });

      console.log(userProfilePic)
      
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}
