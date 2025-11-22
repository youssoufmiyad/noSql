import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SearchBar from "../components/SearchBar.jsx";
import GameListing from "../components/GameListing.jsx";
import AddGame from "../components/AddGame.jsx";

const Dashboard = () => {
  const { titre, genre, plateforme } = useParams();
  const filters = useState({
    titre: titre !== undefined ? titre : "",
    genre: genre !== undefined ? genre : "",
    plateforme: plateforme !== undefined ? plateforme : "",
  });

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div>
      <section>
        <div className="container">
          <h1>Dashboard</h1>
        </div>
      </section>
      <section>
        <div className="container">
          <SearchBar />
        </div>
      </section>
      <section>
        <div className="container">
          <GameListing filters={filters} />
          <AddGame />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
