import "./RemoveModal.css";

const RemoveModal = (props) => {
  const deleteHamster = async () => {
    await fetch(`hamsters/${props.onHamster.id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
      body: null,
    });
    props.onClose();
    window.location.reload();
  };

  return (
    <div className="remove-modal-container">
      <img
        src={require(`../../assets/${props.onHamster.imgName}`).default}
        alt="Hamster"
        className="remove-img"
      />
      <div className="remove-inner-container">
        <h1>
          Are you sure you want <br /> to remove{" "}
          <span className="remove-name">{props.onHamster.name}</span>.
        </h1>
        <div>
          <button className="remove-no remove-button" onClick={props.onClose}>
            No
          </button>
          <button className="remove-yes remove-button" onClick={deleteHamster}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
