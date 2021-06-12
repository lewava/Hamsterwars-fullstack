import { useEffect, useState } from "react";
import "./Stats.css";

const Stats = () => {
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [showLosers, setShowLosers] = useState(false);

  useEffect(() => {
    const getWinners = async () => {
      const response = await fetch("winners");
      const data = await response.json();
      setWinners(data);
    };
    const getLosers = async () => {
      const response = await fetch("losers");
      const data = await response.json();
      setLosers(data);
    };
    getWinners();
    getLosers();
  }, []);

  const renderWinners = winners.map((hamster) => (
    <div key={hamster.name} className="stats-hamster-container">
      <h3>{hamster.name}</h3>
      <img
        src={require(`../../assets/${hamster.imgName}`).default}
        alt="hamster"
      />
      <h4>Wins: {hamster.wins}</h4>
    </div>
  ));

  const renderLosers = losers.map((hamster) => (
    <div key={hamster.name} className="stats-hamster-container">
      <h3>{hamster.name}</h3>
      <img
        src={require(`../../assets/${hamster.imgName}`).default}
        alt="hamster"
      />
      <h4>Defeats: {hamster.defeats}</h4>
    </div>
  ));

  return (
    <div className="stats-container">
      <div className="stats-inner-container">
        <h1>Top 5 {!showLosers ? "winners" : "losers"}</h1>
        <div className="top-five-container">
          {!showLosers ? renderWinners : renderLosers}
        </div>
        <h2
          onClick={() =>
            setShowLosers((prevState) => {
              return !prevState;
            })
          }
        >
          Show {!showLosers ? "losers" : "winners"}
        </h2>
      </div>
    </div>
  );
};

export default Stats;