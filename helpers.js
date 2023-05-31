const cardProduct = ({
  id,
  title,
  thumbnail,
  price,
  original_price,
  seller,
}) => {
  return `<div class="cardProduct">
            <h2>${title}</h2>
            ${
              original_price
                ? `<p class="originalPrice">${original_price}</p>`
                : ""
            }
            <img src=${thumbnail} alt="">
            <div class="productDescription">
                <strong>${price}</strong>
                <p>Monitor gamer Philips V221V8 LCD 21.5" negro 100V/240V</p>
            </div>
          </div>`;
};

const cardCategory = ({ id, name }) => {
  return `<div id=${id} class="cardCategory">
              <figure>
                <img src="" alt="" />
                <figcaption>${name}</figcaption>
              </figure>
          </div>`;
};

const initializeCarousel = (n) => {
  let itemsPerPage = productsCarousel.length < n ? productsCarousel.length : n;
  for (let i = 0; i < itemsPerPage; i++) {
    productsCarousel[i].classList.add("active");
  }
};

const nextCarousel = (n) => {
  const lastIndex = nextAvailable();
  if (lastIndex === productsCarousel.length - 1) {
    return;
  }
  const itemsDif = productsCarousel.length % n;
  let itemsPerPage = n;
  if (itemsDif !== 0 && productsCarousel.length - 1 - lastIndex < n) {
    itemsPerPage = itemsDif;
  }
  prevButton.classList.remove("displayNone");
  for (let i = lastIndex + 1 - n; i <= itemsPerPage + lastIndex; i++) {
    if (i <= lastIndex) {
      productsCarousel[i].classList.remove("active");
    } else {
      productsCarousel[i].classList.add("active");
      if (i === productsCarousel.length - 1) {
        nextButton.classList.add("displayNone");
      }
    }
  }
};

const prevCarousel = (n) => {
  const index = prevAvailable();
  if (!index) {
    return;
  }
  const lastPageItemsDif = (nextAvailable() + 1) % n;
  let lastPageItems = n;
  if (
    lastPageItemsDif !== 0 &&
    index + lastPageItemsDif === productsCarousel.length
  ) {
    lastPageItems = lastPageItemsDif;
  }
  nextButton.classList.remove("displayNone");
  for (let i = index + lastPageItems - 1; i >= index - n; i--) {
    if (i >= index) {
      productsCarousel[i].classList.remove("active");
    } else {
      productsCarousel[i].classList.add("active");
      if (i === 0) {
        prevButton.classList.add("displayNone");
      }
    }
  }
};

const prevAvailable = () => {
  console.log(productsCarousel);
  return productsCarousel.findIndex((el) => el.className.includes("active"));
};

const nextAvailable = () => {
  return productsCarousel.findLastIndex((el) =>
    el.className.includes("active")
  );
};
