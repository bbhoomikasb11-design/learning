import React, { useState } from "react";

const QUESTIONS = [
  {
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useReducer", "useRef"],
    answer: 1,
  },
  {
    question: "What function passes data down through the tree without props?",
    options: ["useContext", "useCallback", "useMemo", "useState"],
    answer: 0,
  },
  {
    question: "JSX stands for...",
    options: ["JS XML", "JS Extension", "JS X-platform", "JS X-ray"],
    answer: 0,
  },
];

export default function QuizApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selectedIdx) => {
    if (selectedIdx === QUESTIONS[currentIdx].answer) {
      setScore(score + 1);
    }
    const nextIdx = currentIdx + 1;
    if (nextIdx < QUESTIONS.length) {
      setCurrentIdx(nextIdx);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div style={{ maxWidth: "450px", margin: "2rem auto", fontFamily: "sans-serif", border: "1px solid #ccc", padding: "1.5rem", borderRadius: "8px" }}>
      {finished ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {QUESTIONS.length}</p>
          <button onClick={restartQuiz}>Try Again</button>
        </div>
      ) : (
        <div>
          <h3>Question {currentIdx + 1} of {QUESTIONS.length}</h3>
          <p style={{ fontSize: "1.1rem" }}>{QUESTIONS[currentIdx].question}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {QUESTIONS[currentIdx].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ padding: "10px", textAlign: "left" }}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}