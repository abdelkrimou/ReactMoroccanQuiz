export default function NextButton({ dispatch, index, questions }) {
  return index + 1 === questions.length ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finish quiz" })}
    >
      Show Results
    </button>
  ) : (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}
