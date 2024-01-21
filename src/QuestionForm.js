import React, { useState } from 'react';
const QuestionForm = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        console.log('Question submitted successfully');
        setQuestion('');
      } else {
        console.error('Error submitting question');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div>
      <h1>Question Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuestionForm;