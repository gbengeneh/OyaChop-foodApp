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



// Function to display messages ON DASHBORD
function displayLoginMessage(loginMessage, isSuccess) {
  const messageWrap = document.getElementById('login-message');
  messageWrap.textContent = loginMessage;
  messageWrap.classList.toggle('success', isSuccess);
  messageWrap.classList.toggle('error', !isSuccess);
  setTimeout(() => {
    messageWrap.textContent = '';
    messageWrap.classList.remove('success', 'error');
  }, 5000);
}

//handle success message after successful login
document.addEventListener('DOMContentLoaded', function() {
  const loginSuccess = localStorage.getItem('login_success');
  if (loginSuccess === 'true') {
      displayLoginMessage('Login Successful', true)
      localStorage.removeItem('login_success'); 
  }
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



