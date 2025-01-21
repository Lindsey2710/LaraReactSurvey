import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/dashboard`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  }, []);

  return (
    <PageComponent title="Dashboard">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100" />
      
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-indigo-600 text-xl">Loading...</div>
        </div>
      )}
      
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
          <div className="md:col-span-2 lg:col-span-2 order-1 flex flex-col gap-5">
            <DashboardCard
              title="Total Surveys"
              className="animate-fade-in-up bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center">
                <div className="flex-1">
                 
                  <div className="text-8xl font-semibold text-white drop-shadow-lg">
                    {data.totalSurveys}
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Total Answers"
              className="animate-fade-in-up bg-gradient-to-br from-purple-500 to-pink-600 text-white"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  
                  <div className="text-8xl font-semibold text-white drop-shadow-lg">
                    {data.totalAnswers}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          <DashboardCard
            title="Latest Survey"
            className="order-2 lg:col-span-1 row-span-2 animate-fade-in-up bg-white backdrop-blur-sm bg-opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300"
            style={{ animationDelay: '0.3s' }}
          >
            {data.latestSurvey && (
              <div>
                <img
                  src={data.latestSurvey.image_url}
                  className="w-[240px] mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                />
                <h3 className="font-bold text-xl mb-3 mt-4 text-gray-800">
                  {data.latestSurvey.title}
                </h3>
                <div className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium text-gray-700">Create Date:</div>
                    <div className="text-gray-600">{data.latestSurvey.created_at}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium text-gray-700">Expire Date:</div>
                    <div className="text-gray-600">{data.latestSurvey.expire_date}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium text-gray-700">Status:</div>
                    <div className="text-gray-600">{data.latestSurvey.status ? "Active" : "Draft"}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium text-gray-700">Questions:</div>
                    <div className="text-gray-600">{data.latestSurvey.questions}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium text-gray-700">Answers:</div>
                    <div className="text-gray-600">{data.latestSurvey.answers}</div>
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <TButton 
                    to={`/surveys/${data.latestSurvey.id}`} 
                    link
                    className="flex-1 text-center"
                  >
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Survey
                  </TButton>

                  <TButton 
                    to={`/surveys/${data.latestSurvey.id}/answers`} 
                    link
                    className="flex-1 text-center"
                  >
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Answers
                  </TButton>
                </div>
              </div>
            )}
            {!data.latestSurvey && (
              <div className="text-gray-600 text-center py-16">
                You do not have surveys yet
              </div>
            )}
          </DashboardCard>
        </div>
      )}
    </PageComponent>
  );
}
