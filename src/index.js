import axios from "axios";
// import {fetchBreeds, populateBreedSelect} from "./cat-api.js";

axios.defaults.headers.common["x-api-key"] = "live_iGCbrbuFMyVhmUynVVxRRVJkJX5iuGEWrCY8M3Sy0bi1vvq3dt7YFmBr5wM0G1Ni";


const breedSelect = document.querySelector("select.breed-select");
const loaderP = document.querySelector("p.loader");
const errorP = document.querySelector("p.error");
const errorText = "Oops! Something went wrong! Try reloading the page!";
const loaderText = "Loading data. Please wait...";

// errorP.innerText = errorText;
// loaderP.innerText = loaderText;


// do eksportu
function fetchBreeds(){
  return axios.get("https://api.thecatapi.com/v1/breeds")
      .then(response => {
          if (!response.data) {
            throw new Error('błąd w if');
          }
          return response.data;
        })
        .catch(error => {
          throw new Error('błąd w catch');
        });
};

function populateBreedSelect(breeds) {
breeds.forEach(breed => {
  const option = document.createElement('option');
  option.value = breed.id;
  option.textContent = breed.name;
  breedSelect.appendChild(option);
});
};



// pobranie listy ras
breedSelect.addEventListener('focus', () => {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(
      console.error(errorText));
});

function fetchCatByBreed() {
  const urlText = `https://api.thecatapi.com/v1/breeds/search?breed_ids=${breedId}`;
  return axios.get(urlText)
      .then(catData => {
        loaderP.innerHTML = `<p>description</p>`
        })
      .catch(error => {
         console.error(errorText, error);
         });
};



// wybór rasy
breedSelect.addEventListener("change", (ev) => {
const breedId = ev.currentTarget.value;
const urlText = `https://api.thecatapi.com/v1/breeds/search?breed_ids=${breedId}`;
 fetchCatByBreed(urlText)
     .then(catData => {
          loaderP.innerHTML = `
          <p>Breed: ${catData.breeds[0].name}</p>
          <p>Description: ${catData.breeds[0].description}</p>
          <p>Temperament: ${catData.breeds[0].temperament}</p>
          `;
          })
     .catch(error => {
           console.error(errorText, error);
           });

});





// });

// function fetchCatByBreed(){
//     const breedId = breedSelect.value;
//     console.log('Selected breed:', breedId);
//     const urlImg = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
//     const urlText = `https://api.thecatapi.com/v1/breeds/search?breed_ids=${breedId}`;
//     // .then((response) => {
//     //     loader.innerHTML = response.data.map((breed) => `${breed.name} <br> ${breed.description}`);
//     // }).catch((error) => {
//     //     errorText.innerHTML = error;
//     // });
// }

// // function fetchCatByBreed(breedId) {


// //     return axios.get(urlText)
// //       .then(response => {
// //         if (!response.data || response.data.length === 0) {
// //           throw new Error('Failed to fetch cat by breed');
// //         }
// //         return console.log(response.data[0]);

// //       })
// //       .catch(error => {
// //         errorP.innerHTML = errorText;
// //       });
// //   }

//   function handleBreedSelectChange(event) {
//     const selectedBreedId = event.target.value;
//     return axios.get(urlText)
//         .then(catData => {
//           loaderP.innerHTML = `
//           <p>Breed: ${catData.breeds[0].name}</p>
//           <p>Description: ${catData.breeds[0].description}</p>
//           <p>Temperament: ${catData.breeds[0].temperament}</p>
//           <img src="${catData.url}" alt="Cat Image">
//         `;
//       })
//       .catch(error => {
//         console.error('Error fetching cat by breed:', error);
//       });
//   }

//   // Dodanie event listenera na zmianę wyboru w elemencie select
//   breedSelect.addEventListener('change', handleBreedSelectChange);




