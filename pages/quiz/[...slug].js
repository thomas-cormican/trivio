import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const fetcher = ([url, params]) =>
  axios.get(`${url}${params}`).then((res) => res.data);

export default function Quiz() {
  const [params, setParams] = useState("");
  const { data, isLoading, isValidating, mutate } = useSWRImmutable(
    ["/api/questions", params],
    fetcher
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(
    Math.floor(Math.random() * 4)
  );
  const [gameOn, setGameOn] = useState(false);
  const [answerList, setAnswerList] = useState([]);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      let categoryString = router.asPath.split("?")[1];
      const [difficulty, questions] = router.query.slug;
      let link = `?difficulty=${difficulty}&questions=${questions}`;
      categoryString && (link = link + "&" + categoryString);
      setParams(link);
    }
  }, [router]);

  useEffect(() => {
    let answers =
      [...new Set(data?.response[currentQuestion].incorrectAnswers)] || [];
    answers.splice(
      correctAnswer,
      0,
      data?.response[currentQuestion].correctAnswer
    );
    setAnswerList(answers);
    setGameOn(true);
  }, [data, currentQuestion]);

  const handleAnswer = (e) => {
    if (showAnswer) return;

    if (e.target.firstChild.textContent == answerList[correctAnswer]) {
      setScore((prev) => prev + 1);
    }

    setShowAnswer(true);

    setTimeout(() => {
      if (currentQuestion + 1 < data.response.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setGameOn(false);
      }

      setCorrectAnswer(Math.floor(Math.random() * 4));
      setShowAnswer(false);
    }, 1000);
  };

  const reset = () => {
    mutate();
    setCurrentQuestion(0);
    setScore(0);
  };

  if (isLoading || isValidating) {
    return (
      <div className="m-auto">
        <CircularProgress />
      </div>
    );
  }

  if (data && data.response.length > 0) {
    //if the game is over
    if (!gameOn) {
      return (
        <div className="flex flex-col items-center justify-center w-full text-center text-[20px]">
          <h1>You scored: {score}</h1>
          <div>
            <button className="w-[150px] m-4 p-4 bg-green" onClick={reset}>
              Try Again?
            </button>
            <Link href="/">
              <button className="w-[150px] m-4 p-4 bg-green">New Quiz</button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full text-center text-[20px] flex-auto">
        <div className="flex flex-col basis-1/2 justify-end">
          <div className="p-[20px] bg-white dark:bg-bgLight rounded-t-md drop-shadow-xl">
            <div className="flex items-center">
              <h1>Question {currentQuestion + 1}</h1>
              <p className="py-2 px-4 w-16 bg-teal text-black rounded-sm text-center ml-auto">
                {score}
              </p>
            </div>

            <h2 className="py-8 px-4 bg-white dark:bg-bgLight mt-4 xs:mb-0">
              {data.response[currentQuestion].question}
            </h2>
          </div>
        </div>
        <div className="flex flex-col className=basis-1/2 justify-start flex-auto">
          <div className="flex flex-wrap justify-between text-white sm:h-full bg-white dark:bg-bgLight rounded-b-md drop-shadow-xl">
            {answerList.map((answer, index) => (
              <div className="min-h-[72px] basis-1/4 md:basis-1/2 sm:p-0.5 mb-[20px] sm:mb-0 sm:w-1/2 overflow-hidden">
                <div
                  onClick={handleAnswer}
                  className={`transition ease-in items-center sm:w-full sm:mt-0 flex justify-center px-2 py-8 w-48 min-h-full ${
                    !showAnswer && "bg-blue hover:bg-blueDark"
                  } m-auto hover:cursor-pointer rounded-sm ${
                    showAnswer && index == correctAnswer
                      ? "bg-green"
                      : showAnswer && !(index == correctAnswer) && "bg-red"
                  } ${
                    index == 0 || index == 2
                      ? `md:m-0 md:ml-auto md:mr-10 sm:m-0`
                      : `md:m-0 md:ml-10 sm:m-0`
                  }`}
                >
                  <p className="text-[16px] min-w-0 break-words pointer-events-none">
                    {answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
