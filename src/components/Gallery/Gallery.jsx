import { useEffect, useState } from "react";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import "./Gallery.css";

const Gallery = () => {
  const [hamsters, setHamsters] = useState(null);
  const [leftCount, setLeftCount] = useState(0);
  const [middleCount, setMiddleCount] = useState(1);
  const [rightCount, setRightCount] = useState(2);
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    const getHamsters = async () => {
      const response = await fetch("hamsters");
      const data = await response.json();

      setHamsters(data);
    };
    getHamsters();
  }, []);

  const leftClick = () => {
    if (leftCount === 0) {
      setLeftCount(hamsters.length - 1);
      setMiddleCount((prevState) => {
        return prevState - 1;
      });
      setRightCount((prevState) => {
        return prevState - 1;
      });
    } else if (middleCount === 0) {
      setLeftCount((prevState) => {
        return prevState - 1;
      });
      setMiddleCount(hamsters.length - 1);
      setRightCount((prevState) => {
        return prevState - 1;
      });
    } else if (rightCount === 0) {
      setLeftCount((prevState) => {
        return prevState - 1;
      });
      setMiddleCount((prevState) => {
        return prevState - 1;
      });
      setRightCount(hamsters.length - 1);
    } else {
      setLeftCount((prevState) => {
        return prevState - 1;
      });
      setMiddleCount((prevState) => {
        return prevState - 1;
      });
      setRightCount((prevState) => {
        return prevState - 1;
      });
    }
  };

  const rightClick = () => {
    if (rightCount === hamsters.length - 1) {
      setRightCount(0);
      setMiddleCount((prevState) => {
        return prevState + 1;
      });
      setLeftCount((prevState) => {
        return prevState + 1;
      });
    } else if (middleCount === hamsters.length - 1) {
      setRightCount((prevState) => {
        return prevState + 1;
      });
      setMiddleCount(0);
      setLeftCount((prevState) => {
        return prevState + 1;
      });
    } else if (leftCount === hamsters.length - 1) {
      setRightCount((prevState) => {
        return prevState + 1;
      });
      setMiddleCount((prevState) => {
        return prevState + 1;
      });
      setLeftCount(0);
    } else {
      setRightCount((prevState) => {
        return prevState + 1;
      });
      setMiddleCount((prevState) => {
        return prevState + 1;
      });
      setLeftCount((prevState) => {
        return prevState + 1;
      });
    }
  };

  const matches = (id) => {
    console.log(id);
  };

  return (
    <div className="gallery-container">
      {hamsters ? (
        <div className="gallery-img-container">
          <img
            src={leftArrow}
            alt="left-arrow"
            className="gallery-arrow"
            onClick={leftClick}
          />

          <div className="box-container">
            <img
              src={
                require(`../../assets/${hamsters[leftCount].imgName}`).default
              }
              alt="hamster"
              title="Click to see which hamsters this hamster has defeated."
              className="img-one gallery-img"
              onClick={() => matches(hamsters[leftCount].id)}
            />

            <div className="middle-box">
              <h1>{hamsters[middleCount].name}</h1>
              <img
                src={
                  require(`../../assets/${hamsters[middleCount].imgName}`)
                    .default
                }
                alt="hamster"
                title="Click to see which hamsters this hamster has defeated."
                className="img-two gallery-img"
                onClick={() => matches(hamsters[middleCount].id)}
              />
              <div>
                <button className="gallery-add gallery-button">
                  Add <br /> Hamster
                </button>
                <button className="gallery-remove gallery-button">
                  Remove <br /> Hamster
                </button>
              </div>
            </div>

            <img
              src={
                require(`../../assets/${hamsters[rightCount].imgName}`).default
              }
              alt="hamster"
              title="Click to see which hamsters this hamster has defeated."
              className="img-three gallery-img"
              onClick={() => matches(hamsters[rightCount].id)}
            />
          </div>

          <img
            src={rightArrow}
            alt="right-arrow"
            className="gallery-arrow"
            onClick={rightClick}
          />
        </div>
      ) : (
        <h1 className="gallery-loading loading">Loading...</h1>
      )}
    </div>
  );
};

export default Gallery;
