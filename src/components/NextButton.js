import { useQuiz } from "./QuizContext";

export default function NextButton() {
  const { dispatch, index, questions } = useQuiz();
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
