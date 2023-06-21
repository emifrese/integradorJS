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
const cartIcon = document.querySelector("#cartIcon");
const cartBubble = document.querySelector(".cartBubble");
const categoriesLink = document.querySelector("#categoriesLink");
const productsLink = document.querySelector("#productsLink");
const categoriesTitle = document.querySelector("#categoriesTitle");
const productsTitle = document.querySelector("#productsTitle");
const searchInput = document.querySelector("#searchBarInput");
const searchForm = document.querySelector(".searchBar");

// init function
const init = async () => {
  if (currentUser.length > 0) {
    loadUserInfo(currentUser, userLinks);
    cartBubble.innerHTML = appState.shoppingCart.length;
  }
  const dealProducts = await getDeals();
  renderProducts(toRenderProducts(dealProducts, "index"), productsContainer);
  const productsCarousel = [...productsContainer.children];
  const categories = await getCategories();
  renderCategories(toRenderCategories(categories), categoriesContainer);
  initializeCarousel(4, "products");
  initializeCarousel(16, "categories");
  !prevAvailable("products") && prevProduct.classList.add("displayNone");
  console.log(productsCarousel);
  productsCarousel.length <= 4 && nextProduct.classList.add("displayNone");
  nextProduct.addEventListener("click", () =>
    nextCarousel(4, "products", nextProduct, prevProduct)
  );
  prevProduct.addEventListener("click", () =>
    prevCarousel(4, "products", nextProduct, prevProduct)
  );
  prevAvailable("categories") && prevCategories.classList.add("active");
  nextCategories.addEventListener("click", () =>
    nextCarousel(16, "categories", nextCategories, prevCategories)
  );
  prevCategories.addEventListener("click", () =>
    prevCarousel(16, "categories", nextCategories, prevCategories)
  );
  logoImg.addEventListener("click", () => location.replace("./index.html"));
  cartIcon.addEventListener("click", () => {
    if (!appState.name) {
      location.replace("/login.html");
      return;
    }
    showCart();
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.addEventListener("click", (e) => modifyItems(e));
    cartContainer.addEventListener("submit", (e) => finishTransaction(e));
  });
  productsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("itemButton")) {
      if (!appState.name) {
        location.replace("/login.html");
        return;
      }
      editCart(e.target);
    }
    if (e.target.classList.contains("likeButton")) {
      if (!appState.name) {
        location.replace("/login.html");
        return;
      }
      addToFavorites(e.target, "products");
    }
  });
  categoriesContainer.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("cardCategory")) {
      selectCategory(e.target.parentElement.id);
    }
  });
  categoriesLink.addEventListener("click", () =>
    categoriesTitle.scrollIntoView({ behavior: "smooth" })
  );
  productsLink.addEventListener("click", () => {
    productsTitle.scrollIntoView({ behavior: "smooth" });
  });
  searchForm.addEventListener("submit", (e) => searchHandler(e, searchInput));
};

init();
