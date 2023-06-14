const cardProduct = ({
  id,
  title,
  thumbnail,
  price,
  original_price,
  seller,
}) => {
  return `<div class="cardProduct displayNone">
            <img src=${thumbnail} alt="">
            <div class="productDescription">
            ${
              original_price
                ? `<p class="originalPrice">$${original_price}</p>`
                : ""
            }
                <strong>$${price}</strong>
                <p class="productTitle">${title}</p>
                <button class="itemButton">Agregar al carrito</button>
            </div>
          </div>`;
};

const cardCategory = ({ id, name }) => {
  return `<div id=${id} class="cardCategory displayNone">
                <a href="#">${name}</a>
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
  return carouselArray.findIndex((el) => el.className.includes("active"));
};

const nextAvailable = (carouselArray) => {
  return carouselArray.findLastIndex((el) => el.className.includes("active"));
};

const logoutHandler = () => {
  showModal("Usted esta saliendo de su cuenta");
  localStorage.removeItem("currentUser");
  setTimeout(() => location.reload(), 1500);
};

const loadUserInfo = (user, links) => {
  const welcomeButton = links.children[0];
  console.log(welcomeButton.children[0], user);
  welcomeButton.children[0].innerText = `Hola ${user[0].name}`;
  welcomeButton.children[0].removeAttribute("href");
  welcomeButton.children[0].style.cursor = "default";

  const logOutButton = links.children[1];
  logOutButton.children[0].innerText = "Salir";
  logOutButton.children[0].removeAttribute("href");
  logOutButton.addEventListener("click", logoutHandler);
};

const editCart = (addItem, cart) => {
  //chequear si ya esta en el carrito
  console.log(cart.some((item) => item.id === addItem.id));
};

const renderCartItems = (cartItems) => {
  return cartItems.map((item) => {
    const { id, title, price, amount, thumbnail } = item;
    return `
    <li>
      <div class="cartItemContainer">
        <div class="cartItemInfo">
          <p>${title}</p>
          <div class="amountContainer">
            ${amount > 1 ? "<button>-</button>" : ""}
            <p class="itemAmount">x${amount}</p>
            <button>+</button>
          </div>
        </div>
        <img
          src=${thumbnail}
          alt=""
        />
      </div>
      <p>$${amount * price}</p>
    </li>`;
  });
};

const showCart = (cartItems) => {
  const cartList = renderCartItems(cartItems);
  showModal(`
      <div class="cartContainer">
        <h2>Tu carrito</h2>
        <ul>
          ${cartList}
        </ul>      
      </div>
  `);
};
