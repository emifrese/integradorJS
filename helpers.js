const cardProduct = ({ id, title, thumbnail, price, original_price }) => {
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
                ? `<button class="button-quantity" data-type="negative" data-id=${id}>-</button>`
                : `<button class="button-quantity" data-type="delete" data-id=${id}><img src="./assets/images/trash.svg"/></button>}`
            }
            <p class="itemAmount">x${amount}</p>
            <button class="button-quantity" data-type="positive" data-id=${id}>+</button>
          </div>
        </div>
        <img
          src=${img}
          alt=""
        />
      </div>
      <p>$${amount * price}</p>
    </li>`;
    })
    .join("");
  cartBubble.innerHTML = appState.shoppingCart.length;
};

const showCart = () => {
  showModal(`
  <div class="cartContainer">
  <h2>Tu carrito</h2>
  <ul class="cartList">
  </ul>      
  </div>
  `);
  renderCartItems();
};

const modifyItems = (e) => {
  if (!e.target.classList.contains("button-quantity")) return;
  const { id, type } = e.target.dataset;
  const itemIndex = appState.shoppingCart.findIndex(
    (item) => item.id === parseInt(id)
  );
  let newCart = [...appState.shoppingCart];
  if (type === "positive") {
    newCart[itemIndex] = {
      ...newCart[itemIndex],
      amount: newCart[itemIndex].amount + 1,
    };
  } else {
    newCart[itemIndex] = {
      ...newCart[itemIndex],
      amount: newCart[itemIndex].amount - 1,
    };
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
