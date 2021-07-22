import { useEffect, useState } from "react";
import MatchHistory from "./MatchHistory";
import RemoveModal from "./RemoveModal";
import AddHamster from "./AddHamster";
import LoadingHamster from "../../assets/loading-hamster.png";
import "./Gallery.css";

const Gallery = () => {
  const [hamsters, setHamsters] = useState(null);
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

  const toggleRemoveModal = (hamster) => {
    setShowRemoveModal((prevState) => {
      return !prevState;
    });
    setRemovedHamster(hamster);
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
            <div className="grid-container">
              {hamsters.map((hamster) => {
                return (
                  <div className="box" key={hamster.id}>
                    <h1>{hamster.name}</h1>
                    <img
                      src={require(`../../assets/${hamster.imgName}`).default}
                      alt="hamster"
                      title="Click to see which hamsters this hamster has defeated."
                      className="gallery-img"
                      onClick={() => getMatches(hamster)}
                    />
                    <div className="gallery-button-container">
                      <button
                        className="gallery-add gallery-button"
                        onClick={toggleAddModal}
                      >
                        Add <br /> Hamster
                      </button>
                      <button
                        className="gallery-remove gallery-button"
                        onClick={() => toggleRemoveModal(hamster)}
                      >
                        Remove <br /> Hamster
                      </button>
                    </div>
                  </div>
                );
              })}
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
