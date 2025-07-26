// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { LoginUser } from "../api/Auth";
// import { toast, ToastContainer } from "react-toastify";

// // const Login = () => {
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const form = e.target;
// //     const formData = new FormData(form);

// //     const body = {
// //       email: formData.get("email"),
// //       password: formData.get("password"),
// //     };

// //     try {
// //       const res = await LoginUser(body);
// //       console.log("Login response", res);

// //       toast.success("Login successful!", {
// //         autoClose: 2000,
// //         position: "top-right",
// //       });

// //       // Save user/session info (optional)
// //       localStorage.setItem("user", JSON.stringify(res.data.user));

// //       setTimeout(() => {
// //         navigate("/head"); // 👈 or /dashboard
// //       }, 2000);
// //     } catch (err) {
// //       console.error("Login error", err);
// //       toast.error(err.response?.data?.message || "Login failed", {
// //         autoClose: 2000,
// //         position: "top-center",
// //       });
// //     }
// //   };

// const Login = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);

//     const body = {
//       email: formData.get("email"),
//       password: formData.get("password"),
//     };

//     try {
//       const res = await LoginUser(body);
//       console.log("Login response", res);

//       toast.success("Login successful!", {
//         autoClose: 2000,
//         position: "top-right",
//       });

//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       const isadmin =
//         body.email === "nihal1@gmail.com" && body.password === "Nihal@123";

//       setTimeout(() => {
//         if (isadmin) {
//           navigate("/admin");
//         } else {
//           navigate("/home");
//         }
//       }, 2000);
//     } catch (err) {
//       console.error("Login error", err);
//       toast.error(err.response?.data?.message || "Login failed", {
//         autoClose: 2000,
//         position: "top-center",
//       });
//     }
//   };

//   return (
//     <div className="bg-gray-200" style={{}}>
//       <div
//         className="bg-white p-10 rounded-lg shadow-lg"
//         style={{ width: "400px", margin: "100px auto" }}
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Login
//         </h2>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="Email"
//               className="w-full px-4 py-2 border rounded"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               placeholder="Password"
//               className="w-full px-4 py-2 border rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             style={{ backgroundColor: "blue" }}
//             className="w-full py-2 mt-4 text-white bg-blue-600  rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/register" className="text-blue-500  hover:underline">
//             Register
//           </a>
//         </p>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../api/Auth";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await LoginUser(body);
      const { token, user } = res.data;

      console.log("Login response", res.data.token);

      localStorage.setItem("auth", res.data.token); // ✅ Not undefined
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Saved token:", res.data.token);

      toast.success("Login successful!", {
        autoClose: 2000,
        position: "top-right",
      });
      const ADMIN_EMAIL = "admin@gmail.com";
      const ADMIN_PASSWORD = "Admin@123";

      const isAdmin =
        body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD;

      setTimeout(() => {
        // 🔒 Navigate based on user role (optional)
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      console.error("Login error", err);
      toast.error(err.response?.data?.message || "Login failed", {
        autoClose: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-gray-200">
      <div
        className="bg-white p-10 rounded-lg shadow-lg"
        style={{ width: "400px", margin: "100px auto" }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 border rounded pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "blue" }}
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
