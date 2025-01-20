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
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
          <div className="md:col-span-2 lg:col-span-2 order-1 flex flex-col gap-5">
            <DashboardCard
              title="Total Surveys"
              className="animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold pb-2">Total Created</h3>
                  <div className="text-8xl font-semibold text-blue-500">
                    {data.totalSurveys}
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Total Answers"
              className="animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold pb-2">Total Responses</h3>
                  <div className="text-8xl font-semibold text-green-500">
                    {data.totalAnswers}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          <DashboardCard
            title="Latest Survey"
            className="order-2 lg:col-span-1 row-span-2 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {data.latestSurvey && (
              <div>
                <img
                  src={data.latestSurvey.image_url}
                  className="w-[240px] mx-auto rounded-lg shadow-md"
                />
                <h3 className="font-bold text-xl mb-3 mt-4">
                  {data.latestSurvey.title}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium">Create Date:</div>
                    <div>{data.latestSurvey.created_at}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium">Expire Date:</div>
                    <div>{data.latestSurvey.expire_date}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium">Status:</div>
                    <div>{data.latestSurvey.status ? "Active" : "Draft"}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium">Questions:</div>
                    <div>{data.latestSurvey.questions}</div>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="font-medium">Answers:</div>
                    <div>{data.latestSurvey.answers}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <TButton to={`/surveys/${data.latestSurvey.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Survey
                  </TButton>

                  <TButton to={`/surveys/${data.latestSurvey.id}/answers`} link>
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
