import { useEffect, useState } from "react";

export default function Timer({ questions, dispatch }) {
  const [timer, setTimer] = useState(questions.length * 60);
  const minutes = timer / 60;
  const seconds = timer % 60;

  useEffect(
    function () {
      timer === 0 && dispatch({ type: "finish quiz" });

      if (timer === 0) return;
      const timerCount = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(timerCount);
    },
    [timer, questions.length, dispatch]
  );
  return (
    <div className="timer">
      {minutes < 10 ? `0${Math.floor(minutes)}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
