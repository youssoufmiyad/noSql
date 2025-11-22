import React, { useState, useEffect } from "react";
import { getGame, modifyGame } from "../utils/games";

const ModifyGame = ({ gameId }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [editeur, setEditeur] = useState("");
  const [developpeur, setDeveloppeur] = useState("");
  const [annee, setAnnee] = useState("");
  const [metacritic, setMetacritic] = useState("");
  const [tempsJeu, setTempsJeu] = useState("");
  const [termine, setTermine] = useState(false);
  const [favori, setFavori] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await modifyGame(gameId, {
      titre: title,
      genre: genre.split(",").map((g) => g.trim()),
      plateforme: platform.split(",").map((p) => p.trim()),
      editeur,
      developpeur,
      annee_sortie: annee,
      metacritic_score: metacritic,
      temps_jeu_heures: tempsJeu,
      termine,
      favori,
    });
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        getGame(gameId).then((data) => {
          const game = data;
          setTitle(game.titre);
          setGenre(game.genre.join(", "));
          setPlatform(game.plateforme.join(", "));
          setEditeur(game.editeur);
          setDeveloppeur(game.developpeur);
          setAnnee(game.annee_sortie);
          setMetacritic(game.metacritic_score);
          setTempsJeu(game.temps_jeu_heures);
          setTermine(game.termine);
          setFavori(game.favori);
        });
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  return (
    <div className="form-container modify-game-form">
      <h2>Modifier le jeu</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="title">Titre:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="platform">Plateforme:</label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="editeur">Editeur:</label>
            <input
              type="text"
              id="editeur"
              name="editeur"
              value={editeur}
              onChange={(e) => setEditeur(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="developpeur">Développeur:</label>
            <input
              type="text"
              id="developpeur"
              name="developpeur"
              value={developpeur}
              onChange={(e) => setDeveloppeur(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="annee">Année de sortie:</label>
            <input
              type="text"
              id="annee"
              name="annee"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="metacritic">Score metacritic:</label>
            <input
              type="text"
              id="metacritic"
              name="metacritic"
              value={metacritic}
              onChange={(e) => setMetacritic(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="temps_jeu">Temps de jeu (heures):</label>
            <input
              type="text"
              id="temps_jeu"
              name="temps_jeu"
              value={tempsJeu}
              onChange={(e) => setTempsJeu(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="termine">Terminé:</label>
            <input
              type="checkbox"
              id="termine"
              name="termine"
              checked={termine}
              onChange={(e) => setTermine(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor="favori">Favori:</label>
            <input
              type="checkbox"
              id="favori"
              name="favori"
              checked={favori}
              onChange={(e) => setFavori(e.target.checked)}
            />
          </li>
          <li>
            <button type="submit">Modifier le jeu</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default ModifyGame;
