import api from "./axios";

export async function getAllGames(page = 1, limit = 10, filters = null) {
  try {
    const response = await api.get(`/games${filters != null ? `?titre=${filters.titre !== undefined ? filters.titre : ""}&genre=${filters.genre !== undefined ? filters.genre : ""}&plateforme=${filters.plateforme !== undefined ? filters.plateforme : ""}` : ""}`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGame(id) {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getStats() {
  try {
    const response = await api.get("/games/stats");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleGameFavorite(id) {
  try {
    const response = await api.post(`/games/${id}/favorite`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export async function addGame(gameData) {
  try {
    const response = await api.post("/games", gameData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function modifyGame(id, gameData) {
  try {
    const response = await api.put(`/games/${id}`, gameData);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteGame(id) {
  try {
    const response = await api.delete(`/games/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function exportGamesToCsv() {
  try {
    const response = await api.get("/games/export", {
        responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "games_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
  }
}