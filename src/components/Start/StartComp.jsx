import { Link } from "react-router-dom";
import "./StartComp.css";

const StartComp = () => {
  return (
    <div className="home-container">
      <h1 className="">Vote for your favorite hamster!</h1>
      <Link to="/battle">Battle</Link>
    </div>
  );
};

export default StartComp;
