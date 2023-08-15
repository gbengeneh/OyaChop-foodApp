//Handle hide or display password on register and login page

const passwordInput = document.getElementById("password")
const passwordIcon = document.getElementById("passwordIcon")

// console.log(passwordIcon, passwordInput)

function togglePassword(){
  if(passwordInput.type == "password"){
    passwordInput.type = "text"
    passwordIcon.src = "/public/img/eye-open.svg"
  }else{
    passwordInput.type = "password"
    passwordIcon.src = "/public/img/eye-close.svg"
  }
}




//Handle the FAQ section
const accordionQuestions = document.querySelectorAll(".accordionQuestion");

function toggleAccordion() {
  const contentElement = this.nextElementSibling;
  // Toggle the display of the content when the header is clicked
  if (contentElement.style.display === 'none' || contentElement.style.display === '') {
    // Show the content if it's currently hidden
    contentElement.style.display = 'block';
  } else {
    // Hide the content if it's currently visible
    contentElement.style.display = 'none';
  }
}

accordionQuestions.forEach(question => {
  question.addEventListener("click", toggleAccordion);
});
