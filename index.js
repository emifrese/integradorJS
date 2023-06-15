// const testButton = document.querySelector("#infoMl");

// const getInfo = async () => {
//   const data = await fetch("https://api.mercadolibre.com/sites/MLA");

//   const response = await data.json();
//   console.log(response);
// };

// testButton.addEventListener("click", getInfo);

// Elements
const nextProduct = document.querySelector("#nextProduct");
const prevProduct = document.querySelector("#prevProduct");
const productsContainer = document.querySelector(".productsContainer");
const nextCategories = document.querySelector("#nextCategories");
const prevCategories = document.querySelector("#prevCategories");
const categoriesContainer = document.querySelector(".categoriesContainer");
const logoImg = document.querySelector(".logoImgContainer");
const userLinks = document.querySelector(".userLinks");
const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
const cartIcon = document.querySelector("#cartIcon");
const cartBubble = document.querySelector(".cartBubble");

const productsDisplay = products
  .map((product) => cardProduct(product))
  .join("");

productsContainer.innerHTML += productsDisplay;
const productsCarousel = [...productsContainer.children];

const categoriesDisplay = categories
  .sort((a, b) => parseInt(a.id.slice(3)) - parseInt(b.id.slice(3)))
  .map((category) => cardCategory(category))
  .join("");
categoriesContainer.innerHTML += categoriesDisplay;
const categoriesCarousel = [...categoriesContainer.children];

const appState = {
  name: currentUser.length > 0 ? currentUser[0].name : null,
  shoppingCart: currentUser.length > 0 ? currentUser[0].shoppingCart : null,
  likes: currentUser.length > 0 ? currentUser[0].likes : null,
};
// init function
(() => {
  if (currentUser.length > 0) {
    loadUserInfo(currentUser, userLinks);
    cartBubble.innerHTML = appState.shoppingCart.length;
  }
  initializeCarousel(4, productsCarousel);
  initializeCarousel(16, categoriesCarousel);
  !prevAvailable(productsCarousel) && prevProduct.classList.add("displayNone");
  productsCarousel.length <= 4 && nextProduct.classList.add("displayNone");
  nextProduct.addEventListener("click", () =>
    nextCarousel(4, productsCarousel, nextProduct, prevProduct)
  );
  prevProduct.addEventListener("click", () =>
    prevCarousel(4, productsCarousel, nextProduct, prevProduct)
  );
  !prevAvailable(categoriesCarousel) &&
    prevCategories.classList.add("displayNone");
  nextCategories.addEventListener("click", () =>
    nextCarousel(16, categoriesCarousel, nextCategories, prevCategories)
  );
  prevCategories.addEventListener("click", () =>
    prevCarousel(16, categoriesCarousel, nextCategories, prevCategories)
  );
  logoImg.addEventListener("click", () => location.replace("./index.html"));
  cartIcon.addEventListener("click", () => {
    showCart();
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.addEventListener("click", (e) => modifyItems(e));
  });
  productsContainer.addEventListener("click", (e) => editCart(e.target));
})();
