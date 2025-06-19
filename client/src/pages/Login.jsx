import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert("Please fill in all fields");
            return;
        }

        dispatch(loginUser(formData)).then((res) => {
            if (!res.error) {
                navigate("/dashboard");
            }
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700"
            >
                <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
                    Login
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-indigo-400 font-semibold cursor-pointer hover:underline"
                    >
                        Register here
                    </span>
                </p>
            </form>
        </div>
    );
}
