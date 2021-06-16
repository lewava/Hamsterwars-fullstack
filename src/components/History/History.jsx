import { useEffect, useState } from "react";
import LoadingHamster from "../../assets/loading-hamster.png";
import "./History.css";

const History = () => {
  const [matches, setMatches] = useState(null);
  const [hamsters, setHamsters] = useState(null);

  useEffect(() => {
    const getMatches = async () => {
      const response = await fetch("matches");
      const data = await response.json();
      setMatches(data);
    };

    const getHamsters = async () => {
      const response = await fetch("hamsters");
      const data = await response.json();
      setHamsters(data);
    };
    getMatches();
    getHamsters();
  }, []);

  const deleteMatch = async (matchId) => {
    await fetch(`matches/${matchId}`, { method: "DELETE" });
    window.location.reload();
  };

  const deleteMatchHandler = (matchId) => {
    if (window.confirm("Are you sure you want to remove this match?"))
      deleteMatch(matchId);
    else return;
  };

  return (
    <>
      {!hamsters || !matches ? (
        <div className="history-img-container">
          <div className="loading-container">
            <img
              className="loading-img"
              src={LoadingHamster}
              alt="hamster icon"
            />
            <h3 className="loading-text">Loading...</h3>
          </div>
        </div>
      ) : (
        <div className="history-card-container">
          {matches.map((match) => {
            const winner = hamsters.find((hamster) => {
              return hamster.id === match.winnerId;
            });
            const loser = hamsters.find((hamster) => {
              return hamster.id === match.loserId;
            });
            return (
              <div key={match.id} className="history-card">
                <h2>Winner</h2>
                <img
                  src={require(`../../assets/${winner.imgName}`).default}
                  alt="winner"
                />
                <h3>{winner.name}</h3>
                <h1>VS</h1>
                <h2>Loser</h2>
                <img
                  src={require(`../../assets/${loser.imgName}`).default}
                  alt="loser"
                />
                <h3>{loser.name}</h3>
                <h5 onClick={() => deleteMatchHandler(match.id)}>
                  Remove Match
                </h5>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default History;
