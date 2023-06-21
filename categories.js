// Elements
const categoriesContainer = document.querySelector(".categoriesContainer");
const logoImg = document.querySelector(".logoImgContainer");
const cartBubble = document.querySelector(".cartBubble");
const userLinks = document.querySelector(".userLinks");
const searchForm = document.querySelector(".searchBar");
const searchInput = document.querySelector("#searchBarInput");
const categoriesLink = document.querySelector("#categoriesLink");
const nextCategories = document.querySelector("#nextCategories");
const prevCategories = document.querySelector("#prevCategories");
const categoriesProductsContainer = document.querySelector(
  ".categoriesProductsContainer"
);
const categoryTitle = document.querySelector("#categoryTitle");
const categoriesTitle = document.querySelector("#categoriesTitle");
const cartIcon = document.querySelector("#cartIcon");

const init = async () => {
  if (currentUser.length > 0) {
    loadUserInfo(currentUser, userLinks);
    cartBubble.innerHTML = appState.shoppingCart.length;
  }
  const categories = await getCategories();
  const category = document.location.search.substring(1);
  const { results, filters } = await getCategoriesProducts(category);
  categoryTitle.innerHTML = filters[0].values[0].name;
  renderProducts(
    toRenderProducts(results),
    categoriesProductsContainer
  );
  renderCategories(toRenderCategories(categories), categoriesContainer);
  initializeCarousel(16, "categories");
  prevAvailable("categories") && prevCategories.classList.add("active");
  nextCategories.addEventListener("click", () =>
    nextCarousel(16, "categories", nextCategories, prevCategories)
  );
  prevCategories.addEventListener("click", () =>
    prevCarousel(16, "categories", nextCategories, prevCategories)
  );
  categoriesLink.addEventListener("click", () =>
    categoriesTitle.scrollIntoView({ behavior: "smooth" })
  );
  categoriesProductsContainer.addEventListener("click", (e) => {
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
      addToFavorites(e.target, category);
    }
  })
  categoriesContainer.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("cardCategory")) {
      selectCategory(e.target.parentElement.id);
    }
  });
  logoImg.addEventListener("click", () => location.replace("./index.html"));
  searchForm.addEventListener("submit", (e) => searchHandler(e, searchInput));
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
};

init();
