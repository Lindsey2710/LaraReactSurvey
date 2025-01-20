import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PageComponent from "../components/PageComponent";

const SurveyAnswersView = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get(`/surveys/${id}/answers`)
      .then(({ data }) => {
        //console.log("API response:", data);
        setAnswers(data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log("API error:", error);
        setLoading(false)
      });
  }, [id]);

  if (loading) {
    return (
      <PageComponent title="Survey Answers">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-600">Loading...</div>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title="Survey Answers">
      <div className="max-w-4xl mx-auto">
        {answers.length === 0 ? (
          <div className="text-center py-8 px-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-gray-600 text-xl">No answers have been submitted yet.</h3>
          </div>
        ) : (
          <div className="space-y-8">
            {answers.map((answer, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-100 transition-all"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-700">
                    Response #{index + 1}
                  </h3>
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {answer.question_answers.length} Answers
                  </span>
                </div>
                
                <div className="space-y-6">
                  {answer.question_answers.map((qa, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="text-lg font-bold text-gray-800 mb-3">
                        {qa.question.question || "Question not found"}
                      </div>
                      <div className="ml-4 text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        {renderAnswer(qa)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageComponent>
  );
};

const renderAnswer = (qa) => {
  if (qa.question && qa.question.type === 'checkbox') {
    return JSON.parse(qa.answer).join(', ');
  }
  return qa.answer;
};

export default SurveyAnswersView;
