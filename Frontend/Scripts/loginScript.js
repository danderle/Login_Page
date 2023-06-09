const wrapper = document.querySelector(".wrapper");

//Buttons
const loginLink = document.querySelector(".login-link");
const loginBtn = document.querySelector(".btnLogin");
const btnLoginPopup = document.querySelector(".btnLogin-popup");

//Inputs
const loginEmailInput = document.querySelector(".loginEmailInput");
const loginPasswordInput = document.querySelector(".loginPasswordInput");

//Labels
const invalidEmailLogin = document.querySelector(".invalidEmailLogin");
const emailPasswordErrorLogin = document.querySelector(".emailPasswordErrorLogin");


loginEmailInput.addEventListener("input", () => {
    emailPasswordErrorLogin.classList.remove("active");
    invalidEmailLogin.classList.remove("active");
    enableLoginButton();
});

loginPasswordInput.addEventListener("input", () => {
    enableLoginButton();
});

loginEmailInput.addEventListener("input", () => {
    invalidEmailLogin.classList.remove("active");
    emailPasswordErrorLogin.classList.remove("active");
});

loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

btnLoginPopup.addEventListener("click", async () => {
    wrapper.classList.add("active-popup");
    clearLoginInputs();
});

loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    if(isValidEmail(loginEmailInput.value)){
        const result = await checkEmailAndPassword();
        if(!result){
            emailPasswordErrorLogin.classList.add("active");
        }
        else{
            //logged in
            clearLoginInputs();
            btnLoginPopup.classList.add("deactive");
            wrapper.classList.remove("active-popup");
            window.location.href = "/Frontend/userProfile.html";
        }
    } else {
        invalidEmailLogin.classList.add("active");
    }
});


function enableLoginButton(){
    if(loginEmailInput.value !== "" &&
        loginPasswordInput.value !== ""){
            loginBtn.disabled = false;
        }
        else{
            loginBtn.disabled = true;
        }
}

async function checkEmailAndPassword(){
    const obj = getLoginEmailAndPasswordObject();
    let exists = false;
    await axios.post(authServerUrl + "/login", obj)
    .then(function (response) {
      // handle success
      if(response.data.token){
          window.sessionStorage.setItem("email", loginEmailInput.value);
          window.sessionStorage.setItem("token", response.data.token);
          window.sessionStorage.setItem("name", response.data.name);
          window.localStorage.clear();
          exists = true;
      }
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error);
    });

    console.log(exists);
    return exists;
}

function getLoginEmailAndPasswordObject(){
    const obj = new Object();
    obj.email = loginEmailInput.value;
    obj.password = loginPasswordInput.value;
    return obj;
}

function clearLoginInputs(){
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
}