import { Navigate, Outlet } from "react-router-dom";
import surveyImage from "../assets/survey.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-400/80 via-purple-400/80 to-indigo-400/80">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${surveyImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Content Container */}
      <div className="w-full max-w-md mx-auto p-6 relative">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4">
            <img
              alt="Surveys"
              src={surveyImage}
              className="h-16 w-auto drop-shadow-xl"
            />
            <h1 className="text-3xl font-bold">
              {'PalSurveys'.split('').map((letter, index) => (
                <span 
                  key={index} 
                  className="relative text-black mx-[1px] animate-pulse"
                  style={{
                    textShadow: `
                      0 0 7px #4ade80,
                      0 0 10px #4ade80,
                      0 0 21px #4ade80,
                      0 0 42px #22c55e,
                      0 0 82px #22c55e,
                      0 0 92px #22c55e
                    `
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full backdrop-blur-sm bg-white/70 rounded-2xl shadow-2xl p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
