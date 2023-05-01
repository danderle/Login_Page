//Buttons
const loginLink = document.querySelector(".login-link");
const btnLoginPopup = document.querySelector(".btnLogin-popup");
const loginBtn = document.querySelector(".btnLogin");

//Inputs
const loginEmailInput = document.querySelector(".loginEmailInput");
const loginPasswordInput = document.querySelector(".loginPasswordInput");

loginEmailInput.addEventListener("input", () => {
    emailPasswordErrorLogin.classList.remove("active");
    invalidEmailLogin.classList.remove("active");
    EnableLoginButton();
});

loginPasswordInput.addEventListener("input", () => {
    EnableLoginButton();
});

loginEmailInput.addEventListener("input", () => {
    invalidEmailLogin.classList.remove("active");
    emailPasswordErrorLogin.classList.remove("active");
});

loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

btnLoginPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
    ClearInputs();
});

closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});


loginBtn.addEventListener("click", async () => {
    if(IsValidEmail(loginEmailInput.value)){
        var val = await CheckEmailAndPassword();
        if(!val){
            emailPasswordErrorLogin.classList.add("active");
        }
        else{
            //logged in
            editwrapper.classList.add("active");
            ClearInputs();
        }
    } else {
        console.log("invalid email");
        invalidEmailLogin.classList.add("active");
    }
});


function EnableLoginButton(){
    if(loginEmailInput.value !== "" &&
        loginPasswordInput.value !== ""){
            loginBtn.disabled = false;
            console.log("enabled");
        }
        else{
            console.log("disabled");
            loginBtn.disabled = true;
        }
}

async function CheckEmailAndPassword(){
    var obj = GetLoginEmailAndPasswordObject();
    var exists = true;
    await axios.post('http://localhost:5050/login', obj)
    .then(function (response) {
      // handle success
        console.log(response.data);
        editEmailInput.placeholder = loginEmailInput.value;
        editPasswordInput.value = loginPasswordInput.value;
        editNameInput.placeholder = response.data.name;
        window.localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error);
    });

    console.log(exists);
    return exists;
}

function GetLoginEmailAndPasswordObject(){
    var obj = new Object();
    obj.email = loginEmailInput.value;
    obj.password = loginPasswordInput.value;
    console.log(obj);
    return obj;
}