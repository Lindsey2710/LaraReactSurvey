import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";

const SurveyAnswersView = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get(`/surveys/${id}/answers`)
      .then(({ data }) => {
        setAnswers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Survey Answers</h1>
      {answers.length === 0 && (
        <div>No answers have been submitted yet.</div>
      )}
      {answers.map((answer, index) => (
        <div key={index} className="p-4 mb-4 border rounded">
          <h3>Answer {index + 1}:</h3>
          <ul>
            {answer.question_answers.map((qa, idx) => (
              <li key={idx}>
                <strong>{qa.question.text}:</strong> {renderAnswer(qa)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const renderAnswer = (qa) => {
  if (qa.question.type === 'checkbox') {
    return JSON.parse(qa.answer).join(', ');
  }
  return qa.answer;
};

export default SurveyAnswersView;


