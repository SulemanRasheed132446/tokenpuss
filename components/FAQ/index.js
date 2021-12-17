import React, { useState } from "react";

const Question = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="question-container" onClick={() => setOpen(!open)}>
      <div className="question-detail">
        <p className={`question ${open ? "question--active": ""}`}>{question}?</p>
        <img
          src="/Tick.svg"
          className={`question-icon ${open ? "question-icon--active" : ""}`}
        />
      </div>
      <p className={`answer ${open ? "answer--active" : ""}`}>{answer}</p>
    </div>
  );
};

export default Question;
