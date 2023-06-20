// const testButton = document.querySelector("#infoMl");

// const getInfo = async () => {
//   const data = await fetch("https://api.mercadolibre.com/sites/MLA");

//   const response = await data.json();
//   console.log(response);
// };

// testButton.addEventListener("click", getInfo);

// localStorage

const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

// appstate

const appState = {
  name: currentUser.length > 0 ? currentUser[0].name : null,
  shoppingCart: currentUser.length > 0 ? currentUser[0].shoppingCart : null,
  likes: currentUser.length > 0 ? currentUser[0].likes : null,
  itemsBought: currentUser.length > 0 ? currentUser[0].itemsBought : null,
};

// Elements
const nextProduct = document.querySelector("#nextProduct");
const prevProduct = document.querySelector("#prevProduct");
const productsContainer = document.querySelector(".productsContainer");
const nextCategories = document.querySelector("#nextCategories");
const prevCategories = document.querySelector("#prevCategories");
const categoriesContainer = document.querySelector(".categoriesContainer");
const logoImg = document.querySelector(".logoImgContainer");
const userLinks = document.querySelector(".userLinks");
const cartIcon = document.querySelector("#cartIcon");
const cartBubble = document.querySelector(".cartBubble");
const categoriesLink = document.querySelector("#categoriesLink");
const productsLink = document.querySelector("#productsLink");
const categoriesTitle = document.querySelector("#categoriesTitle");
const productsTitle = document.querySelector("#productsTitle");

productsContainer.innerHTML = toRenderProducts(products);
const productsCarousel = [...productsContainer.children];
console.log(productsContainer)
const categoriesDisplay = categories
  .sort((a, b) => parseInt(a.id.slice(3)) - parseInt(b.id.slice(3)))
  .map((category) => cardCategory(category))
  .join("");
categoriesContainer.innerHTML += categoriesDisplay;
// init function
(() => {
  if (currentUser.length > 0) {
    loadUserInfo(currentUser, userLinks);
    cartBubble.innerHTML = appState.shoppingCart.length;
  }
  initializeCarousel(4, "products");
  initializeCarousel(16, "categories");
  !prevAvailable("products") && prevProduct.classList.add("displayNone");
  productsCarousel.length <= 4 && nextProduct.classList.add("displayNone");
  nextProduct.addEventListener("click", () =>
    nextCarousel(4, "products", nextProduct, prevProduct)
  );
  prevProduct.addEventListener("click", () =>
    prevCarousel(4, "products", nextProduct, prevProduct)
  );
  !prevAvailable("categories") &&
    prevCategories.classList.add("displayNone");
  nextCategories.addEventListener("click", () =>
    nextCarousel(16, "categories", nextCategories, prevCategories)
  );
  prevCategories.addEventListener("click", () =>
    prevCarousel(16, "categories", nextCategories, prevCategories)
  );
  logoImg.addEventListener("click", () => location.replace("./index.html"));
  cartIcon.addEventListener("click", () => {
    showCart();
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.addEventListener("click", (e) => modifyItems(e));
    cartContainer.addEventListener("submit", (e) => finishTransaction(e));
  });
  productsContainer.addEventListener("click", (e) => {
    console.log('click')
    if (e.target.classList.contains("itemButton")) {
      editCart(e.target);
    }
    if (e.target.classList.contains("likeButton")) {
      addToFavorites(e.target);
    }
  });
  categoriesLink.addEventListener("click", () =>
    categoriesTitle.scrollIntoView({ behavior: "smooth" })
  );
  productsLink.addEventListener("click", () => {
    productsTitle.scrollIntoView({ behavior: "smooth" });
  });
})();
