const logoImg = document.querySelector(".logoImgContainer");
const registerForm = document.querySelector(".registerForm");
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const repeatPasswordInput = document.querySelector("#repeatPassword");
const termsAndConditions = document.querySelector("#terms");
const existingUsers = localStorage.getItem("users")

const isEmpty = (inputsArray) => {
  return inputsArray.filter((input) => input.value === "" || !input.value);
};

const manageErrors = (array, msg) => {
  for (let input of array) {
    const errorElement = input.input.parentElement.children[1];
    if (input.input.id !== "terms") {
      errorElement.innerText = msg;
      errorElement.classList.remove("displayNone");
      errorElement.classList.add("inputError");
    } else {
      showModal("Acepta los terminos y condiciones");
      console.log("show modal");
    }
  }
};

const submitRegisterHandler = (e) => {
  e.preventDefault();

  const inputValues = [
    { value: nameInput.value.trim(), input: nameInput },
    { value: surnameInput.value.trim(), input: surnameInput },
    { value: emailInput.value.trim(), input: emailInput },
    { value: passwordInput.value.trim(), input: passwordInput },
    { value: repeatPasswordInput.value.trim(), input: repeatPasswordInput },
    { value: termsAndConditions.checked, input: termsAndConditions },
  ];
  // validacion general
  
  // email no valido
  const email = inputValues.filter(input => input.input.id === "email")
  console.log(email, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value))
  if(email.value !== "" && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)) {
    manageErrors(email, "Ingrese un mail válido")
  }
  
//  inputs vacios
  const emptyInput = isEmpty(inputValues);
  if (emptyInput.length > 0) {
    manageErrors(emptyInput, "El campo no debe estar vacío");
    return;
  }


  // contraseñas no coinciden


  // usuario repetido

  // guardar usuario

  // logearlo
};

(() => {
  logoImg.addEventListener("click", () => location.replace("./index.html"));
  registerForm.addEventListener("submit", submitRegisterHandler);
})();
