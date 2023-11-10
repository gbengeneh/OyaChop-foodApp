// Select DOM elements
const productsEl = document.querySelector(".items-container");
const category = document.querySelector(".categories");

// Check if the current page is cart.html or dashboard.html
const isDashboardPage = window.location.pathname.includes('dashboard.html');
const isCartPage = window.location.pathname.includes('cart.html');
const isProfilePage = window.location.pathname.includes('profile.html');
const isOrderPage = window.location.pathname.includes('order.html');
const isCheckoutPage = window.location.pathname.includes('checkout.html');
const isSupportPage = window.location.pathname.includes('support.html');

// Fetch and render products
renderProducts();

let products = []; // Define products 
const user_id = sessionStorage.getItem('user_id') // Get User Id

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
      getUser()
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


// Function to display messages ON DASHBORD
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


let cart = [];

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
          // Display error message
          displayMessage('Error adding item to cart', false);
        });
    }
  }
}



//function to save cart to local storage
function saveCartToLocalStorage() {
  // localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem(`cart_${user_id}`, JSON.stringify(cart))
}


//function to render cart items from the database
let viewItemsInCart = localStorage.getItem(`cart_${user_id}`) ? JSON.parse(localStorage.getItem(`cart_${user_id}`)) : [];
let cartLength = 0;

function renderCart(cartLength) {
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

      cartLength = viewItemsInCart.length
      console.log(cartLength)

      // Call getCartQuantity here, once cartLength is set
      getCartQuantity(cartLength);

     // Set the cart length in localStorage specific to the user
    //  localStorage.setItem(`cartLength_${user_id}`, cartLength);

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
  // const initialOverallTotal = initialOverallSubtotal + initialTaxAmount;
  initialOverallTotal = initialOverallSubtotal + initialTaxAmount; // Assign the value to the global variable

  const overallSubtotalCell = document.getElementById('subtotal');
  overallSubtotalCell.textContent = `N ${initialOverallSubtotal.toFixed(2)}`;


  const taxCell = document.getElementById('tax');
  taxCell.textContent = `N ${initialTaxAmount.toFixed(2)}`;

  const totalCell = document.getElementById('total');
  totalCell.textContent = `N ${initialOverallTotal.toFixed(2)}`;


}

//function to get the total quantity from the backend and save to localstorage
function getOrderSummary() {
  // Get elements by their IDs
  const cartSubtotal = document.getElementById('subtotal');
  const cartTax = document.getElementById('tax');
  const cartTotal = document.getElementById('total');

  // Check if the elements exist
  if (cartSubtotal && cartTax && cartTotal) {
    // Get the values
    const cartSubtotalValue = cartSubtotal.textContent;
    const cartTaxValue = cartTax.textContent;
    const cartTotalValue = cartTotal.textContent;

    // Store the values in local storage with unique keys
    localStorage.setItem('cartSubtotal', cartSubtotalValue);
    localStorage.setItem('cartTax', cartTaxValue);
    localStorage.setItem('cartTotal', cartTotalValue);

  } else {
    console.error('One or more elements not found.');
  }
}

//function to render the total quantity from the localstorage
function renderOrderSummary() {
  // Retrieve values from local storage
  const cartSubtotalValue = localStorage.getItem('cartSubtotal');
  const cartTaxValue = localStorage.getItem('cartTax');
  const cartTotalValue = localStorage.getItem('cartTotal');
  const totalCartQuantity = localStorage.getItem('totalQuantity');

  // Get elements by their IDs on the current page
  const orderSubtotal = document.getElementById('order-subtotal');
  const orderTax = document.getElementById('order-tax');
  const orderTotal = document.getElementById('order-total');
  const orderQuantity = document.getElementById('carttotal')

  orderQuantity.textContent = `${totalCartQuantity} Items`
  orderSubtotal.textContent = `${cartSubtotalValue}`
  orderTax.textContent = `${cartTaxValue}`
  orderTotal.textContent = `${cartTotalValue}`

}


//function to get the total quantity from the backend
function getTotalQuantity() {
  // Store a reference to the current timer
  let timer;

  // Add event listeners to quantity inputs
  const quantityInputs = document.querySelectorAll('.quantity-input');
  // const addQuantity = document.querySelectorAll('.addtocart');
  // console.log(addQuantity)
  quantityInputs.forEach(input => {
    input.addEventListener('input', (event) => {
      const cartItemId = input.getAttribute('data-product-index');
      const newQuantity = `${parseInt(event.target.value) || addToCart()}`

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

            // Save the new total Quantity to local storage with a user-specific key
            localStorage.setItem(`totalQuantity_${user_id}`, data.total_items);


            // Update each cart quantity element individually

            const cartQuantityElements = document.querySelectorAll('.cartQuantity');
            cartQuantityElements.forEach(element => {
              element.textContent = `${data.total_items}`;
            });
            // getCartQuantity()
          })
          .catch((error) => console.error('Error updating cart quantity:', error));
      }, 500);
    });
  });
}


