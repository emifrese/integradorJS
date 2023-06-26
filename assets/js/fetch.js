const getDeals = async () => {
  const response = await fetch(
    "https://api.mercadolibre.com/sites/MLA/search?q=ofertas&results=1"
  );
  const { results } = await response.json();
  return results;
};

const getCategories = async () => {
  const response = await fetch(
    "https://api.mercadolibre.com/sites/MLA/categories"
  );
  const data = await response.json();
  return data;
};

const searchProducts = async (search) => {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${search}&results=1`
  );
  const { results } = await response.json();
  return results;
};

const getCategoriesProducts = async (category) => {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?category=${category}`
  );
  const { results, filters } = await response.json();
  return { results, filters };
};
