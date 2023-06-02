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

const productsDisplay = products
  .map((product) => cardProduct(product))
  .join("");

productsContainer.innerHTML += productsDisplay;
const productsCarousel = [...productsContainer.children];

const categoriesDisplay = categories
  .map((category) => cardCategory(category))
  .join("");
categoriesContainer.innerHTML += categoriesDisplay;
const categoriesCarousel = [...categoriesContainer.children];

// init function
(() => {
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
  !prevAvailable(categoriesCarousel) && prevCategories.classList.add("displayNone")
  nextCategories.addEventListener("click", () =>
    nextCarousel(16, categoriesCarousel, nextCategories, prevCategories)
  );
  prevCategories.addEventListener("click", () =>
    prevCarousel(16, categoriesCarousel, nextCategories, prevCategories)
  );
})();
