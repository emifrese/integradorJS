const logoImg = document.querySelector(".logoImgContainer");
const loginForm = document.querySelector(".loginForm");
const emailInput = document.querySelector("#email");
const buttonsContainer = document.querySelector(".loginButtons");
const continueButton = document.querySelector("#continue");
const createAccountButton = document.querySelector("#create");
const passwordLabel = document.createElement("label");
const passwordInput = document.createElement("input");
const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

passwordLabel.setAttribute("for", "password");
passwordLabel.innerText = "Contraseña";
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("name", "password");
passwordInput.setAttribute("id", "password");
passwordLabel.appendChild(passwordInput);
createAccountButton.addEventListener("click", () => location.replace("./signup.html"));

let loginUserIndex;
let timesPassed = 0;

const loginFormHandler = (e) => {
  e.preventDefault();
  if (timesPassed < 1) {
    const emailValue = emailInput.value;

    // input vacio
    if (emailValue.trim() === "") {
      showModal("Debe ingresar su email");
      return;
    }

    // buscar usuario
    loginUserIndex = existingUsers.findIndex(
      (user) => user.email === emailValue
    );
    if (loginUserIndex === -1) {
      showModal("El email no se encuentra registrado");
      return;
    }
    const parentForm = buttonsContainer.parentNode;
    const parentButtons = continueButton.parentNode;

    emailInput.setAttribute("disabled", true);
    parentForm.insertBefore(passwordLabel, buttonsContainer);
    parentButtons.children[0].innerHTML = "Ingresar";
    parentButtons.removeChild(createAccountButton);
  }

  timesPassed += 1;

  //chequeo que el email ya fue verificado

  if (timesPassed < 2) return;

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
  location.replace("../index.html");
};

(() => {
  document.addEventListener(
    "DOMContentLoaded",
    () => currentUser.length > 0 && location.replace("../index.html")
  );
  logoImg.addEventListener("click", () => location.replace("../index.html"));
  // continueButton.addEventListener("click", () => existingUser(emailInput));
  loginForm.addEventListener("submit", loginFormHandler);
})();
