import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";

export default function SideNav(props) {
  const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } =
    props;
  const [serachValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((el, elIndex) => {
    // if full pokedex number includes the current search value, return true
    if (getFullPokedexNumber(elIndex).includes(serachValue)) return true;

    // if the pokemon name includes the current search value, return true
    if (el.toLowerCase().includes(serachValue.toLowerCase())) return true;

    // otherwise, exclude value from the array
    return false;
  });

  return (
    <nav className={" " + (!showSideMenu ? "open" : "")}>
      <div className={"header " + (!showSideMenu ? "open" : "")}>
        <button onClick={handleCloseMenu} className="open-nav-button">
          <i className="fa-solid fa-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokèdex</h1>
      </div>
      <input
        placeholder="E.g. 001 or Bulbasaur"
        value={serachValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokedexNumber = first151Pokemon.indexOf(pokemon);
        return (
          <button
            onClick={() => {
              setSelectedPokemon(truePokedexNumber);
              handleCloseMenu();
            }}
            key={pokemonIndex}
            className={
              "nav-card " +
              (pokemonIndex === selectedPokemon ? "nav-card-selected" : " ")
            }
          >
            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
