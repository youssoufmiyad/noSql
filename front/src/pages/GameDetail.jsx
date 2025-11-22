import React from "react";
import { useParams } from "react-router";
import ModifyGame from "../components/ModifyGame.jsx";

const GameDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <section>
        <div className="container">
          <h1>Detail</h1>
        </div>
      </section>
      <section>
        <div className="container">
          <ModifyGame gameId={id} />
        </div>
        <div className="container">
            <div className="actions">
                <button>Favoris</button>
                <button>Supprimer</button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default GameDetail;
