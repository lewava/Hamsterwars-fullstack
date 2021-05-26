import "./InfoModal.css";
import closeButton from "../img/closeButton.png";

const InfoModal = (props) => {
  return (
    <div className="hamster-info-container">
      <div className="hamster-info-top">
        <div className="name-container">
          <h1>Name</h1>
        </div>
        <div>
          <img
            src={closeButton}
            alt="Close Button"
            onClick={props.onHideModal}
          />
        </div>
      </div>
      <div className="text-container">
        <div className="text-box">
          <span>Age:</span> <p>30</p>
        </div>
        <div className="text-box">
          <span>Loves:</span> <p>Run</p>
        </div>
        <div className="text-box">
          <span>Favorite food:</span> <p>Grass</p>
        </div>
        <div className="text-box">
          <span>Comming soon:</span>
        </div>
        <div className="text-box">
          <span>Comming soon:</span>
        </div>
        <div className="text-box">
          <span>Comming soon:</span>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
