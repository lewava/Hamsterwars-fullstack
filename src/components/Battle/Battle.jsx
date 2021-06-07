import { useState } from "react";
import Match from "./Match";
import BattleResults from "./BattleResults";
import "./Battle.css";

const Battle = () => {
  const [showResults, setShowResults] = useState(false);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);

  const toggleResults = (w, l) => {
    setWinner(w);
    setLoser(l);
    setShowResults(true);
  };

  const newMatch = () => {
    setShowResults(false);
  };

  return (
    <div className="battle-container">
      {!showResults ? (
        <Match onShowResults={toggleResults} />
      ) : (
        <BattleResults
          onWinner={winner}
          onLoser={loser}
          onNewMatch={newMatch}
        />
      )}
    </div>
  );
};

export default Battle;
