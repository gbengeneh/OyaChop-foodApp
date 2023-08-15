    //Handle Hamburger Menu on Landing page
const menuIcon = document.querySelector(".menu-icon")
    const menuList = document.querySelector(".menu-list")
    
    menuIcon.addEventListener("click", () =>{
      menuIcon.classList.toggle("active")
      menuList.classList.toggle("active")
    })

    document.querySelectorAll(".link").forEach(n => n.addEventListener("click",() => {
      menuIcon.classList.remove("active")
      menuList.classList.remove("active")
    }))

