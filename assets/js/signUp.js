const logoImg = document.querySelector(".logoImgContainer");
const registerForm = document.querySelector(".registerForm");
const loginButton = document.querySelector(".loginButton");
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const repeatPasswordInput = document.querySelector("#repeatPassword");
const termsAndConditions = document.querySelector("#terms");

const isEmpty = (inputsArray) => {
  return inputsArray.map((input) =>
    input.value === "" || !input.value
      ? { ...input, isError: true }
      : { ...input, isError: false }
  );
};

const manageErrors = (array, msg) => {
  for (let input of array) {
    const errorElement = input.input.parentElement.children[1];
    if (input.isError) {
      if (input.input.id !== "terms") {
        errorElement.innerText = msg;
        errorElement.classList.remove("displayNone");
        errorElement.classList.add("inputError");
      } else {
        showModal("Acepta los terminos y condiciones");
      }
    } else {
      if (input.input.id !== "terms") {
        errorElement.innerText = "";
        errorElement.classList.add("displayNone");
        errorElement.classList.remove("inputError");
      }
    }
  }
};

const submitRegisterHandler = (e) => {
  e.preventDefault();
  // let validForm = false;

  const inputValues = [
    { value: nameInput.value.trim(), input: nameInput },
    { value: surnameInput.value.trim(), input: surnameInput },
    { value: emailInput.value.trim(), input: emailInput },
    { value: passwordInput.value.trim(), input: passwordInput },
    { value: repeatPasswordInput.value.trim(), input: repeatPasswordInput },
    { value: termsAndConditions.checked, input: termsAndConditions },
  ];

  const password = inputValues.filter((input) => input.input.id === "password");
  const repeatPassword = inputValues.filter(
    (input) => input.input.id === "repeatPassword"
  );
  const email = inputValues.filter((input) => input.input.id === "email");
  // validacion general

  //  inputs vacios
  const emptyInput = isEmpty(inputValues);
  if (emptyInput.length > 0) {
    manageErrors(emptyInput, "El campo no debe estar vacío");
    if (emptyInput.some((input) => input.isEmpty)) {
      return;
    }
  }
  // email no valido
  if (
    email[0].value !== "" &&
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email[0].value)
  ) {
    manageErrors([{ ...email[0], isError: true }], "Ingrese un mail válido");
    return;
  }
  // contraseñas no coinciden
  if (password[0].value !== repeatPassword[0].value) {
    manageErrors(
      [
        { ...password[0], isError: true },
        { ...repeatPassword[0], isError: true },
      ],
      "Las contraseñas no coinciden"
    );
    return;
  }
  // usuario repetido
  if (
    existingUsers.length > 0 &&
    existingUsers.find((user) => user.email === email[0].value)
  ) {
    manageErrors(
      [{ ...email[0], isError: true }],
      "Ese email ya fue utilizado"
    );
    return;
  }

  // guardar usuario
  const newUser = {
    name: inputValues[0].value,
    surname: inputValues[1].value,
    email: email[0].value,
    password: password[0].value,
    shoppingCart: [],
    likes: [],
    itemsBought: [],
  };

  const newUsersArray = [...existingUsers, newUser];

  localStorage.setItem("users", JSON.stringify(newUsersArray));

  // logearlo
  location.replace("./login.html");
};

(() => {
  appState.name && location.replace("../../index.html");
  logoImg.addEventListener("click", () => location.replace("../../index.html"));
  registerForm.addEventListener("submit", submitRegisterHandler);
  loginButton.addEventListener("click", () =>
    location.replace("../../pages/login.html")
  );
})();
