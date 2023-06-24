// Elements
const categoriesContainer = document.querySelector(".categoriesContainer");
const categoriesLink = document.querySelector("#categoriesLink");
const nextCategories = document.querySelector("#nextCategories");
const prevCategories = document.querySelector("#prevCategories");
const categoriesProductsContainer = document.querySelector(
  ".categoriesProductsContainer"
);
const categoryTitle = document.querySelector("#categoryTitle");
const categoriesTitle = document.querySelector("#categoriesTitle");

//init function
const init = async () => {
  isLogged(currentUser, loadUserInfo, userLinks, cartBubble, appState);
  //fetch productos
  const categories = await getCategories();
  const category = document.location.search.substring(1);
  const { results, filters } = await getCategoriesProducts(category);
  categoryTitle.innerHTML = filters[0].values[0].name;
  renderProducts(toRenderProducts(results), categoriesProductsContainer);
  renderCategories(toRenderCategories(categories), categoriesContainer);
  adaptCarousel(
    "categories",
    window.innerWidth,
    carouselCategories,
    initializeCarousel
  );
  prevAvailable("categories") && prevCategories.classList.add("active");
  nextCategories.addEventListener("click", () =>
    nextCarousel(
      carouselCategories(window.innerWidth),
      "categories",
      nextCategories,
      prevCategories
    )
  );
  prevCategories.addEventListener("click", () =>
    prevCarousel(
      carouselCategories(window.innerWidth),
      "categories",
      nextCategories,
      prevCategories
    )
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
  });
  categoriesContainer.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("cardCategory")) {
      selectCategory(e.target.parentElement.id);
    }
  });

  logoImg.addEventListener("click", () => location.replace("../index.html"));
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
  menuButton.addEventListener("click", () => {
    bottomHeader.classList.toggle("burgerMenu");
  });
  bottomHeader.addEventListener("click", (e) => {
    if(e.target.tagName === "A" || e.target.tagName === "LI" || e.target.tagName === "IMG"){
      bottomHeader.classList.toggle("burgerMenu")
    }
  })
  console.log(toTheTop, header)
  toTheTop.addEventListener("click", () => {
    header.scrollIntoView({behavior: "smooth"})
  })
};

init();
