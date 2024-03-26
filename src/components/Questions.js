import Options from "./Options";

export default function Questions({ questions, dispatch, index, isAnswer }) {
  return (
    <div>
      <h4>{questions[index]?.question}</h4>
      {questions[index]?.options.map((opt, i) => (
        <Options
          opt={opt}
          dispatch={dispatch}
          isAnswer={isAnswer}
          key={i}
          questions={questions}
          index={index}
          i={i}
        />
      ))}
    </div>
  );
}