function getCartQuantity(cartLength) {
  // Use the cartLength parameter passed to this function
  if (isDashboardPage || isProfilePage || isOrderPage || isCartPage || isCheckoutPage || isSupportPage) {
    const totalQuantityElement = document.querySelectorAll('.cartQuantity');
    console.log(totalQuantityElement)

    totalQuantityElement.forEach(element => {
      element.textContent = cartLength;

      // localStorage.getItem(`cartLength_${user_id}`, cartLength);
    });
  }
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

//define a function to get the user details from the backend and render on the profile page
function getUser() {
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
      old_password: 1
    }),
  })
    .then(response => response.json())
    .then(data => {

      const userDetails = data.user
      // Update the user details in the HTML
      const userFirstName = document.getElementById("user_firstname");
      const userLastName = document.getElementById("user_lastname");
      const userEmail = document.getElementById("user_email");
      const userPhone = document.getElementById("user_phone");
      const userProfilePic = document.querySelectorAll(".profile-image");

      if (isProfilePage) {
        // Update the elements with the fetched data on the profile page
        userFirstName.value = userDetails.firstname;
        userLastName.value = userDetails.lastname;
        userEmail.value = userDetails.email;
        userPhone.value = userDetails.phone_number;
        //update the images for mobile and desktop view on the profile page
        userProfilePic.forEach(image => {
          image.src = `http://localhost/api/${userDetails.picture}`;
        });
      } else {
        // Update the user details on the dashboard page
        const userName = document.querySelector(".user-name")
        const profileImage = document.querySelector(".user-image")

        //update the images on dashboard page
        userName.innerText = userDetails.firstname;
        profileImage.src = `http://localhost/api/${userDetails.picture}`
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to display PASSWORD UPDATE message
function displayPasswordMessage(message, isSuccess) {
  const passwordMessageDiv = document.getElementById('passwordMessage');
  passwordMessageDiv.textContent = message;
  passwordMessageDiv.classList.toggle('success', isSuccess);
  passwordMessageDiv.classList.toggle('error', !isSuccess);
  setTimeout(() => {
    passwordMessageDiv.textContent = '';
    passwordMessageDiv.classList.remove('success', 'error');
  }, 5000);
}


// Define a function to update user password on the profile page
function updatePassword() {
  const BASE_URL = 'http://localhost/api/profile.php';
  const user_id = sessionStorage.getItem('user_id');

  const oldPassword = document.querySelector('.oldPassword');
  const newPassword1 = document.querySelector('.newPassword1');
  const newPassword2 = document.querySelector('.newPassword2');

  if (!oldPassword.value || !newPassword1.value || !newPassword2.value) {
    console.log('Please provide old password and both new passwords.');
    // Display error message
    displayPasswordMessage('Please provide old password and both new passwords.', false);
    return;
  }

  if (newPassword1.value !== newPassword2.value) {
    console.log('New passwords do not match.');
    // Display error message
    displayPasswordMessage('New passwords do not match.', false);
    return;
  }

  //verify the old password
  fetch(`${BASE_URL}?api=verify_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: user_id,
      old_password: oldPassword.value,
      new_password: newPassword1.value,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.passwordVerified) {
        // Old password is verified, proceed to update the new password
        return fetch(`${BASE_URL}?api=update_password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user_id,
            old_password: oldPassword.value,
            new_password: newPassword1.value,
          }),
        });
      } else {
        console.log('Old password is incorrect.');
        // Display error message
        displayPasswordMessage('Old password is incorrect.', false);
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // Display success message
      displayPasswordMessage(data.message, true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



//define a function to update the user delivery address from the database
function updateDeliveryAddress() {
  if (isCheckoutPage) {
    const user_id = sessionStorage.getItem('user_id');

    // select the user delivery address value from the input
    const changeFirstname = document.getElementById("firstname");
    const changeLastName = document.getElementById("lastname");
    const changeAddress = document.getElementById("address");
    const changePhone = document.getElementById("phone");
    const addLandmark = document.getElementById("landmark");

    // Prepare the data to be sent in the request
    const requestData = {
      user_id: user_id, // Add the user_id to the request data
      firstname: changeFirstname.value,
      lastname: changeLastName.value,
      phone_number: changePhone.value,
      delivery_address: changeAddress.value,
      closest_landmark: addLandmark.value,
    };

    fetch(`http://localhost/api/change_delivery_address.php?user_id=${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData), // Send the request data as JSON
    })
      .then(response => response.json())
      .then(data => {
        data.status == "success" ?
          displayAlertMessage(data.message, true) :
          displayAlertMessage(data.message, false)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}


//function to display modal

function modalDisplay() {
  if (isCheckoutPage) {
    const modalForm = document.querySelector(".modal-form")
    modalForm.style.display = "block"
  }
}

function cardPayment() {
  if (isCheckoutPage) {
    const BASE_URL = 'http://localhost/api/cart.php';
    const user_id = sessionStorage.getItem('user_id');

    fetch(`${BASE_URL}?api=total_price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        food_id: 16,
        quantity: 1,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const order_total = parseFloat(data.total_price_with_tax);
        const user_id = sessionStorage.getItem('user_id');
        const cardNumber = document.getElementById("card-number");
        const cardMonth = document.getElementById("card-month");
        const cardYear = document.getElementById("card-year");
        const cardCvv = document.getElementById("card-cvv");

        // Prepare the data to be sent in the request
        const requestData = {
          user_id: user_id, // Add the user_id to the request data
          card_number: cardNumber.value,
          card_month: cardMonth.value,
          card_year: cardYear.value,
          card_cvv: cardCvv.value,
          order_total: order_total,
        };

        fetch(`http://localhost/api/payment_gateway.php?user_id=${user_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData), // Send the request data as JSON
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === "success") {
              displayAlertMessage(data.message, true);
              modalDisplay();
            } else {
              displayAlertMessage(data.message, false);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });


      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}

//function to view delivery details
function viewDeliveryDetails() {
  if (isCheckoutPage) {
    const user_id = sessionStorage.getItem('user_id');

    fetch(`http://localhost/api/get_delivery_details.php?user_id=${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(requestData), // Send the request data as JSON
    })
      .then(response => response.json())
      .then(data => {
        const responseData = data.delivery_details[0]
        console.log(responseData)

        // select the user delivery address value from the input
        const firstname = document.getElementById("firstname");
        const lastName = document.getElementById("lastname");
        const address = document.getElementById("address");
        const phone = document.getElementById("phone");
        const landmark = document.getElementById("landmark");

        firstname.value = responseData.firstname
        lastName.value = responseData.lastname
        address.value = responseData.delivery_address
        phone.value = responseData.phone_number
        landmark.value = responseData.closest_landmark

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}

//function to render orders on the frontend
function getOrder() {
  if (isOrderPage) {
    const user_id = sessionStorage.getItem('user_id');

    fetch(`http://localhost/api/order.php?user_id=${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Extract orders from the fetched data
        let orders = data;
        console.log(orders)
        const ordersEl = document.querySelector(".orderItemsWrap");
        if (ordersEl) {
          ordersEl.innerHTML = "";

          // Loop through the orders array and render each order
          orders.forEach(order => {
            const orderItem = createOrderMarkup(order);
            ordersEl.insertAdjacentHTML("beforeend", orderItem)
          });

        }

        // Add event listener for category selection only on order.html
        if (isOrderPage) {
          activeOrderToggle.addEventListener("click", handleCategorySelection);
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}


// Create HTML markup for a product item
function createOrderMarkup(order) {
  return `
  <div class="orderedItem" data-name="${order.status}">
  <div class="leftDiv">
      <img class="orderImage" src="http://localhost/food_order/images/food/${order.image_name}" alt="">
      <div class="orderDetails">
          <h2 class="orderCode">Order #00${order.food_id}</h2>
          <p class="orderTitle">${order.title}</p>
          <p class="orderUpdate">Status: <span>${order.status}</span></p>
      </div>
  </div>
  <div class="rightDiv">
      <small class="orderTime">${order.time_diff}</small>
      <h3 class="orderPrice">N ${order.total}</h3>
  </div>
</div>
  `;
}






function formatCardNumber(cardNumber) {
  // Remove any existing spaces or non-numeric characters
  cardNumber = cardNumber.replace(/\D/g, '');

  // Insert a space after every 4 digits
  return cardNumber.replace(/(\d{4})/g, '$1 ');
}


function viewCardDetails() {
  if (isCheckoutPage) {
    const user_id = sessionStorage.getItem('user_id');

    fetch(`http://localhost/api/get_card_details.php?user_id=${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const atmDetails = data.card_details[0]


        //select variables
        const cardHolder = document.querySelector('.atm-name');
        const cardNumberValue = formatCardNumber(atmDetails.card_number);
        const cardNumber = document.querySelector('.atmNumber');
        const expiryMonth = document.querySelector('.atm-month');
        const expiryYear = document.querySelector('.atm-year');
        const cardCvv = document.querySelector('.atm-cvv');
        const cardAmount = document.querySelector('.amount');

        //equate variable to data from backend
        cardHolder.textContent = atmDetails.card_holder
        cardNumber.textContent = cardNumberValue
        expiryMonth.textContent = atmDetails.expire_month
        expiryYear.textContent = atmDetails.expire_year
        cardCvv.textContent = atmDetails.cvv
        cardAmount.textContent = atmDetails.amount
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}