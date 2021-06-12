import "./AddHamster.css";
import closeButton from "../../assets/close-button.png";
import { useState } from "react";

const AddHamster = (props) => {
  const [name, setName] = useState("");
  const [nameClass, setNameClass] = useState("");
  const [validName, setValidName] = useState(true);

  const [age, setAge] = useState("");
  const [ageClass, setAgeClass] = useState("");
  const [validAge, setValidAge] = useState(true);
  const [checkNumber, setCheckNumber] = useState(true);

  const [favFood, setFavFood] = useState("");
  const [favFoodClass, setFavFoodClass] = useState("");
  const [validFavFood, setValidFavFood] = useState(true);

  const [loves, setLoves] = useState("");
  const [lovesClass, setLovesClass] = useState("");
  const [validLoves, setValidLoves] = useState(true);

  const [imgName, setImgName] = useState("");
  const [imgNameClass, setImgNameClass] = useState("");
  const [validImgName, setValidImgName] = useState(true);

  const validateName = () => {
    if (!name) {
      setNameClass("invalid");
      setValidName(false);
    } else {
      setNameClass("");
      setValidName(true);
    }
  };

  const validateAge = () => {
    if (isNaN(age)) {
      setAgeClass("invalid");
      setCheckNumber(false);
    } else if (!age || age < 1 || age > 15) {
      setAgeClass("invalid");
      setValidAge(false);
    } else {
      setAgeClass("");
      setValidAge(true);
      setCheckNumber(true);
    }
  };

  const validateFavFood = () => {
    if (!favFood) {
      setFavFoodClass("invalid");
      setValidFavFood(false);
    } else {
      setFavFoodClass("");
      setValidFavFood(true);
    }
  };

  const validateLoves = () => {
    if (!loves) {
      setLovesClass("invalid");
      setValidLoves(false);
    } else {
      setLovesClass("");
      setValidLoves(true);
    }
  };

  const validateImgName = () => {
    if (!imgName) {
      setImgNameClass("invalid");
      setValidImgName(false);
    } else {
      setImgNameClass("");
      setValidImgName(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      name &&
      favFood &&
      loves &&
      imgName &&
      !isNaN(age) &&
      age > 0 &&
      age < 16
    ) {
      await fetch("hamsters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          age: Number(age),
          favFood: favFood,
          loves: loves,
          imgName: imgName,
          wins: 0,
          defeats: 0,
          games: 0,
        }),
      });
      props.onClose();
      window.location.reload();
    } else return;
  };

  return (
    <form onSubmit={submitHandler} className="add-container">
      <div className="add-top-container">
        <h1>Add new Hamster</h1>
        <img src={closeButton} alt="Close Button" onClick={props.onClose} />
      </div>

      <div className="add-input-container">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
          value={name}
          className={nameClass}
        />
        {!validName && <h4>Please enter a name for your hamster.</h4>}
      </div>

      <div className="add-input-container">
        <label>Age:</label>
        <input
          type="text"
          onChange={(e) => setAge(e.target.value)}
          onBlur={validateAge}
          value={age}
          className={ageClass}
        />
        {!checkNumber && <h4>You may only use numbers.</h4>}
        {!validAge && <h4>Please choose an age between 1-15.</h4>}
      </div>

      <div className="add-input-container">
        <label>Favorite food:</label>
        <input
          type="text"
          onChange={(e) => setFavFood(e.target.value)}
          onBlur={validateFavFood}
          value={favFood}
          className={favFoodClass}
        />
        {!validFavFood && <h4>Please enter your hamsters favorite food.</h4>}
      </div>

      <div className="add-input-container">
        <label>Loves:</label>
        <input
          type="text"
          onChange={(e) => setLoves(e.target.value)}
          onBlur={validateLoves}
          value={loves}
          className={lovesClass}
        />
        {!validLoves && <h4>Please describe what your hamster loves to do.</h4>}
      </div>

      <div className="add-input-container">
        <label>Img:</label>
        <input
          type="text"
          onChange={(e) => setImgName(e.target.value)}
          onBlur={validateImgName}
          value={imgName}
          className={imgNameClass}
        />
        {!validImgName && <h4>Please enter the file name for your image.</h4>}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default AddHamster;
