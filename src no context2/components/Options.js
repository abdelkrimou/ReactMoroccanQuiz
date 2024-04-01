export default function Options({
  questions,
  index,
  opt,
  isAnswer,
  dispatch,
  i,
}) {
  return (
    <div className="options">
      <button
        className={`btn btn-option
          ${
            isAnswer
              ? questions[index].correctOption === i
                ? " answer correct"
                : "wrong"
              : null
          }`}
        onClick={() =>
          dispatch({
            type: "answered",
            payload:
              questions[index].correctOption === i
                ? questions[index].points
                : 0,
          })
        }
        disabled={isAnswer}
      >
        {opt}
      </button>
    </div>
  );
}
