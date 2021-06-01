import "./InfoModal.css";
import closeButton from "../../assets/closeButton.png";

const InfoModal = (props) => {
  return (
    <div className="hamster-info-container">
      <div className="hamster-info-top">
        <div className="name-container">
          <h1>
            {props.onHamster === 1
              ? props.onHamsterOne.name
              : props.onHamsterTwo.name}
          </h1>
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
        {props.onHamster === 1 ? (
          <div className="text-box">
            <span>Age:</span> <p>{props.onHamsterOne.age}</p>
          </div>
        ) : (
          <div className="text-box">
            <span>Age:</span> <p>{props.onHamsterTwo.age}</p>
          </div>
        )}
        {props.onHamster === 1 ? (
          <div className="text-box">
            <span>Loves:</span> <p>{props.onHamsterOne.loves}</p>
          </div>
        ) : (
          <div className="text-box">
            <span>Age:</span> <p>{props.onHamsterTwo.loves}</p>
          </div>
        )}
        {props.onHamster === 1 ? (
          <div className="text-box">
            <span>Favorite food:</span> <p>{props.onHamsterOne.favFood}</p>
          </div>
        ) : (
          <div className="text-box">
            <span>Favorite food:</span> <p>{props.onHamsterTwo.favFood}</p>
          </div>
        )}
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
