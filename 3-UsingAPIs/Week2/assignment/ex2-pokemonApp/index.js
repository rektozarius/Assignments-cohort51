/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function fetchAndPopulatePokemons(url) {
  const dropdown = document.getElementById('dropdown');
  dropdown.innerHTML = '';

  try {
    const data = await fetchData(url);
    data.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.text = pokemon.name;
      option.value = pokemon.url;
      dropdown.appendChild(option);
    })
  } catch (error) {
    throw error;
  }
}

async function fetchImage(pokeUrl) {
  const pokeImg = document.getElementById('poke-img');

  try {
    const pokeData = await fetchData(pokeUrl);
    pokeImg.src = pokeData.sprites.front_default;
    pokeImg.alt = pokeData.name;
  } catch (error) {
    throw error;
  }
}

function errorView(error) {
  const el = document.createElement('h1');
  el.innerText = error;
  document.body.innerHTML = '';
  document.body.appendChild(el);
}

function pageView() {
  const button = document.createElement('button');
  button.innerText = 'Get Pokemons!'
  button.id = 'poke-button';
  document.body.appendChild(button);

  const select = document.createElement('select');
  select.id = 'dropdown';
  document.body.appendChild(select);

  const pokeImg = document.createElement('img');
  pokeImg.id = 'poke-img'
  document.body.appendChild(pokeImg);
}

function main() {
  pageView();
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
  const button = document.getElementById('poke-button');
  const dropdown = document.getElementById('dropdown');

  button.addEventListener('click', async () => {
    try { 
      await fetchAndPopulatePokemons(url);
    } catch (error) {
      errorView(error.message);
    }
  })

  dropdown.onchange = async (option) => {
    try {
      await fetchImage(option.target.value);
    } catch (error) {
      errorView(error.message);
    }
  }
}

window.addEventListener('load', main);