import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_iGCbrbuFMyVhmUynVVxRRVJkJX5iuGEWrCY8M3Sy0bi1vvq3dt7YFmBr5wM0G1Ni";

function fetchBreeds(){
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => {
            if (!response.data) {
              throw new Error('Failed to fetch breeds');
            }
            return response.data;
          })
          .catch(error => {
            throw new Error('Failed to fetch breeds');
          });
};
export {fetchBreeds};

const breedSelect = document.querySelector("select.breed-select");
function populateBreedSelect(breeds) {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  };
export {populateBreedSelect};

function fetchCatByBreed(breedId) {
  const urlText = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(urlText)
    .then(response => {
      return response.data[0];})
    .catch(error => {
      console.error(errorText, error);
      throw error;

    });
}
export {fetchCatByBreed};

function loader() {
  const loaderContainer = document.querySelector("div.loader-container");
    loaderContainer.innerHTML = `<p class="loader" margin-left="20px"></p>`;
}
export {loader};

function removeLoader() {
  const loaderContainer = document.querySelector("div.loader-container");
  loaderContainer.innerHTML = ``;
}
export {removeLoader};