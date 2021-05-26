import { useState } from "react";
import InfoModal from "./InfoModal";
import imgOne from "../img/hamster-1.jpg";
import imgTwo from "../img/hamster-2.jpg";
import vsImg from "../img/vs.png";
import "./Battle.css";

const Battle = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(true);
  };

  return (
    <div className="battle-container">
      <div className="battle-img-container hamster-1">
        <img
          className="hamster-img"
          src={imgOne}
          alt="Hamster one"
          title="Click for more info about the hamster."
          onClick={toggleModal}
        />
        <button>Vote</button>
      </div>
      <img className="vs-img" src={vsImg} alt="VS img" />
      <div className="battle-img-container  hamster-2">
        <img
          className="hamster-img"
          src={imgTwo}
          alt="Hamster two"
          title="Click for more info about the hamster."
          onClick={toggleModal}
        />
        <button>Vote</button>
      </div>
      {showModal && <InfoModal onHideModal={closeModal} />}
    </div>
  );
};

export default Battle;
