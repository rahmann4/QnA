import { React, useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Confirm = window.confirm('Submit the question?');

    if (Confirm) {
      try {
        await axios.post('http://localhost:3001/question', {
          question,
          status: 'pending',
        });
        setQuestion('');
      }
      
      catch (error) {
        console.error('Error submitting the question');
        window.alert('Error submitting the question.');
      }
    }
  };

  return (
      <div>
        <h1>Question Form</h1>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          <button type="submit">Submit</button>
        </form>
      </div>
  );
};

export default QuestionForm;