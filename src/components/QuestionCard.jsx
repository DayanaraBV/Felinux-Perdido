import React from 'react';
import './QuestionCard.css';

const labels = ['A', 'B', 'C', 'D'];

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  hiddenOptions,
  selectedAnswer,
  correctAnswer,
  showResult,
  votes,
  voteCounts,
  disabled
}) {
  const getOptionClass = (index) => {
    let cls = 'option-btn';
    if (hiddenOptions.includes(index)) cls += ' option-hidden';
    if (showResult && index === correctAnswer) cls += ' option-correct';
    if (showResult && selectedAnswer === index && index !== correctAnswer) cls += ' option-wrong';
    if (selectedAnswer === index && !showResult) cls += ' option-selected';
    return cls;
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-badge">FIEC - PREGUNTA {questionNumber}</span>
        <div className="question-progress">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div key={i} className={`progress-dot ${i < questionNumber ? 'dot-active' : ''} ${i === questionNumber - 1 ? 'dot-current' : ''}`} />
          ))}
        </div>
      </div>

      <p className="question-text">{question.question}</p>

      <div className="options-grid">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => onAnswer(index)}
            disabled={hiddenOptions.includes(index) || disabled}
          >
            <span className="option-label">{labels[index]}</span>
            <span className="option-text">{option}</span>
            {votes && !hiddenOptions.includes(index) && (
              <span className="option-votes">
                <span className="votes-bar" style={{ width: `${votes[index]}%` }}></span>
                <span className="votes-number">{votes[index]}%</span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
