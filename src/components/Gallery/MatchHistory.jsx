import "./MatchHistory.css";
import closeButton from "../../assets/close-button-dark.png";

const MatchHistory = (props) => {
  const renderedList = props.onLosers.map((hamster, index) => {
    return <li key={index}>{hamster.name}</li>;
  });

  return (
    <div className="gallery-history">
      <div className="gallery-history-top">
        <h1>
          <span>{props.onSelectedHamster.name}</span> has Defeated
        </h1>
        <img src={closeButton} alt="close button" onClick={props.onClose} />
      </div>
      <ul>{renderedList}</ul>
    </div>
  );
};

export default MatchHistory;
