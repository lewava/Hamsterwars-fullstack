import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
      <div className="home-container">
        <h1 className="">Vote for your favorite hamster!</h1>
        <Link to="/battle">Battle</Link>
      </div>
  );
};

export default Home;
