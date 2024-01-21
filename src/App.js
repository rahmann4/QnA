import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import AdminPage from './AdminPage';
import ApprovedQuestions from './ApprovedQuestions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/questions" element={<ApprovedQuestions/>} />
      </Routes>
    </Router>
  );
};

export default App;