import "./ErrorComp.css";
import deadHamster from "../../assets/dead-hamster.png";

const ErrorComp = () => {
  return (
    <div className="error-container">
      <img src={deadHamster} alt="Dead hamster icon" />
      <h2>
        Unfortunately, the server could not be reached try to reload the page or
        visit us another time.
      </h2>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
};

export default ErrorComp;
