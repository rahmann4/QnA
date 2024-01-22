import { React, useEffect, useState } from 'react';
import axios from 'axios';

const ApprovedQuestions = () => {
  const [approvedQuestions, setApprovedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/question');
        const allQuestions = response.data;
        const filteredQuestions = allQuestions.filter((questionObj) => questionObj.status === 'approved');
        setApprovedQuestions(filteredQuestions);
      } catch (error) {
        console.error('Error');
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Approved Questions</h1>
      <ul>
        {approvedQuestions.map((questionObj) => (
          <li key={questionObj.id}>{questionObj.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovedQuestions;