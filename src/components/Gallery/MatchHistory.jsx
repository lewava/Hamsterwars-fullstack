import "./MatchHistory.css";

const MatchHistory = (props) => {
  console.log(props.onLosers);
  const renderedList = props.onLosers.map((hamster) => {
    return <li key={hamster.id}>{hamster.name}</li>;
  });

  return (
    <div>
      <ul>{renderedList}</ul>
    </div>
  );
};

export default MatchHistory;
