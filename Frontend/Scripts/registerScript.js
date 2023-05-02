//Buttons
const registerLink = document.querySelector(".register-link");
const btnRegister = document.querySelector(".btnRegister");

//Register Inputs
const registerNameInput = document.querySelector(".registerNameInput");
const registerEmailInput = document.querySelector(".registerEmailInput");
const registerPasswordInput = document.querySelector(".registerPasswordInput");

//labels
const emailExists = document.querySelector(".emailExists");
const invalidEmailRegister = document.querySelector(".invalidEmailRegister");
const invalidPasswordRegister = document.querySelector(".invalidPasswordRegister");

registerLink.addEventListener("click", () => {
    document.querySelector(".wrapper").classList.add("active");
});

btnRegister.addEventListener("click", async (event) => {
    event.preventDefault();

    if(isValidEmail(registerEmailInput.value)){
        if(isValidPassword(registerPasswordInput.value)){
            var val = await checkIfEmailExists();
            if(val){
                emailExists.classList.add("active");
            }
            else{
                registerNewUser();
                clearRegisterInputs();
            }
        } else {
            alert("Invalid password. Must be at least length 8, 1 number and 1 special character");
        }
    } else {
        invalidEmailRegister.classList.add("active");
    }
});

registerNameInput.addEventListener("input", () => {
    enableRegisterButton();
});

registerEmailInput.addEventListener("input", () => {
    emailExists.classList.remove("active");
    invalidEmailRegister.classList.remove("active");
    enableRegisterButton();
});

registerPasswordInput.addEventListener("input", () => {
    enableRegisterButton();
});

function enableRegisterButton(){
    if(registerNameInput.value !== "" &&
        registerEmailInput.value !== "" &&
        registerPasswordInput.value !== ""){
            btnRegister.disabled = false;
        }
        else{
            btnRegister.disabled = true;
        }
}

function registerNewUser(){
    const obj = getRegistrationObject();
    axios.post(serverUrl + "/register", obj)
    .then(function (response) {
      // handle success
      if(response.status != 200){
        alert("response status code " + response.status);
      }
      else{
        alert("Please login");
      }
    })
    .catch(function (error) {
      // handle error
      alert(error);
    });
}

function getRegistrationObject(){
    const obj = new Object();
    obj.name = registerNameInput.value;
    obj.email = registerEmailInput.value;
    obj.password = registerPasswordInput.value;
    return obj;
}

function getRegisterEmailObject(){
    const obj = new Object();
    obj.email = registerEmailInput.value;
    return obj;
}

async function checkIfEmailExists(){
    const obj = getRegisterEmailObject();
    let exists = true;
    await axios.post(serverUrl + "/userexists", obj)
    .then(function (response) {
      // handle success
      if(response.status != 200){
        alert("response status code " + response.status + response.data);
      }
      else{
        exists = response.data;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    }).finally();

    return exists;
}

function clearRegisterInputs(){
    registerNameInput.value = "";
    registerEmailInput.value = "";
    registerPasswordInput.value = "";
}
