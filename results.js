// Elements
const resultsContainer = document.querySelector(".resultsContainer");
const searchInput = document.querySelector("#searchBarInput");
const searchForm = document.querySelector(".searchBar");
const logoImg = document.querySelector(".logoImgContainer");
const cartBubble = document.querySelector(".cartBubble");
const userLinks = document.querySelector(".userLinks");

//init function
const init = async () => {
  if (currentUser.length > 0) {
    loadUserInfo(currentUser, userLinks);
    cartBubble.innerHTML = appState.shoppingCart.length;
  }
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
};

init();
