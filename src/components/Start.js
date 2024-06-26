import { useQuiz } from "./QuizContext";

export default function Start() {
  const { dispatch, questions } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the Moroccan Quiz !</h2>
      <h3>
        {questions.length} Questions to test your culture knowledge about
        Morocco
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "fetch questions" })}
      >
        Let's Start
      </button>
    </div>
  );
}
