const wrapper = document.querySelector(".wrapper");
const editwrapper = document.querySelector(".editwrapper");
const closeBtn = document.querySelector(".closeBtn");

//Register Inputs
const registerNameInput = document.querySelector(".registerNameInput");
const registerEmailInput = document.querySelector(".registerEmailInput");
const registerPasswordInput = document.querySelector(".registerPasswordInput");
const editNameInput = document.querySelector(".editNameInput");
const editEmailInput = document.querySelector(".editEmailInput");
const editPasswordInput = document.querySelector(".editPasswordInput");

///Labels
const invalidEmailLogin = document.querySelector(".invalidEmailLogin");
const invalidEmailRegister = document.querySelector(".invalidEmailRegister");
const emailPasswordErrorLogin = document.querySelector(".emailPasswordErrorLogin");
const emailExists = document.querySelector(".emailExists");
const invalidPasswordRegister = document.querySelector(".invalidPasswordRegister");
const invalidEmailEdit = document.querySelector(".invalidEmailEdit");
const invalidPasswordEdit = document.querySelector(".invalidPasswordEdit");

//Buttons
const btnRegister = document.querySelector(".btnRegister");


closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
    invalidEmailRegister.classList.remove("active");
    invalidEmailLogin.classList.remove("active");
    emailExists.classList.remove("active");
    btnRegister.disabled = true;
});


function IsValidEmail(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
    } else {
        return false;
    }
}

function IsValidPassword(email){
    var validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  if (email.match(validRegex)) {
    return true;
    } else {
        return false;
    }
}

function ClearInputs(){
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    registerNameInput.value = "";
    registerEmailInput.value = "";
    registerPasswordInput.value = "";
}
