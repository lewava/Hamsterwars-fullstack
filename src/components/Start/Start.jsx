import { useEffect, useState } from "react";
import StartComp from "./StartComp";
import ErrorComp from "./ErrorComp";
import "./Start.css";

const Start = () => {
  const [hamsters, setHamsters] = useState(null);

  useEffect(() => {
    const testServer = async () => {
      try {
        const response = await fetch("hamsters");
        const data = await response.json();
        setHamsters(data);
      } catch (error) {
        console.log(
          "Unfortunately, the server could not be reached try to reload the page or visit us another time."
        );
      }
    };
    testServer();
  }, []);

  return (
    <div className="start-container">
      {hamsters ? <StartComp /> : <ErrorComp />}
    </div>
  );
};

export default Start;
