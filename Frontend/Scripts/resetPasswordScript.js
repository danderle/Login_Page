const wrapper = document.querySelector(".wrapper");

//Buttons
const btnResetLink = document.querySelector(".btnResetLink");
const btnSavePassword = document.querySelector(".btnSavePassword");

//Inputs
const resetEmailInput = document.querySelector(".resetEmailInput");
const resetPasswordInput = document.querySelector(".resetPasswordInput");
const resetTokenInput = document.querySelector(".resetTokenInput");

//Labels
const resetEmailNotFound = document.querySelector(".resetEmailNotFound");
const invalidPasswordReset = document.querySelector(".invalidPasswordReset");


resetEmailInput.addEventListener("input", () => {
    resetEmailNotFound.classList.remove("active");
    if(resetEmailInput.value){
        btnResetLink.disabled = false;
    } else {
        btnResetLink.disabled = true;
    }
});

resetPasswordInput.addEventListener("input", () => {
    enableSaveBtn();
});

resetTokenInput.addEventListener("input", () => {
    enableSaveBtn();
});

btnResetLink.addEventListener("click", async (event) => {
    event.preventDefault();
    if(isValidEmail(resetEmailInput.value)){
        await axios.put(emailServerUrl + "/passwordresetmail", {email: resetEmailInput.value})
        .then(function (response) {
        // handle success
            wrapper.classList.add("active");
        })
        .catch(function (error) {
        // handle error
        console.log("error")
        });

    } else {
        resetEmailNotFound.classList.add("active");
    }
});

btnSavePassword.addEventListener("click", async (event) => {
    event.preventDefault();
    if(isValidPassword(resetPasswordInput.value)){
        const obj = {password: resetPasswordInput.value, resetToken: resetTokenInput.value};
        console.log()
        await axios.put(emailServerUrl + "/changepassword", obj)
        .then(function (response) {
            // handle success
            window.location.href = "./";
        })
        .catch(function (error) {
        // handle error
        console.log("error")
        });

    } else {
        invalidPasswordReset.classList.add("active");
    }
})

function enableSaveBtn(){
    if(resetPasswordInput.value && resetTokenInput.value){
        btnSavePassword.disabled = false;
    } else {
        btnSavePassword.disabled = true;
    }
}