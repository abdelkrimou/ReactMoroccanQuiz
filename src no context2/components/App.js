import Header from "./Header";
import Main from "./Main";
import Start from "./Start";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Footer from "./Footer";
import Finish from "./Finish";
import Loader from "./Loader";
import Error from "./Error";
import Timer from "./Timer";
import { useReducer, useState, useEffect } from "react";

// fakeAPI: "http://localhost:8000/questions"

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

export default function App() {
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
    <div className="app">
      <Header />
      <Main>
        {!start && !finish && !isError && !isLoading ? (
          <Start dispatch={dispatch} questions={questions} />
        ) : null}
        {isLoading && <Loader />}
        {isError && <Error />}
        {start && (
          <>
            <Progress
              index={index}
              isAnswer={isAnswer}
              questions={questions}
              totalPoints={totalPoints}
              points={points}
            />
            <Questions
              isAnswer={isAnswer}
              dispatch={dispatch}
              index={index}
              questions={questions}
            />
            <Footer>
              <Timer questions={questions} dispatch={dispatch} />
              {isAnswer && (
                <NextButton
                  dispatch={dispatch}
                  questions={questions}
                  index={index}
                />
              )}
            </Footer>
          </>
        )}
      </Main>
      {!isError && finish ? (
        <Finish dispatch={dispatch} points={points} totalPoints={totalPoints} />
      ) : null}
    </div>
  );
}
