// Elements
const resultsContainer = document.querySelector(".resultsContainer");
const headerButtons = document.querySelector(".headerButtons")

//init function
const init = async () => {
  isLogged(currentUser, loadUserInfo, userLinks, cartBubble, appState);
  //fetch productos
  const search = document.location.search.substring(1);
  const products = await searchProducts(search);
  renderProducts(toRenderProducts(products), resultsContainer);
  searchForm.addEventListener("submit", (e) => searchHandler(e, searchInput));
  resultsContainer.addEventListener("click", (e) => {
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
      addToFavorites(e.target, "results");
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
  menuButton.addEventListener("click", () => {
    bottomHeader.classList.toggle("burgerMenu");
    headerButtons.classList.add("displayNone")
  });
  bottomHeader.addEventListener("click", (e) => {
    if (
      e.target.tagName === "A" ||
      e.target.tagName === "LI" ||
      e.target.tagName === "IMG"
    ) {
      bottomHeader.classList.toggle("burgerMenu");
    }
  });
};

init();
