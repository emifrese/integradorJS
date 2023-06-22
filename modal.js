const overlay = document.querySelector(".overlay");

const modalCard = (content) => {
  return `
    <div class="backdrop"></div>
    <div class="modalContainer">
    <div class="modal">${content}</div>
    </div>`;
  };
  
  const showModal = (modalContent) => {
    overlay.innerHTML = modalCard(modalContent);
    const backdrop = document.querySelector(".backdrop");
    backdrop.addEventListener("click", () => (overlay.innerHTML = ""));
};
