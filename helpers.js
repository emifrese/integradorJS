const cardProduct = ({ id, title, thumbnail, price, original_price }) => {
  //chequear si esta en favoritos
  const isLiked = appState.likes.some((itemLiked) => itemLiked === id);
  console.log(isLiked);
  return `<div class="cardProduct displayNone">
            <img src="./assets/images/like.svg" alt="like-button" class="likeButton" data-id=${id} ${
    isLiked && "style='opacity: 1'"
  } />
            <img src=${thumbnail} alt="product" class="productImg">
            <div class="productDescription">
            ${
              original_price
                ? `<p class="originalPrice">$${original_price}</p>`
                : ""
            }
                <strong>$${price}</strong>
                <p class="productTitle">${title}</p>
                <button 
                class="itemButton" 
                data-id=${id} 
                data-title=${title.replaceAll(" ", "-")}
                data-price=${price}
                data-img=${thumbnail}
                >Agregar al carrito</button>
            </div>
          </div>`;
};

const selectCarousel = (type) =>
  type === "products"
    ? [...productsContainer.children]
    : [...categoriesContainer.children];

const toRenderProducts = (products) => {
  return products.map((product) => cardProduct(product)).join("");
};

const renderProducts = (productsToRender, container) => {
  container.innerHTML = productsToRender;
};

const cardCategory = ({ id, name }) => {
  return `<div id=${id} class="cardCategory displayNone">
                <a href="#">${name}</a>
          </div>`;
};

const initializeCarousel = (n, type) => {
  const carouselArray = selectCarousel(type);
  let itemsPerPage = carouselArray.length < n ? carouselArray.length : n;
  console.log(itemsPerPage);
  for (let i = 0; i < itemsPerPage; i++) {
    carouselArray[i].classList.add("active");
  }
};

