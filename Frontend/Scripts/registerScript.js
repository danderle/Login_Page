//Buttons
const registerLink = document.querySelector(".register-link");


registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
    console.log("register");
});

btnRegister.addEventListener("click",async () => {
    console.log("register");
    if(IsValidEmail(registerEmailInput.value)){
        if(IsValidPassword(registerPasswordInput.value)){

            var val = await CheckIfEmailExists();
            if(val){
                emailExists.classList.add("active");
            }
            else{
                RegisterNewUser();
                ClearInputs();
            }
        } else {
            alert("Invalid password. Must be at least length 8, 1 number and 1 special character");
        }
    } else {
        invalidEmailRegister.classList.add("active");
    }
});

registerNameInput.addEventListener("input", () => {
    EnableRegisterButton();
});

registerEmailInput.addEventListener("input", () => {
    emailExists.classList.remove("active");
    invalidEmailRegister.classList.remove("active");
    EnableRegisterButton();
});

registerPasswordInput.addEventListener("input", () => {
    EnableRegisterButton();
});

function EnableRegisterButton(){
    if(registerNameInput.value !== "" &&
        registerEmailInput.value !== "" &&
        registerPasswordInput.value !== ""){
            btnRegister.disabled = false;
            console.log("enabled");
        }
        else{
            console.log("disabled");
            btnRegister.disabled = true;
        }
}

function RegisterNewUser(){
    var obj = GetRegistrationObject();
    axios.post('http://localhost:5050/users', obj)
    .then(function (response) {
      // handle success
      console.log(response);
      if(response.status != 200){
        alert("response status code " + response.status);
      }
      else{
        alert("Please login");
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      alert(error);
    });
}

function GetRegistrationObject(){
    var obj = new Object();
    obj.name = registerNameInput.value;
    obj.email = registerEmailInput.value;
    obj.password = registerPasswordInput.value;
    console.log(obj);
    return obj;
}

function GetRegisterEmailObject(){
    var obj = new Object();
    obj.email = registerEmailInput.value;
    console.log(obj);
    return obj;
}

async function CheckIfEmailExists(){
    var obj = GetRegisterEmailObject();
    var exists = true;
    await axios.post('http://localhost:5050/userexists', obj)
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
      console.log("error")
      console.log(error);
    });

    console.log(exists);
    return exists;
}
