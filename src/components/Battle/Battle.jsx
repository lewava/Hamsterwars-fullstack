import { useState, useEffect } from "react";
import InfoModal from "./InfoModal";
import vsImg from "../../assets/vs.png";
import "./Battle.css";

const Battle = () => {
  const [showModal, setShowModal] = useState(false);
  const [hamsterOne, setHamsterOne] = useState(null);
  const [hamsterTwo, setHamsterTwo] = useState(null);
  const [selectedHamster, setSelectedHamster] = useState(0);

  useEffect(() => {
    async function getHamsterOne() {
      const response = await fetch("hamsters/random");
      const data = await response.json();

      setHamsterOne(data);
    }
    async function getHamsterTwo() {
      const response = await fetch("hamsters/random");
      const data = await response.json();

      setHamsterTwo(data);
    }
    getHamsterOne();
    getHamsterTwo();

    //Lägg till så det måste vara två olika hamstrar
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = (hamster) => {
    setSelectedHamster(hamster);
    setShowModal(true);
  };

  async function vote(winner) {
    let winnerId = "";
    let loserId = "";

    if (winner === 1) {
      winnerId = hamsterOne.id;
      loserId = hamsterTwo.id;
    } else if (winner === 2) {
      winnerId = hamsterTwo.id;
      loserId = hamsterOne.id;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        winnerId: winnerId,
        loserId: loserId,
      }),
    };

    await fetch("matches", requestOptions);
  }

  return (
    <div className="battle-container">
      <div className="battle-img-container hamster-1">
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
      <div className="battle-img-container  hamster-2">
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
      {showModal && (
        <InfoModal
          onHideModal={closeModal}
          onHamster={selectedHamster}
          onHamsterOne={hamsterOne}
          onHamsterTwo={hamsterTwo}
        />
      )}
    </div>
  );
};

export default Battle;
