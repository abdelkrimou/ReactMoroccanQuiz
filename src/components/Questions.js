import Options from "./Options";
import { useQuiz } from "./QuizContext";

export default function Questions() {
  const { questions, index } = useQuiz();
  return (
    <div>
      <h4>{questions[index]?.question}</h4>
      {questions[index]?.options.map((opt, i) => (
        <Options opt={opt} key={i} i={i} />
      ))}
    </div>
  );
}
