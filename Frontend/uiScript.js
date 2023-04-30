const wrapper = document.querySelector(".wrapper");
const closeBtn = document.querySelector(".closeBtn");

//Register Inputs
const registerName = document.querySelector(".registerNameInput");
const registerEmail = document.querySelector(".registerEmailInput");
const registerPassword = document.querySelector(".registerPasswordInput");

//Register Inputs
// const registerName = document.querySelector(".registerNameInput");
// const registerEmail = document.querySelector(".registerEmailInput");
// const registerPassword = document.querySelector(".registerPasswordInput");


closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
    ClearInputs();
});

function ClearInputs(){
    registerName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
}