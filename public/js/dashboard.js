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