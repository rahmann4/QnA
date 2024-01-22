import { React, useState, useEffect } from 'react';
import axios from 'axios';

  const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  useEffect(() => {
      const fetchQuestions = async () => {
      const response = await axios.get('http://localhost:3001/question');
      setQuestions(response.data);
    };

    fetchQuestions();
  }, []);

  const handleEdit = async (id, updatedQuestion) => { // edits question and deletes status column?
    try {
      await axios.put(`http://localhost:3001/question/${id}`, {
        question: updatedQuestion
      });

      setQuestions((prevQuestions) =>
        prevQuestions.map((questionObj) =>
          questionObj.id === id
            ? { ...questionObj, question: updatedQuestion, status: 'approved' }
            : questionObj
        )
      );

      setEditingQuestionId(null);
    } catch (error) {
      console.error('Error editing the question');
    }
  };

  const handleApprove = async (id, question) => {
    const userConfirmed = window.confirm('Are you sure you want to approve this question?');

    if (userConfirmed) {
      await axios.put(`http://localhost:3001/question/${id}`, { //change status and deletes questions
      status: 'approved',
      });
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {questions.map((questionObj) => (
          <li key={questionObj.id}>
            {editingQuestionId === questionObj.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedQuestion =
                    e.target.elements.updatedQuestion.value;
                  handleEdit(questionObj.id, updatedQuestion);
                }}
              >
                <input
                  type="text"
                  name="updatedQuestion"
                  defaultValue={questionObj.question}
                />
                <button type="submit">Finish Editing</button>
              </form>
            ) : (
              <div>
                {questionObj.question}{' '}
                <button onClick={() => setEditingQuestionId(questionObj.id)}>
                  Edit
                </button>{' '}
                <button onClick={() => handleApprove(questionObj.id)}>
                  Approve
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;