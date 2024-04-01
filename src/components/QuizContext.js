import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
const QuizContexter = createContext();
const initialStates = {
  start: false,
  isLoading: false,
  finish: false,
  isAnswer: false,
  isError: false,
  index: 0,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "fetch questions":
      if (!state.isLoading && !state.isError) return { ...state, start: true };
      else return state;
    case "next":
      return { ...state, index: state.index + 1, isAnswer: false };
    case "answered":
      return {
        ...state,
        isAnswer: true,
        points: state.points + action.payload,
      };
    case "loading":
      return { ...state, isLoading: true };
    case "error":
      return { ...state, isError: true };
    case "fetch finished":
      return { ...state, isLoading: false };
    case "finish quiz":
      return { ...state, finish: true, start: false };
    case "restart":
      return { ...initialStates };
    default:
      throw new Error("Action not Known");
  }
}
function QuizContextProvider({ children }) {
  const [
    { start, isLoading, finish, index, isAnswer, points, isError },
    dispatch,
  ] = useReducer(reducer, initialStates);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dispatch({
      type: "loading",
    });
    const fetchQst = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch Questions");
        }
        const data = await response.json();
        setQuestions(data);
        console.log(data);
      } catch (error) {
        dispatch({
          type: "error",
        });
      } finally {
        dispatch({
          type: "fetch finished",
        });
      }
    };

    fetchQst();
  }, []);

  const totalPoints = questions?.reduce(
    (acc, curr) => Number(acc) + Number(curr.points),
    [0]
  );

  return (
    <QuizContexter.Provider
      value={{
        isLoading,
        finish,
        start,
        isError,
        index,
        isAnswer,
        questions,
        totalPoints,
        points,
        dispatch,
      }}
    >
      {children}
    </QuizContexter.Provider>
  );
}
function useQuiz() {
  const quizcontext = useContext(QuizContexter);
  if (quizcontext === undefined)
    throw new Error("This context is used outside of its context provider tag");
  return quizcontext;
}

export { QuizContextProvider, useQuiz };
