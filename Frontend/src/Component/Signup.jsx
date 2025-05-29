import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../ContextApi/AuthContext";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    // const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),

            });

            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setUser({ name: data.name });
                navigate("/");
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error("Signup failed:", err);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                background: "linear-gradient(135deg, #f0f7f4 0%, #c8e6c9 50%, #a5d6a7 100%)",
                backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2830&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md border border-green-100"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-green-800">
                    🌱 Create Account
                </h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
                >
                    Register Now
                </button>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-green-600 hover:underline font-medium"
                    >
                        Log In
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Signup;