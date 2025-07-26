import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Category from "../Admin/Category";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "SecurePass@123";

  // const handleLogout = () => {
  //   localStorage.removeItem("auth"); // Remove token
  //   localStorage.removeItem("user"); // Optional: also remove user info
  //   navigate("/");
  // };
  // const fetchAdminData = async () => {
  //   const token = localStorage.getItem("auth");

  //   const res = await axios.get("http://localhost:5000/api/admin-data", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   return res.data;
  // };

  // useEffect(() => {
  //   fetchAdminData()
  //     .then((data) => setData(data))
  //     .catch((err) => console.error(err));
  // }, []);

  
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white shadow p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/admin"
            className={isActive("/admin") ? "text-blue-500 font-semibold" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className={
              isActive("/admin/users") ? "text-blue-500 font-semibold" : ""
            }
          >
            User List
          </Link>
          <Link
            to="/admin/category"
            className={
              isActive("/admin/category") ? "text-blue-500 font-semibold" : ""
            }
          >
            Category
          </Link>
          <button
            onClick={() => {
              localStorage.clear(); // or remove token/auth logic
              window.location.href = "/";
              onClick = { handleLogout };
            }}
            className=" rounded hover:bg-red-100 transition text-red-600 text-left"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
