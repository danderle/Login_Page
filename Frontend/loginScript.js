//Buttons
const loginLink = document.querySelector(".login-link");
const btnLoginPopup = document.querySelector(".btnLogin-popup");

loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

btnLoginPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
});

closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});

