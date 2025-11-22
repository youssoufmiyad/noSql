import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
    titre: { type: String, required: true, minLength: 1},
    genre: { type: [String], required: true,  },
    plateforme: { type: [String], required: true,  },
    editeur: { type: String, required: true },
    developpeur: { type: String, required: true },
    annee_sortie: { type: Number, required: true,  },
    metacritic_score: { type: Number, required: true,  },
    temps_jeu_heures: { type: Number, required: true,  },
    termine: { type: Boolean, required: true },
    date_ajout: { type: Date, default: Date.now },
    date_modification: { type: Date, default: Date.now },
    favori: { type: Boolean, default: false },
});

export default mongoose.model("Game", gameSchema);