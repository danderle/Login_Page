//Buttons
const registerLink = document.querySelector(".register-link");
const btnRegister = document.querySelector(".btnRegister");
const emailExists = document.querySelector(".emailExists");
const invalidEmail = document.querySelector(".invalidEmail");

registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
    console.log("register");
});

btnRegister.addEventListener("click",async () => {
    if(IsValidEmail()){
        var val = await CheckIfEmailExists();
        if(val){
            emailExists.classList.add("active");
        }
        else{
            RegisterNewUser();
        }
    } else {
        
    }

});

registerEmail.addEventListener("input", () => {
    emailExists.classList.remove("active");
    invalidEmail.classList.remove("active");
});

function RegisterNewUser(){
    var obj = GetRegistrationObject();
    axios.post('http://localhost:5050/users', obj)
    .then(function (response) {
      // handle success
      console.log("success1")
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

function GetRegistrationObject(){
    var obj = new Object();
    obj.name = registerName.value;
    obj.email = registerEmail.value;
    obj.password = registerPassword.value;
    console.log(obj);
    return obj;
}

function GetEmailObject(){
    var obj = new Object();
    obj.email = registerEmail.value;
    console.log(obj);
    return obj;
}

function IsValidEmail(){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = registerEmail.value;
  if (email.match(validRegex)) {
    document.form1.text1.focus();
    return true;
    } else {
        invalidEmail.classList.add("active");
        return false;
    }
}

async function CheckIfEmailExists(){
    var obj = GetEmailObject();
    var exists = true;
    await axios.post('http://localhost:5050/findUser', obj)
    .then(function (response) {
      // handle success
        console.log(response.data.length);
        exists = response.data.length >= 1;
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error);
    });

    console.log(exists);
    return exists;
}
