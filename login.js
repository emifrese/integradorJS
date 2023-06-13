const logoImg = document.querySelector(".logoImgContainer");
const loginForm = document.querySelector(".loginForm");
const emailInput = document.querySelector("#email");
const buttonsContainer = document.querySelector(".loginButtons");
const continueButton = document.querySelector("#continue");
const createAccountButton = document.querySelector("#create");
const passwordLabel = document.createElement("label");
const passwordInput = document.createElement("input");
const loginButton = document.createElement("button");
const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

console.log(currentUser, currentUser.length)

passwordLabel.setAttribute("for", "password");
passwordLabel.innerText = "Contraseña";
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("name", "password");
passwordInput.setAttribute("id", "password");
passwordLabel.appendChild(passwordInput);

loginButton.setAttribute("type", "submit");
loginButton.innerText = "Ingresar";

let loginUserIndex;

// existe el usuario?
const existingUser = (input) => {
  const { value } = input;

  // input vacio
  if (value.trim() === "") {
    showModal("Debe ingresar su email");
    return;
  }

  // buscar usuario
  loginUserIndex = existingUsers.findIndex((user) => user.email === value);
  if (loginUserIndex === -1) {
    showModal("El email no se encuentra registrado");
    return;
  }

  const parentForm = buttonsContainer.parentNode;
  const parentButtons = continueButton.parentNode;

  emailInput.setAttribute("disabled", true);
  parentForm.insertBefore(passwordLabel, buttonsContainer);
  parentButtons.removeChild(continueButton);
  parentButtons.removeChild(createAccountButton);
  parentButtons.appendChild(loginButton);
};

const loginFormHandler = (e) => {
  e.preventDefault();

  // password input vacio

  const { value } = passwordInput;
  if (value.trim() === "") {
    showModal("Debe ingresar una contraseña");
    return;
  }

  // chequear que coincidan
  if (existingUsers[loginUserIndex].password !== value.trim()) {
    showModal("Contraseña Incorrecta");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify([existingUsers[loginUserIndex]])
  );
  location.replace("./index.html")
};

(() => {
  document.addEventListener(
    "DOMContentLoaded",
    () => currentUser.length > 0 && location.replace("./index.html")
  );
  logoImg.addEventListener("click", () => location.replace("./index.html"));
  continueButton.addEventListener("click", () => existingUser(emailInput));
  loginForm.addEventListener("submit", loginFormHandler);
})();
