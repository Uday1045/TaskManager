import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setIsLoggedIn(!!user?.token);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-3 shadow-md flex justify-between items-center">
            <h1
                onClick={() => navigate("/")}
                className="text-3xl font-bold cursor-pointer"
            >
                Task Manager
            </h1>

            <div className="space-x-4">
                {isLoggedIn ? (
                    <>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="hover:underline"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="hover:underline"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
