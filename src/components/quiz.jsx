import React, { useState, useEffect } from 'react';
import { quizData } from './quizData';
import './Quiz.css';

const Quiz = ({ startLevel, setCurrentRoute }) => {
  const [currentLevel, setCurrentLevel] = useState(startLevel);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null); // null, 'correct', or 'wrong'
  const [isAnswering, setIsAnswering] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestionData = quizData[currentLevel]?.[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (isAnswering) return; // Prevent multiple clicks during feedback

    setIsAnswering(true);
    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      if (isCorrect) {
        setCorrectAnswersCount(prev => prev + 1);
      }
      setAnswerStatus(null);
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswering(false);
    }, 1500); // Show feedback for 1.5 seconds
  };
  
  // Effect to handle level progression
  useEffect(() => {
    // Check if the level is complete (3 questions answered)
    if (currentQuestionIndex === 3) {
      if (correctAnswersCount === 3) { // All answers were correct
        const nextLevel = currentLevel + 1;
        if (quizData[nextLevel]) {
          // Progress to the next level
          setCurrentLevel(nextLevel);
          setCurrentQuestionIndex(0);
          setCorrectAnswersCount(0);
        } else {
          // All levels completed
          setQuizCompleted(true);
        }
      } else {
        // Not all answers were correct, restart the level
         alert("You didn't answer all questions correctly. Restarting level.");
         setCurrentQuestionIndex(0);
         setCorrectAnswersCount(0);
      }
    }
  }, [currentQuestionIndex, correctAnswersCount, currentLevel]);

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-completed-card">
          <h1>Congratulations!</h1>
          <p>You have completed all the levels.</p>
          <button className="quiz-home-button" onClick={() => setCurrentRoute('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestionData) {
    return <div className="quiz-container">Loading question...</div>;
  }

  return (
    <div className="quiz-container">
      <div className={`quiz-card ${answerStatus ? 'blurred' : ''}`}>
        <div className="quiz-header">
          <h2>Level {currentLevel}</h2>
          <p className="question-counter">Q{currentQuestionIndex + 1}</p>
        </div>
        <h3 className="question-text">{currentQuestionData.question}</h3>
        <div className="options-grid">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(option)}
              disabled={isAnswering}
            >
              <span>{String.fromCharCode(65 + index)}</span> {option}
            </button>
          ))}
        </div>
      </div>

      {answerStatus && (
        <div className="feedback-overlay">
          <h1 className={answerStatus === 'correct' ? 'correct-text' : 'wrong-text'}>
            {answerStatus === 'correct' ? 'CORRECT ANSWER' : 'WRONG ANSWER'}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Quiz;

