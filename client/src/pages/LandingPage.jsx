
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center border border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-400 mb-4">
          Welcome to Task Manager
        </h1>
        <p className="text-md sm:text-lg text-gray-300 mb-6 leading-relaxed">
          Manage your daily tasks with ease and clarity.
          Stay organized, productive, and in control all in one place.
        </p>


        <button
          onClick={handleDashboard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-xl shadow-md transition duration-300 ease-in-out"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
