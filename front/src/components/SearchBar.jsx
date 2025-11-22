import React, { useState } from "react";

const SearchBar = () => {
  const [titre, setTitre] = useState("");
  const [genre, setGenre] = useState("");
  const [plateforme, setPlateforme] = useState("");
  return (
    <div className="search-bar">
      <form
        action={`/?titre=${titre}&genre=${genre}&plateforme=${plateforme}`}
        method="GET"
      >
        <ul>
          <li>
            <input
              type="text"
              name="titre"
              id="titre"
              placeholder="Titre..."
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              name="plateforme"
              id="plateforme"
              placeholder="Plateforme..."
              value={plateforme}
              onChange={(e) => setPlateforme(e.target.value)}
            />
          </li>
          <li>
            <button type="submit">Rechercher</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SearchBar;
