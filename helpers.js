const cardProduct = ({
  id,
  title,
  thumbnail,
  price,
  original_price,
  seller,
}) => {
  return `<div class="cardProduct displayNone">
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
  return `<div id=${id} class="cardCategory displayNone">
              <figure>
                <img src="" alt="" />
                <figcaption>${name}</figcaption>
              </figure>
          </div>`;
};

const initializeCarousel = (n, carouselArray) => {
  let itemsPerPage = carouselArray.length < n ? carouselArray.length : n;
  for (let i = 0; i < itemsPerPage; i++) {
    carouselArray[i].classList.add("active");
  }
};

const nextCarousel = (n, carouselArray, nextButton, prevButton) => {
  const lastIndex = nextAvailable(carouselArray);
  if (lastIndex === carouselArray.length - 1) {
    return;
  }
  const itemsDif = carouselArray.length % n;
  let itemsPerPage = n;
  if (itemsDif !== 0 && carouselArray.length - 1 - lastIndex < n) {
    itemsPerPage = itemsDif;
  }
  prevButton.classList.remove("displayNone");
  for (let i = lastIndex + 1 - n; i <= itemsPerPage + lastIndex; i++) {
    if (i <= lastIndex) {
      carouselArray[i].classList.remove("active");
    } else {
      carouselArray[i].classList.add("active");
      if (i === carouselArray.length - 1) {
        nextButton.classList.add("displayNone");
      }
    }
  }
};

const prevCarousel = (n, carouselArray, nextButton, prevButton) => {
  const index = prevAvailable(carouselArray);
  if (!index) {
    return;
  }
  const lastPageItemsDif = (nextAvailable(carouselArray) + 1) % n;
  let lastPageItems = n;
  if (
    lastPageItemsDif !== 0 &&
    index + lastPageItemsDif === carouselArray.length
  ) {
    lastPageItems = lastPageItemsDif;
  }
  nextButton.classList.remove("displayNone");
  for (let i = index + lastPageItems - 1; i >= index - n; i--) {
    if (i >= index) {
      carouselArray[i].classList.remove("active");
    } else {
      carouselArray[i].classList.add("active");
      if (i === 0) {
        prevButton.classList.add("displayNone");
      }
    }
  }
};

const prevAvailable = (carouselArray) => {
  console.log(carouselArray);
  return carouselArray.findIndex((el) => el.className.includes("active"));
};

const nextAvailable = (carouselArray) => {
  console.log(carouselArray);
  return carouselArray.findLastIndex((el) => el.className.includes("active"));
};
