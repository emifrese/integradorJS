const overlay = document.querySelector(".overlay");

const modalCard = (content) => {
  return `
    <div class="backdrop"></div>
    <div class="modalContainer">
    <div class="modal">${content}</div>
    </div>
    `;
  };
  
  const showModal = (modalContent) => {
    overlay.innerHTML = modalCard(modalContent);
    const backdrop = document.querySelector(".backdrop");
    backdrop.addEventListener("click", () => (overlay.innerHTML = ""));
};

(() => {
})();

{
  /* <div class="cartContainer">
  <h2>Tu carrito</h2>
  <ul>
    <li>
      <div class="cartItemContainer">
        <div class="cartItemInfo">
          <p>Item #1</p>
          <div class="amountContainer">
            <button>-</button>
            <p class="itemAmount">x1</p>
            <button>+</button>
          </div>
        </div>
        <img
          src="http://http2.mlstatic.com/D_612199-MLA40645964413_022020-I.jpg"
          alt=""
        />
      </div>
      <p>$10</p>
    </li>
    <li>
      <div class="cartItemContainer">
        <div class="cartItemInfo">
          <p>Item #1</p>
          <div class="amountContainer">
            <button>-</button>
            <p class="itemAmount">x1</p>
            <button>+</button>
          </div>
        </div>
        <img
          src="http://http2.mlstatic.com/D_612199-MLA40645964413_022020-I.jpg"
          alt=""
        />
      </div>
      <p>$10</p>
    </li>
    <li>
      <div class="cartItemContainer">
        <div class="cartItemInfo">
          <p>Item #1</p>
          <div class="amountContainer">
            <button>-</button>
            <p class="itemAmount">x1</p>
            <button>+</button>
          </div>
        </div>
        <img
          src="http://http2.mlstatic.com/D_612199-MLA40645964413_022020-I.jpg"
          alt=""
        />
      </div>
      <p>$10</p>
    </li>
    <li>
      <div class="cartItemContainer">
        <div class="cartItemInfo">
          <p>Item #1</p>
          <div class="amountContainer">
            <button>-</button>
            <p class="itemAmount">x1</p>
            <button>+</button>
          </div>
        </div>
        <img
          src="http://http2.mlstatic.com/D_612199-MLA40645964413_022020-I.jpg"
          alt=""
        />
      </div>
      <p>$10</p>
    </li>
    <li>
      Total
      <p>$10</p>
    </li>
  </ul>
  <button class="cartBuyButton">Comprar</button>
</div>; */
}