const nextCarousel = (n, type, nextButton, prevButton) => {
  const carouselArray = selectCarousel(type)
  const lastIndex = nextAvailable(type);
  console.log(carouselArray, lastIndex);
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

const prevCarousel = (n, type, nextButton, prevButton) => {
  const carouselArray = selectCarousel(type);
  const index = prevAvailable(type);
  if (!index) {
    return;
  }
  const lastPageItemsDif = (nextAvailable(type) + 1) % n;
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

const prevAvailable = (type) => {
  const carouselArray = selectCarousel(type);
  return carouselArray.findIndex((el) => el.className.includes("active"));
};

const nextAvailable = (type) => {
  const carouselArray = selectCarousel(type);
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

const editCart = (addItem) => {
  if (!addItem.classList.contains("itemButton")) return;
  let newCart;
  let itemIndex = appState.shoppingCart.findIndex(
    (item) => parseInt(item.id) === parseInt(addItem.dataset.id)
  );
  if (itemIndex !== -1) {
    newCart = [...appState.shoppingCart];
    newCart[itemIndex] = {
      ...newCart[itemIndex],
      amount: newCart[itemIndex].amount + 1,
    };
  } else {
    const { title, price, id, img } = addItem.dataset;
    newCart = [
      ...appState.shoppingCart,
      {
        title,
        price,
        id: parseInt(id),
        img,
        amount: 1,
      },
    ];
  }
  // hacemos la copia con la modificacion del currentUser
  const newUserInfo = [{ ...currentUser[0], shoppingCart: newCart }];
  // hacemos la copia con la modificacion de usuarios
  const userIndex = existingUsers.findIndex(
    (user) => user.email === currentUser[0].email
  );
  const newUsersInfo = [...existingUsers];
  newUsersInfo[userIndex] = newUserInfo[0];
  // actualizamos la informacion en el localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  localStorage.setItem("users", JSON.stringify(newUsersInfo));
  // actualizamos el appState
  appState.shoppingCart = newCart;
  // actualizamos el bubble cart
  cartBubble.innerHTML = appState.shoppingCart.length;
};

const renderCartItems = () => {
  const cartList = document.querySelector(".cartList");
  const cartContainer = document.querySelector(".cartContainer");
  cartBubble.innerHTML = appState.shoppingCart.length;
  if (appState.shoppingCart.length < 1) {
    cartList.innerHTML = "<p>Elige items para comprar</p>";
    if (cartContainer.children.length > 2) {
      cartContainer.removeChild(cartContainer.lastElementChild);
    }
    return;
  }
  cartList.innerHTML = appState.shoppingCart
    .map((item) => {
      const { id, title, price, amount, img } = item;
      const newTitle = `${title.replaceAll("-", " ").substring(0, 30)}...`;
      return `
    <li>
      <div class="cartItemContainer">
        <div class="cartItemInfo">
          <p>${newTitle}</p>
          <div class="amountContainer">
            ${
              amount > 1
                ? `<button class="button-quantity" data-type="negative" data-id=${id} type="button">-</button>`
                : `<button class="button-quantity" type="button"><img src="./assets/images/trash.svg" class="deleteItem" data-type="delete" data-id=${id} /></button>`
            }
            <p class="itemAmount">x${amount}</p>
            <button class="button-quantity" data-type="positive" data-id=${id} type="button">+</button>
          </div>
        </div>
        <img
          src=${img}
          alt=""
          class="cartItemImg"
        />
      </div>
      <p>$${amount * price}</p>
    </li>`;
    })
    .join("");
  if (cartContainer.children.length < 3) {
    cartContainer.innerHTML +=
      '<button type="submit" class="cartBuyButton">Comprar</button>';
  }
};

const showCart = () => {
  showModal(`
  <form class="cartContainer">
  <h2>Tu carrito</h2>
  <ul class="cartList">
  </ul>      
  </form>
  `);
  renderCartItems();
};

const modifyItems = (e) => {
  const { id, type } = e.target.dataset;
  if (!id) return;
  console.log("it passed");
  const itemIndex = appState.shoppingCart.findIndex(
    (item) => item.id === parseInt(id)
  );
  let newCart = [...appState.shoppingCart];
  if (type === "positive") {
    newCart[itemIndex] = {
      ...newCart[itemIndex],
      amount: newCart[itemIndex].amount + 1,
    };
  } else if (type === "negative") {
    newCart[itemIndex] = {
      ...newCart[itemIndex],
      amount: newCart[itemIndex].amount - 1,
    };
  } else {
    newCart = newCart.filter((item) => item.id !== parseInt(id));
  }
  // hacemos la copia con la modificacion del currentUser
  const newUserInfo = [{ ...currentUser[0], shoppingCart: newCart }];
  // hacemos la copia con la modificacion de usuarios
  const userIndex = existingUsers.findIndex(
    (user) => user.email === currentUser[0].email
  );
  const newUsersInfo = [...existingUsers];
  newUsersInfo[userIndex] = newUserInfo[0];
  // actualizamos la informacion en el localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  localStorage.setItem("users", JSON.stringify(newUsersInfo));
  // actualizamos el appState
  appState.shoppingCart = newCart;
  // renderizamos el cambio
  renderCartItems();
};

const finishTransaction = (e) => {
  e.preventDefault();
  console.log("finish transaction");

  // historial comprados
  // sino existe agregar
  appState.shoppingCart.forEach((item) => {
    if (
      appState.itemsBought.findIndex(
        (itemBought) => itemBought.id === item.id
      ) === -1
    ) {
      const itemCopy = { ...item };
      delete itemCopy.amount;
      appState.itemsBought.push(itemCopy);
    }
  });

  // actualizar localStorage
  // hacemos la copia con la modificacion del currentUser
  const newUserInfo = [
    { ...currentUser[0], shoppingCart: [], itemsBought: appState.itemsBought },
  ];
  // hacemos la copia con la modificacion de usuarios
  const userIndex = existingUsers.findIndex(
    (user) => user.email === currentUser[0].email
  );
  const newUsersInfo = [...existingUsers];
  newUsersInfo[userIndex] = newUserInfo[0];
  // actualizamos la informacion en el localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  localStorage.setItem("users", JSON.stringify(newUsersInfo));
  // vaciar carrito en el appstate
  appState.shoppingCart = [];
  // actualizamos el bubble cart
  cartBubble.innerHTML = appState.shoppingCart.length;
  // mensaje de compra realizada
  showModal("<p>Compra realizada</p>");
};

const addToFavorites = (e) => {
  const { id } = e.dataset;

  //chequeamos si esta en la lista de likes
  const itemIndex = appState.likes.findIndex(
    (itemLikedId) => parseInt(itemLikedId) === parseInt(id)
  );
  console.log(itemIndex);
  let newLikes;
  //removemos
  if (itemIndex !== -1) {
    newLikes = appState.likes.filter(
      (itemLikedId) => parseInt(itemLikedId) !== parseInt(id)
    );
  } else {
    //agregamos
    appState.likes.push(parseInt(id));
    newLikes = [...appState.likes];
  }

  // actualizamos localStorage
  // hacemos la copia con la modificacion del currentUser
  const newUserInfo = [{ ...currentUser[0], likes: newLikes }];
  // hacemos la copia con la modificacion de usuarios
  const userIndex = existingUsers.findIndex(
    (user) => user.email === currentUser[0].email
  );
  const newUsersInfo = [...existingUsers];
  newUsersInfo[userIndex] = newUserInfo[0];
  // actualizamos la informacion en el localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  localStorage.setItem("users", JSON.stringify(newUsersInfo));
  // actualizamos appstate
  appState.likes = newLikes;

  renderProducts(toRenderProducts(products), productsContainer);
  initializeCarousel(4, "products");
};
