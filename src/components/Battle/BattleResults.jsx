import { useState } from "react";
import "./BattleResults.css";

const BattleResults = (props) => {
  const [showWinner, setShowWinner] = useState(true);

  return (
    <div className="result-container">
      {showWinner ? (
        <h1 className="result-title">
          <span className="result-name">{props.onWinner.name} </span> is the
          winner!
        </h1>
      ) : (
        <h1 className="result-title">
          <span className="result-name">{props.onLoser.name} </span> is the
          loser!
        </h1>
      )}

      <div className="result-middle">
        {showWinner ? (
          <h3 className="result-defeats">{props.onWinner.defeats} defeats</h3>
        ) : (
          <h3 className="result-defeats">{props.onLoser.defeats} defeats</h3>
        )}

        {showWinner ? (
          <img
            className="result-img"
            src={require(`../../assets/${props.onWinner.imgName}`).default}
            alt="Winning hamster"
          />
        ) : (
          <img
            className="result-img"
            src={require(`../../assets/${props.onLoser.imgName}`).default}
            alt="Losing hamster"
          />
        )}

        {showWinner ? (
          <h3 className="result-wins">{props.onWinner.wins} wins</h3>
        ) : (
          <h3 className="result-wins">{props.onLoser.wins} wins</h3>
        )}
      </div>
      <div className="result-button-container">
        <button className="result-button" onClick={() => props.onNewMatch()}>
          Next Match
        </button>
      </div>
      <div className="result-show-container">
        <h4 className="result-show" onClick={() => setShowWinner(!showWinner)}>
          {showWinner ? "Show Loser" : "Show Winner"}
        </h4>
      </div>
    </div>
  );
};

export default BattleResults;
