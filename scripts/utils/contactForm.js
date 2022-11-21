


 const modal = document.getElementById("contact_modal");


function displayModal() {
   
	modal.style.display = "block";
  document.querySelector("#first").focus();
}

function closeModal() {
   
    modal.style.display = "none";
    document.querySelector(".contact_button").focus();
}

window.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    
    closeModal();
  }
})


//-------------modal---------------

const form = document.getElementById("contact-form");
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");
const regName = /^[a-zA-Z]{2,}$/;
const regEmail = /^[\w-\.]+@([a-zA-Z-]+\.)+[a-zA-Z]{2,4}$/;


function checkFirstName() {
   
  if (firstname.value.trim() === "" || !firstname.value.match(regName)) {
    firstname.parentElement.setAttribute("data-error-visible", true);
    firstname.style.border = "3px solid #e544858";
    return false;
  } else {
    firstname.parentElement.setAttribute("data-error-visible", false);
    firstname.style.border = "3px solid #279e7a";
    return true;
  }
  
}
function checkLastName() {
  if (lastname.value.trim() === "" || !lastname.value.match(regName)) {
    lastname.parentElement.setAttribute("data-error-visible", true);
    lastname.style.border = "3px solid #e544858";
    return false;
  } else {
    lastname.parentElement.setAttribute("data-error-visible", false);
    lastname.style.border = "3px solid #279e7a";
    return true;
  }
}
function checkEmail() {
  if (email.value.trim() === "" || !email.value.match(regEmail)) {
    email.parentElement.setAttribute("data-error-visible", true);
    email.style.border = "3px solid #e544858";
    return false;
  } else {
    email.parentElement.setAttribute("data-error-visible", false);
    email.style.border = "3px solid #279e7a";
    return true;
  }
}
function checkMessage() {
  if (
    message.value.trim() === '') {
    message.parentElement.setAttribute("data-error-visible", true);
     message.style.border = "3px solid #e54858";
      return false;
  } else {
  
  message.parentElement.setAttribute("data-error-visible", false);
  
  message.style.border = "3px solid #279e7a";
  return true;
}
}


firstname.addEventListener("change", checkFirstName);

lastname.addEventListener("change", checkLastName);

email.addEventListener("change", checkEmail);

//const btnEnvoyer = document.getElementsByClassName("contact_button");

function formValidation() {
  if (
    checkFirstName() === true &&
    checkLastName() === true &&
    checkEmail() === true &&
    checkMessage() === true
    
  ) {
    return true;
  } else {
    return false;
  }
}
function feildValidation() {
  checkFirstName();
  checkLastName();
  checkEmail();
 checkMessage();
}
 function modalSubmit() {

  console.log('Prénom : ' + firstname.value);
  console.log('Nom : ' + lastname.value);
  console.log('Email : ' + email.value);
  console.log('Message : ' + message.value);

  firstname.style.border = 'none';
  lastname.style.border = 'none';
  email.style.border = 'none';
  message.style.border = 'none';

  
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (formValidation() === true) {

    confirmationSubmit();
    modalSubmit();

    document.getElementById('contact-form').reset();
    

  } else {
    
    alert("Merci de bien remplir les champs du formulaire.");
    feildValidation();
  }
});

function confirmationSubmit() {
  alert("merci pour votre message.Nous vous répondrons dès que possible.")
  modal.style.display = "none";
  document.querySelector(".contact_button").focus();
}

