import React, { useState, useEffect } from 'react';
import quizData  from './quizData';
import './Quiz.css';

const Quiz = ({ level, setCurrentRoute }) => {
    // Props `level` is 1-5, our data is 0-indexed, so we subtract 1
    const [currentLevel, setCurrentLevel] = useState(level - 1);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedback, setFeedback] = useState(''); // 'correct', 'wrong', ''
    const [isAnswered, setIsAnswered] = useState(false);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    useEffect(() => {
        // This effect runs whenever the level or question index changes
        const levelData = quizData[currentLevel];
        if (levelData && levelData.items[questionIndex]) {
            setCurrentQuestion(levelData.items[questionIndex]);
            setIsAnswered(false);
            setFeedback('');
        } else {
            // This means we've run out of questions for the current level
            setIsLevelComplete(true);
        }
    }, [currentLevel, questionIndex]);

    const handleAnswer = (selectedIndex) => {
        if (isAnswered) return; // Prevent multiple answers

        setIsAnswered(true);
        if (selectedIndex === currentQuestion.ans) {
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }

        // Wait 1.5 seconds before loading the next question
        setTimeout(() => {
            setQuestionIndex(prevIndex => prevIndex + 1);
        }, 1500);
    };
    
    const handleNextLevel = () => {
        if (currentLevel < quizData.length - 1) {
            setCurrentLevel(prevLevel => prevLevel + 1);
            setQuestionIndex(0);
            setIsLevelComplete(false);
        } else {
            // Last level completed, go back to the knowledge hub
            setCurrentRoute('/knowledge');
        }
    }

    if (isLevelComplete) {
         return (
            <div className="quiz-container completion-screen">
                <h2>Level {currentLevel + 1} Complete!</h2>
                {currentLevel < quizData.length - 1 ? (
                    <button onClick={handleNextLevel}>Go to Level {currentLevel + 2}</button>
                ) : (
                    <button onClick={handleNextLevel}>Finish Quiz</button>
                )}
            </div>
        );
    }
    
    if (!currentQuestion) {
        return <div className="quiz-container loading">Loading question...</div>;
    }

    return (
        <div className="quiz-container">
            <div className={`quiz-card ${feedback}`}>
                <div className="quiz-header">
                    <h2>Level {currentLevel + 1}</h2>
                    <p>Q{questionIndex + 1}</p>
                </div>
                <h3 className="question-text">{currentQuestion.question}</h3>
                <div className="options-grid">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-card ${isAnswered && index === currentQuestion.answer ? 'correct' : ''} ${isAnswered && feedback === 'wrong' && index !== currentQuestion.answer ? 'disabled' : ''}`}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                        >
                            <span>{String.fromCharCode(65 + index)}</span> {option}
                        </button>
                    ))}
                </div>
                 {feedback && <div className={`feedback-overlay ${feedback}-anim`}>{feedback.toUpperCase()} ANSWER</div>}
            </div>
        </div>
    );
};

export default Quiz;

