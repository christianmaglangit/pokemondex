document.addEventListener("DOMContentLoaded", () => {
  const fetchAllPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10
        `);
      const data = await response.json();
      const pokemonList = data.results;

      for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = await fetchPokemon(pokemonList[i].name);
        displayPokemon(pokemon);
      }
    } catch (error) {
      console.error("Error fetching all Pokémon:", error);
    }
  };

  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const getTypeColor = (type) => {
    const typeColors = {
      fire: "bg-red-400",
      water: "bg-blue-400",
      grass: "bg-green-400",
      electric: "bg-yellow-400",
      ice: "bg-teal-400",
      fighting: "bg-red-600",
      poison: "bg-purple-400",
      ground: "bg-brown-400",
      flying: "bg-blue-300",
      psychic: "bg-pink-400",
      bug: "bg-lime-400",
      rock: "bg-gray-600",
      ghost: "bg-indigo-400",
      dragon: "bg-purple-600",
      dark: "bg-gray-700",
      steel: "bg-gray-400",
      fairy: "bg-pink-300",
    };
    return typeColors[type] || "bg-gray-200"; // Default color if type is not in the list
  };

  const displayPokemon = (pokemon) => {
    const app = document.getElementById("app");
    const pokemonElement = document.createElement("div");

    // Get the background color based on the first type of the Pokémon
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = getTypeColor(primaryType);

    pokemonElement.className = `${backgroundColor} text-black shadow-md rounded p-4 mb-4 cursor-pointer`;
    pokemonElement.innerHTML = `
          <h2 class="text-xl font-bold mb-2">${pokemon.name.toUpperCase()}</h2>
          <img src="${pokemon.sprites.front_default}" alt="${
      pokemon.name
    }" class="mb-2">
          <div class="pokemon-stats hidden">
              <p>Height: ${pokemon.height}</p>
              <p>Weight: ${pokemon.weight}</p>
              <p>Type: ${pokemon.types
                .map((type) => type.type.name)
                .join(", ")}</p>
              <h3 class="text-lg font-semibold mt-4">Stats:</h3>
              <ul>
                  ${pokemon.stats
                    .map(
                      (stat) => `
                      <li>${stat.stat.name.toUpperCase()}: ${
                        stat.base_stat
                      }</li>
                  `
                    )
                    .join("")}
              </ul>
          </div>
      `;
    app.appendChild(pokemonElement);

    pokemonElement.addEventListener("click", () => {
      const statsDiv = pokemonElement.querySelector(".pokemon-stats");
      statsDiv.classList.toggle("hidden");
    });
  };

  fetchAllPokemon();

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.toLowerCase();
    const app = document.getElementById("app");
    app.innerHTML = "";
    if (query) {
      const pokemon = await fetchPokemon(query);
      if (pokemon) {
        displayPokemon(pokemon);
      }
    } else {
      fetchAllPokemon();
    }
  });
});
