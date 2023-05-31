// const testButton = document.querySelector("#infoMl");

// const getInfo = async () => {
//   const data = await fetch("https://api.mercadolibre.com/sites/MLA");

//   const response = await data.json();
//   console.log(response);
// };

// testButton.addEventListener("click", getInfo);

// Elements
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const productsContainer = document.querySelector(".productsContainer");
const categoriesContainer = document.querySelector(".categoriesContainer");

const productsDisplay = products
  .map((product) => cardProduct(product))
  .join("");

productsContainer.innerHTML += productsDisplay;
const productsCarousel = [...productsContainer.children];

const categoriesDisplay = categories.map(category => cardCategory(category)).join("")
categoriesContainer.innerHTML += categoriesDisplay;

// init function
(() => {
  initializeCarousel(4);
  !prevAvailable() && prevButton.classList.add("displayNone");
  productsCarousel.length <= 4 && nextButton.classList.add("displayNone");
  nextButton.addEventListener("click", () => nextCarousel(4));
  prevButton.addEventListener("click", () => prevCarousel(4));
})();
