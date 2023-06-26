// Elements
const nextProduct = document.querySelector("#nextProduct");
const prevProduct = document.querySelector("#prevProduct");
const productsContainer = document.querySelector(".productsContainer");
const nextCategories = document.querySelector("#nextCategories");
const prevCategories = document.querySelector("#prevCategories");
const categoriesContainer = document.querySelector(".categoriesContainer");
const categoriesLink = document.querySelector("#categoriesLink");
const productsLink = document.querySelector("#productsLink");
const categoriesTitle = document.querySelector("#categoriesTitle");
const productsTitle = document.querySelector("#productsTitle");


// init function
const init = async () => {
  isLogged(currentUser, loadUserInfo, userLinks, cartBubble, appState);
  //fetch productos y categorias
  const dealProducts = await getDeals();
  renderProducts(toRenderProducts(dealProducts, "index"), productsContainer);
  const productsCarousel = [...productsContainer.children];
  const categories = await getCategories();
  renderCategories(toRenderCategories(categories), categoriesContainer);
  // inicializa los carruseles
  adaptCarousel(
    "products",
    window.innerWidth,
    carouselProducts,
    initializeCarousel
  );
  adaptCarousel(
    "categories",
    window.innerWidth,
    carouselCategories,
    initializeCarousel
  );
  window.addEventListener("resize", (e) => {
    const { innerWidth } = e.target;
    initializeCarousel("reset", "products");
    initializeCarousel("reset", "categories");
    adaptCarousel("products", innerWidth, carouselProducts, initializeCarousel);
    adaptCarousel(
      "categories",
      innerWidth,
      carouselCategories,
      initializeCarousel
    );
  });
  !prevAvailable("products") && prevProduct.classList.add("displayNone");
  productsCarousel.length <= carouselProducts(window.innerWidth) &&
    nextProduct.classList.add("displayNone");
  nextProduct.addEventListener("click", () =>
    nextCarousel(
      carouselProducts(window.innerWidth),
      "products",
      nextProduct,
      prevProduct
    )
  );
  prevProduct.addEventListener("click", () =>
    prevCarousel(
      carouselProducts(window.innerWidth),
      "products",
      nextProduct,
      prevProduct
    )
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
  productsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("itemButton")) {
      checkLogStatus()
      editCart(e.target);
    }
    if (e.target.classList.contains("likeButton")) {
      checkLogStatus()
      addToFavorites(e.target, "index");
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

  logoImg.addEventListener("click", () => location.replace("./index.html"));
  searchForm.addEventListener("submit", (e) => searchHandler(e, searchInput));
  cartIcon.addEventListener("click", () => {
    checkLogStatus();
    appState.name.length > 0 && showCart();
    const cartContainer = document.querySelector(".cartContainer");
    cartContainer.addEventListener("click", (e) => modifyItems(e));
    cartContainer.addEventListener("submit", (e) => {
      setTimeout(() => {
        location.reload()
      },1500)
      finishTransaction(e)
    });
  });
  menuButton.addEventListener("click", () => {
    bottomHeader.classList.toggle("burgerMenu");
  });
  bottomHeader.addEventListener("click", (e) => {
    if(e.target.tagName === "A" || e.target.tagName === "LI" || e.target.tagName === "IMG"){
      bottomHeader.classList.toggle("burgerMenu")
    }
  })
  toTheTop.addEventListener("click", () => {
    header.scrollIntoView({behavior: "smooth"})
  })
};

init();
