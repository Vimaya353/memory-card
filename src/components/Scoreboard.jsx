function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>
        Score <span>{score}</span>
      </p>
      <p>
        Best <span>{bestScore}</span>
      </p>
    </div>
  );
}

export default Scoreboard;