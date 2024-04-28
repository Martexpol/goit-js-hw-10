import axios from "axios";
import {loader, removeLoader, fetchBreeds, fetchCatByBreed, populateBreedSelect} from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common["x-api-key"] = "live_iGCbrbuFMyVhmUynVVxRRVJkJX5iuGEWrCY8M3Sy0bi1vvq3dt7YFmBr5wM0G1Ni";

const breedSelect = document.querySelector("select.breed-select");
const errorText = "Oops! Something went wrong! Try reloading the page!";
const catImage = document.querySelector(".cat-image");
const catBreed = document.querySelector(".cat-breed");
const catDescription = document.querySelector(".cat-description");
const catTemperament = document.querySelector(".cat-temperament");

// pobranie listy ras
breedSelect.addEventListener('focus', () => {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error(errorText, error);
      Notify.failure(errorText);
      });
});

let lastSelectedBreedId = null;
// ładowanie danych
breedSelect.addEventListener("change", (ev) => {
  ev.preventDefault();
  const breedId = ev.currentTarget.value;
  loader();

  fetchCatByBreed(breedId)
     .then(catData => {
      if (breedId === lastSelectedBreedId) {
      catImage.innerHTML = `<img src="${catData.url}" width="400px">`;
      catBreed.innerText = `${catData.breeds[0].name}`;
      catDescription.innerText = `${catData.breeds[0].description}`;
      catTemperament.innerHTML = `<span class="temperament-span">Temperament: </span>${catData.breeds[0].temperament}`;

      removeLoader();
      }
    })
    .catch(error => {
      console.error(errorText, error);
     Notify.failure(errorText);
});
lastSelectedBreedId = breedId;
});

