const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const modal = document.querySelector("dialog");
const closeModal = document.getElementById("closeModal");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" onClick="showPokemonModal(${
    pokemon.number
  })">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

const button2 = document.getElementById("verPoke");

function teste2() {
  console.log("topper");
}

function convertSinglePokemon(pokemon) {
  return `
        <div class="modal ${pokemon.type}">
            <button onclick="modal.close()">x</button>
            <h2>${pokemon.name}</h2>
            <p>Number: #${pokemon.number}</p>
            <p>Types: ${pokemon.types.join(", ")}</p>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    `;
}

function showPokemonModal(pokemonId) {
  pokeApi.getSinglePokemon(pokemonId).then((data) => {
    const singlePokemon = convertSinglePokemon(data);
    modal.innerHTML = singlePokemon;
    modal.showModal();
  });
}
