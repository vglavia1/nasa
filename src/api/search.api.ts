export const getSearch = (searchString: string) =>
  fetch(`https://images-api.nasa.gov/search?q=${searchString}`)
    .then((response) => response.json())
    .catch((error) => Promise.reject(error));
