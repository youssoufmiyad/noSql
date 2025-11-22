import Game from "../models/Game.js";
import {createObjectCsvWriter } from "csv-writer";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function getGames(req, res) {
  const { genre, plateforme, titre, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let filter = {};
  if (genre || plateforme || titre) {
    const regex = [];
    if (genre) regex.push({ genre: { $regex: genre, $options: "i" } });
    if (plateforme)
      regex.push({ plateforme: { $regex: plateforme, $options: "i" } });
    if (titre) regex.push({ titre: { $regex: titre, $options: "i" } });
    filter = { $or: regex };
  }

  try {
    const games = await Game.find(filter).skip(skip).limit(limit);
    const total = await Game.countDocuments(filter);

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }

    res.status(200).json({
      games,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error : " + error });
  }
}

async function getGameById(req, res) {
  const gameId = req.params.id;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getStats(req, res) {
  try {
    const totalGames = await Game.countDocuments();
    const favoriteGames = await Game.countDocuments({ favori: true });
    const totalGameTime = await Game.aggregate([
      {
        $group: {
          _id: null,
          totalTime: { $sum: "$temps_jeu_heures" },
        },
      },
    ]);
    const totalTime = totalGameTime.length > 0 ? totalGameTime[0].totalTime : 0;
    
    const gamesPerGenre = await Game.aggregate([
      { $unwind: "$genre" },
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const genreCounts = gamesPerGenre.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});
    res.status(200).json({ totalGames, favoriteGames, totalTime, gamesPerGenre: genreCounts });
  } catch (error) {
    res.status(500).json({ message: "Server error : " + error });
  }
}

async function modifyGame(req, res) {
  const gameId = req.params.id;
  const {
    titre,
    genre,
    plateforme,
    editeur,
    developpeur,
    annee_sortie,
    metacritic_score,
    temps_jeu_heures,
    termine,
  } = req.body;
  try {
    const game = await Game.findByIdAndUpdate(
      gameId,
      {
        titre,
        genre,
        plateforme,
        editeur,
        developpeur,
        annee_sortie,
        metacritic_score,
        temps_jeu_heures,
        termine,
      },
      { new: true }
    );
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    console.log("Error modifying game:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function addGame(req, res) {
  const {
    titre,
    genre,
    plateforme,
    editeur,
    developpeur,
    annee_sortie,
    metacritic_score,
    temps_jeu_heures,
    termine,
  } = req.body;
  try {
    const existingGame = await Game.findOne({ titre });
    if (existingGame) {
      return res.status(400).json({ message: "Titre already used" });
    }
    const newGame = new Game({
      titre,
      genre,
      plateforme,
      editeur,
      developpeur,
      annee_sortie,
      metacritic_score,
      temps_jeu_heures,
      termine,
    });

    await newGame.save();

    res
      .status(201)
      .json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    res.status(500).json({ message: `Server error : ${error}` });
  }
}

async function toggleGameFavorite(req, res) {
  const gameId = req.params.id;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    game.favori = !game.favori;
    const updatedGame = await game.save();
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: "Server error : " + error });
  }
}

async function deleteGame(req, res) {
  const gameId = req.params.id;

  try {
    const game = await Game.findByIdAndDelete(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function exportGamesToCsv(req, res) {
  try {
    const games = await Game.find({});

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }

    const csvWriter = createObjectCsvWriter({
      path: join(__dirname, '/../export/games_export.csv'),
      header: [
        { id: '_id', title: 'ID' },
        { id: 'titre', title: 'Titre' },
        { id: 'genre', title: 'Genre' },
        { id: 'plateforme', title: 'Plateforme' },
        { id: 'editeur', title: 'Editeur' },
        { id: 'developpeur', title: 'Developpeur' },
        { id: 'annee_sortie', title: 'Annee_Sortie' },
        { id: 'metacritic_score', title: 'Metacritic_Score' },
        { id: 'temps_jeu_heures', title: 'Temps_Jeu_Heures' },
        { id: 'termine', title: 'Termine' },
        { id: 'date_ajout', title: 'Date_Ajout' },
        { id: 'date_modification', title: 'Date_Modification' },
        { id: 'favori', title: 'Favori' },
      ],
    });

    await csvWriter.writeRecords(games);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=games_export.csv');
    res.sendFile(join(__dirname, '/../export/games_export.csv'));

  } catch (error) {
    console.error("Erreur lors de l'export CSV :", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default {
  getGames,
  getGameById,
  getStats,
  modifyGame,
  addGame,
  toggleGameFavorite,
  deleteGame,
  exportGamesToCsv,
};
