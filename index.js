const testButton = document.querySelector("#infoMl");

const getInfo = async () => {
  const data = await fetch("https://api.mercadolibre.com/sites/MLA", {
    method: "get",
    headers: {
      Authorization: "XDAEKD0KZfPoEXWP3uGgyDYeAJ4x7uO0",
    },
  });

  const response = await data.json();
  console.log(response);
};

testButton.addEventListener("click", getInfo);
