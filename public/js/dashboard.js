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
