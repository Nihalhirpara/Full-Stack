import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { RegisterUser } from "../api/Auth";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    console.log("formdata", formData);

    const body = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await RegisterUser(body);
      console.log("response", response);

      if (response?.data) {
        toast.success("Registration successful!", {
          autoClose: 2000,
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/");
          form.reset();
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      if (error.response?.status === 409) {
        toast.error("User already exists!", {
          autoClose: 2000,
          position: "top-center",
        });
      } else {
        toast.error("Registration failed", {
          autoClose: 2000,
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className=" p-10 rounded-lg shadow-lg  max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
           <label htmlFor="email" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 border rounded pr-10 pt-6"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            // style={{ backgroundColor: "blue" }}
            className="w-full bg-blue-600 text-white  py-2 rounded hover:bg-blue-700 transition appearance-none focus:outline-none"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
