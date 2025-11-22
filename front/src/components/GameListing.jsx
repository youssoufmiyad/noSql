import React, {useState, useEffect} from 'react'
import { getAllGames } from '../utils/games';

const GameListing = ({filters}) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      getAllGames(1, 100, filters ? filters : null).then(data => {
        setGames(data?.games);
      });
    };
    fetchGames();
  }, [filters]);

  useEffect(() => {
    console.log(filters)
  }, [filters]);

  return (
    <div className='game-listing'>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Genre</th>
            <th>Plateforme</th>
            <th>Editeur</th>
            <th>Développeur</th>
            <th>Année de sortie</th>
            <th>Score metacritic</th>
            <th>Temps de jeu (heures)</th>
            <th>Terminé</th>
            <th>Date d'ajout</th>
            <th>Date de modification</th>
            <th>Favori</th>
          </tr>
        </thead>
        <tbody>
          {games?.map(game => (
            <tr key={game._id}>
              
                <td><a href={`/game/${game._id}`}>{game.titre}</a></td>
                <td>{game.genre}</td>
                <td>{game.plateforme}</td>
                <td>{game.editeur}</td>
                <td>{game.developpeur}</td>
                <td>{game.annee_sortie}</td>
                <td>{game.metacritic_score}</td>
                <td>{game.temps_jeu_heures}</td>
                <td>{game.termine}</td>
                <td>{game.date_ajout}</td>
                <td>{game.date_modification}</td>
                <td>{game.favori}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GameListing
