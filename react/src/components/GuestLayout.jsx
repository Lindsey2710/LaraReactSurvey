import { Navigate, Outlet } from "react-router-dom";
import surveyImage from "../assets/survey.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Surveys"
            src={surveyImage}
            className="mx-auto h-12 w-auto"
          />
        </div>
        <Outlet />
      </div>
    </>
  );
}
