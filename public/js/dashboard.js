const menuIcon = document.querySelector(".menu-icon")
const sideBar = document.querySelector(".sidebar-container")

menuIcon.addEventListener("click", () =>{
menuIcon.classList.toggle("active")
sideBar.classList.toggle("active")

})

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener("click",() => {
menuIcon.classList.remove("active")
sideBar.classList.remove("active")
}))



// Handle order status selection

const orderStatus = document.querySelectorAll(".orderStatus");
  

function handleOrderStatus(event) {
  const selectedOrderBtn = event.target;
  if (selectedOrderBtn.classList.contains("orderStatus")) {
    const activeOrderToggle = document.querySelector(".orderStatus.active");
    if (activeOrderToggle) {
      activeOrderToggle.classList.remove("active");
    }
    selectedOrderBtn.classList.add("active");
  }
}

// Add event listener to orderStatus elements
orderStatus.forEach((button) => {
  button.addEventListener("click", handleOrderStatus);
});

//Hide or display profile menu

const user = document.querySelector(".user")
const profileMenu = document.querySelector(".profile-menu")

let showProfile = false

function showProfileMenu(){
  if(showProfile){
    profileMenu.style.visibility = "visible"
  }else{
    profileMenu.style.visibility = "hidden"
  }
}

function toggleProfileMenu() {
  showProfile = !showProfile; // Toggle the value of showProfile
  showProfileMenu(); // Call the function to update the visibility
}

// Add click event listener to the user element
user.addEventListener("click", toggleProfileMenu);



