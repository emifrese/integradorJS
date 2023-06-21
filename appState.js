// localStorage

const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

// appstate

const appState = {
  name: currentUser.length > 0 ? currentUser[0].name : null,
  shoppingCart: currentUser.length > 0 ? currentUser[0].shoppingCart : [],
  likes: currentUser.length > 0 ? currentUser[0].likes : [],
  itemsBought: currentUser.length > 0 ? currentUser[0].itemsBought : [],
};