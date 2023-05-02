const serverUrl = "http://localhost:5050";
const authServerUrl = "http://localhost:5555";
const emailServerUrl = "http://localhost:4444";

const closeBtn = document.querySelector(".closeBtn");

if(closeBtn){
    closeBtn.addEventListener("click", () => {
        document.querySelector(".wrapper").classList.remove("active-popup");
        document.querySelector(".wrapper").classList.remove("active");
        document.querySelector(".invalidEmailRegister").classList.remove("active");
        document.querySelector(".invalidEmailLogin").classList.remove("active");
        document.querySelector(".emailExists").classList.remove("active");
        document.querySelector(".btnRegister").disabled = true;
        clearInputs();
    });
}

function isValidEmail(email){
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
}

function isValidPassword(password){
    const validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return password.match(validRegex);
}

function clearInputs(){
    document.querySelector(".loginEmailInput").value = "";
    document.querySelector(".loginPasswordInput").value = "";
    document.querySelector(".registerNameInput").value = "";
    document.querySelector(".registerEmailInput").value = "";
    document.querySelector(".registerPasswordInput").value = "";
}
