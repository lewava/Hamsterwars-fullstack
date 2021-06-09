import { useState, useEffect } from "react";
import InfoModal from "./InfoModal";
import vsImg from "../../assets/vs.png";
import "./Match.css";

const Match = (props) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hamsterOne, setHamsterOne] = useState(null);
  const [hamsterTwo, setHamsterTwo] = useState(null);
  const [selectedHamster, setSelectedHamster] = useState(0);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);

  useEffect(() => {
    const getHamsters = async () => {
      let firstHamster;
      let secondHamster;

      /* Gör så att en hamster inte kan möta sig själv. */
      do {
        for (let i = 0; i <= 1; i++) {
          const response = await fetch("hamsters/random");
          const data = await response.json();

          if (i === 0) firstHamster = data;
          if (i === 1) secondHamster = data;
        }
      } while (firstHamster.id === secondHamster.id);

      setHamsterOne(firstHamster);
      setHamsterTwo(secondHamster);
    };
    getHamsters();
  }, []);

  const vote = (winnerId) => {
    if (winnerId === 1) {
      setWinner({
        ...hamsterOne,
        wins: hamsterOne.wins + 1,
        games: hamsterOne.games + 1,
      });
      setLoser({
        ...hamsterTwo,
        defeats: hamsterTwo.defeats + 1,
        games: hamsterTwo.games + 1,
      });
    }
    if (winnerId === 2) {
      setWinner({
        ...hamsterTwo,
        wins: hamsterTwo.wins + 1,
        games: hamsterTwo.games + 1,
      });
      setLoser({
        ...hamsterOne,
        defeats: hamsterOne.defeats + 1,
        games: hamsterOne.games + 1,
      });
    }
  };

  useEffect(() => {
    if (winner === null || loser === null) return;
    else {
      const postMatch = async () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            winnerId: winner.id,
            loserId: loser.id,
          }),
        };

        await fetch("matches", requestOptions);
      };

      const updateWinner = async () => {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wins: winner.wins,
            games: winner.games,
          }),
        };

        await fetch(`hamsters/${winner.id}`, requestOptions);
      };

      const updateLoser = async () => {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            defeats: loser.defeats,
            games: loser.games,
          }),
        };

        await fetch(`hamsters/${loser.id}`, requestOptions);
      };
      props.onShowResults(winner, loser);
      postMatch();
      updateWinner();
      updateLoser();
    }
  }, [winner, loser, props]);

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  const toggleModal = (hamster) => {
    setSelectedHamster(hamster);
    setShowInfoModal(true);
  };

  return (
    <div className="Match-container">
      <div className="Match-img-container hamster-1">
        {!hamsterOne ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <img
            className="hamster-img"
            src={require(`../../assets/${hamsterOne.imgName}`).default}
            alt="Hamster one"
            title="Click for more info about the hamster."
            onClick={() => toggleModal(1)}
          />
        )}
        <button onClick={() => vote(1)}>Vote</button>
      </div>
      <img className="vs-img" src={vsImg} alt="VS img" />
      <div className="Match-img-container  hamster-2">
        {!hamsterTwo ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <img
            className="hamster-img"
            src={require(`../../assets/${hamsterTwo.imgName}`).default}
            alt="Hamster one"
            title="Click for more info about the hamster."
            onClick={() => toggleModal(2)}
          />
        )}
        <button onClick={() => vote(2)}>Vote</button>
      </div>
      {showInfoModal && (
        <InfoModal
          onCloseInfoModal={closeInfoModal}
          onHamster={selectedHamster}
          onHamsterOne={hamsterOne}
          onHamsterTwo={hamsterTwo}
        />
      )}
    </div>
  );
};

export default Match;
