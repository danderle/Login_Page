const editWrapper = document.querySelector(".editwrapper");

//Buttons
const btnSave = document.querySelector(".btnSave");
const btnLogout = document.querySelector(".btnLogout");

//Inputs
const editNameInput = document.querySelector(".editNameInput");
const editEmailInput = document.querySelector(".editEmailInput");
const editPasswordInput = document.querySelector(".editPasswordInput");

//labels
const invalidEmailEdit = document.querySelector(".invalidEmailEdit");
const invalidPasswordEdit = document.querySelector(".invalidPasswordEdit");

window.onload = () => {
    const token = localStorage.getItem("token");
    if(token){

        editEmailInput.placeholder = localStorage.getItem("email");
        editNameInput.placeholder = localStorage.getItem("name");
        btnLogout.classList.remove("deactive");
        editWrapper.classList.add("active");
    }
    else{
        window.location.href = "./";
    }
};


btnLogout.addEventListener("click", () => {
    localStorage.clear();
    btnLogout.classList.add("deactive");
    window.location.href = "./";
});


btnSave.addEventListener("click", () => {
    const oldname = editNameInput.placeholder;
    const oldemail = editEmailInput.placeholder;
    const old = {name: oldname, email: oldemail};
    
    if(editPasswordInput.value){
        if(!isValidPassword(editPasswordInput.value)){
            invalidPasswordEdit.classList.add("active");
            return;
        }
    }
    
    if(editEmailInput.value){
        if(!isValidEmail(editEmailInput.value)){
            invalidEmailEdit.classList.add("active");
            return;
        }
    }

    saveUserData(old);
    btnSave.disabled = true;
});

editEmailInput.addEventListener("input", () => {
    invalidEmailEdit.classList.remove("active");
    enableSaveButton();
});

editPasswordInput.addEventListener("input", () => {
    invalidPasswordEdit.classList.remove("active");
    enableSaveButton();
});

editNameInput.addEventListener("input", () => {
    enableSaveButton();
});

function enableSaveButton(){
    if(editEmailInput.value !== "" ||
        editPasswordInput.value !== "" ||
        editNameInput.value !== ""){
            btnSave.disabled = false;
        }
        else{
            btnSave.disabled = true;
        }
}

async function saveUserData(old){
    const obj = getNameAndEmailObject();
    const bearer = "Bearer " + localStorage.getItem("token");
    console.log(bearer);
    const config = { headers: { Authorization: bearer}}
    await axios.put('http://localhost:5050/usersupdate', [old, obj], config )
    .then(function (response) {
      // handle success
        console.log(response.data);
        resetPlaceholders();
    })
    .catch(function (error) {
      // handle error
      console.log("error")
    });
}

function getNameAndEmailObject(){
    const obj = new Object();
    if(editEmailInput.value){
        obj.email = editEmailInput.value;
    }
    if(editNameInput.value){
        obj.name = editNameInput.value;
    }
    if(editPasswordInput.value){
        obj.password = editPasswordInput.value;
    }
    console.log(obj);
    return obj;
}

function resetPlaceholders(){
    if(editNameInput.value){
        editNameInput.placeholder = editNameInput.value;
        editNameInput.value = "";
    }
    if(editEmailInput.value){
        editEmailInput.placeholder = editEmailInput.value;
        editEmailInput.value = "";
    }
    editPasswordInput.value = "";
}