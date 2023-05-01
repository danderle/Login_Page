//Buttons
const btnSave = document.querySelector(".btnSave");

btnSave.addEventListener("click", () => {
    var oldname = editNameInput.placeholder;
    var oldemail = editEmailInput.placeholder;

    console.log(oldname);
    console.log(oldemail);
    if(editNameInput.value){
        var temp = editEmailInput.value;
        editNameInput.placeholder = temp;
    }

    if(editEmailInput.value){
        if(IsValidEmail(editEmailInput.value)){
            editEmailInput.placeholder = editEmailInput.value;
        } else {
            invalidEmailEdit.classList.add("active");
        }
    }

    if(IsValidPassword(editPasswordInput.value)){

    } else {
        invalidPasswordEdit.classList.add("active");
    }

    SaveUserData();
    btnSave.disabled = true;
});

editEmailInput.addEventListener("input", () => {
    invalidEmailEdit.classList.remove("active");
    EnableSaveButton();
});

editPasswordInput.addEventListener("input", () => {
    invalidPasswordEdit.classList.remove("active");
    EnableSaveButton();
});

editNameInput.addEventListener("input", () => {
    EnableSaveButton();
});

function EnableSaveButton(){
    if(editEmailInput.value !== "" ||
        editPasswordInput.value !== "" ||
        editNameInput.value !== ""){
            btnSave.disabled = false;
        }
        else{
            btnSave.disabled = true;
        }
}

async function SaveUserData(){
    var obj = GetNameAndEmailObject();
    await axios.post('http://localhost:5050/usersupdate', obj)
    .then(function (response) {
      // handle success
        console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log("error")
    });
}

function GetNameAndEmailObject(){
    var obj = new Object();
    obj.email = editEmailInput.value;
    obj.name = editNameInput.value;
    console.log(obj);
    return obj;
}