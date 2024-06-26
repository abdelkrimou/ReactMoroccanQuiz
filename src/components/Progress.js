import { useQuiz } from "./QuizContext";

export default function Progress() {
  const { index, isAnswer, points, questions, totalPoints } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={isAnswer ? index + 1 : index}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/{questions.length}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints} Points
      </p>
    </header>
  );
}
