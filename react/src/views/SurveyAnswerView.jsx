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
          <div className="animate-pulse text-indigo-600 text-xl">Loading...</div>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title="Survey Answers">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100" />
      
      <div className="max-w-4xl mx-auto">
        {answers.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <h3 className="text-gray-600 text-2xl font-semibold">No answers have been submitted yet.</h3>
          </div>
        ) : (
          <div className="space-y-8">
            {answers.map((answer, index) => (
              <div 
                key={index} 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Response #{index + 1}
                  </h3>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium shadow-sm">
                    {answer.question_answers.length} Answers
                  </span>
                </div>
                
                <div className="space-y-6">
                  {answer.question_answers.map((qa, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm flex items-center justify-center mr-3">
                          {idx + 1}
                        </span>
                        {qa.question.question || "Question not found"}
                      </div>
                      <div className="ml-9 text-gray-600 bg-gray-50/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
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
