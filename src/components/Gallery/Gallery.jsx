import { useEffect, useState } from "react";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import MatchHistory from "./MatchHistory";
import RemoveModal from "./RemoveModal";
import AddHamster from "./AddHamster";
import LoadingHamster from "../../assets/loading-hamster.png";
import "./Gallery.css";

const Gallery = () => {
  const [hamsters, setHamsters] = useState(null);
  const [leftCount, setLeftCount] = useState(0);
  const [middleCount, setMiddleCount] = useState(1);
  const [rightCount, setRightCount] = useState(2);
  const [showMatchHistory, setShowMatchHistory] = useState(false);
  const [selectedHamster, setSelectedHamster] = useState(null);
  const [matches, setMatches] = useState([]);
  const [losers, setLosers] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removedHamster, setRemovedHamster] = useState(null);
  const [showAddHamster, setShowAddHamster] = useState(false);

  useEffect(() => {
    getHamsters();
  }, []);

  const getHamsters = async () => {
    const response = await fetch("hamsters");
    const data = await response.json();

    setHamsters(data);
  };

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

  const getMatches = async (hamster) => {
    try {
      const response = await fetch(`matchWinners/${hamster.id}`);
      const data = await response.json();
      setMatches(data);
      setSelectedHamster(hamster);
      setShowMatchHistory(true);
    } catch (error) {
      alert(`This hamster hasn't won any matches`);
    }
  };

  useEffect(() => {
    const getLosers = async () => {
      let l = [];
      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          const response = await fetch(`hamsters/${matches[i].loserId}`);
          const data = await response.json();
          l.push(data);
        }
      } else return;
      setLosers(l);
    };
    getLosers();
  }, [matches]);

  const closeMatchHistory = () => {
    setShowMatchHistory(false);
  };

  const toggleRemoveModal = () => {
    setShowRemoveModal((prevState) => {
      return !prevState;
    });
    setRemovedHamster(hamsters[middleCount]);
  };

  const toggleAddModal = () => {
    setShowAddHamster((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="gallery-container">
      {showMatchHistory ? (
        <MatchHistory
          onLosers={losers}
          onSelectedHamster={selectedHamster}
          onClose={closeMatchHistory}
        />
      ) : (
        <>
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
                    require(`../../assets/${hamsters[leftCount].imgName}`)
                      .default
                  }
                  alt="hamster"
                  title="Click to see which hamsters this hamster has defeated."
                  className="img-one gallery-img"
                  onClick={() => getMatches(hamsters[leftCount])}
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
                    onClick={() => getMatches(hamsters[middleCount])}
                  />
                  <div>
                    <button
                      className="gallery-add gallery-button"
                      onClick={toggleAddModal}
                    >
                      Add <br /> Hamster
                    </button>
                    <button
                      className="gallery-remove gallery-button"
                      onClick={toggleRemoveModal}
                    >
                      Remove <br /> Hamster
                    </button>
                  </div>
                </div>

                <img
                  src={
                    require(`../../assets/${hamsters[rightCount].imgName}`)
                      .default
                  }
                  alt="hamster"
                  title="Click to see which hamsters this hamster has defeated."
                  className="img-three gallery-img"
                  onClick={() => getMatches(hamsters[rightCount])}
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
            <div className="loading-container">
              <img
                className="loading-img"
                src={LoadingHamster}
                alt="hamster icon"
              />
              <h3 className="loading-text">Loading...</h3>
            </div>
          )}
        </>
      )}
      {showRemoveModal && (
        <RemoveModal
          onHamster={removedHamster}
          onClose={toggleRemoveModal}
          onGetHamsters={getHamsters}
        />
      )}
      {showAddHamster && (
        <AddHamster onClose={toggleAddModal} onGetHamsters={getHamsters} />
      )}
    </div>
  );
};

export default Gallery;
