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
import { useQuiz } from "./QuizContext";

// fakeAPI: "http://localhost:8000/questions"

export default function App() {
  const { start, finish, isError, isLoading, isAnswer } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {!start && !finish && !isError && !isLoading ? <Start /> : null}
        {isLoading && <Loader />}
        {isError && <Error />}
        {start && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              {isAnswer && <NextButton />}
            </Footer>
          </>
        )}
      </Main>
      {!isError && finish ? <Finish /> : null}
    </div>
  );
}
