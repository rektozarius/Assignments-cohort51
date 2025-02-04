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
    throw new Error(error.message);
  }
}

async function fetchAndPopulatePokemons(data) {
  
}

function fetchImage(/* TODO parameter(s) go here */) {
  // TODO complete this function
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
  button.id = 'button';
  document.body.appendChild(button);

  const select = document.createElement('select');
  select.id = 'dropdown';
  document.body.appendChild(select);
}

function main() {
  pageView();
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
  const button = document.querySelector('button');

  button.addEventListener('click', async () => {
    try {
      const data = await fetchData(url);
      // fetchAndPopulatePokemons(data);
      console.log(data);
    } catch (error) {
      errorView(error);
    }
  })
}

window.addEventListener('load', main);