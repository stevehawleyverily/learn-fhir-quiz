'use client'; // This directive marks the component as interactive

import { useState } from 'react';

export default function Quiz({ quizData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const questions = quizData.questions;
  const currentQuestionData = questions[currentQuestion];

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswerIndex !== null) return;

    setSelectedAnswerIndex(answerIndex);

    if (currentQuestionData.answerOptions[answerIndex].isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswerIndex(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const getButtonClass = (answerIndex) => {
    if (selectedAnswerIndex === null) return '';
    const isCorrect = currentQuestionData.answerOptions[answerIndex].isCorrect;
    if (selectedAnswerIndex === answerIndex) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    if (isCorrect) return 'correct';
    return '';
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 75;

    return (
      <div className="quiz-container">
        <h1>Quiz Results</h1>
        <h2>You scored {score} out of {questions.length} ({percentage}%)</h2>
        <h3 className={passed ? 'pass-message' : 'fail-message'}>
          {passed ? 'Congratulations, you passed!' : 'You did not pass. Please try again.'}
        </h3>
        <button onClick={() => window.location.reload()}>Retry Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="question-header">
        <h1>FHIR for Data Managers Quiz</h1>
        <p>Question {currentQuestion + 1} of {questions.length}</p>
      </div>
      <div className="question-card">
        <h2>{currentQuestionData.question}</h2>
        <div className="answer-options">
          {currentQuestionData.answerOptions.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${getButtonClass(index)}`}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswerIndex !== null}
            >
              {option.text}
            </button>
          ))}
        </div>
        {selectedAnswerIndex !== null && (
          <div className="rationale">
            <p>{questions[currentQuestion].answerOptions[selectedAnswerIndex].rationale}</p>
          </div>
        )}
      </div>
    </div>
  );
}