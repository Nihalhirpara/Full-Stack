import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../pages/ProtectedRoute";
import Home from "./component/Home/Home";
import Sofas from "./component/Sofa/Sofas";
import SofaDetails from "./component/SofaDetails/SofaDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Admin from "./component/Admin/Admin";
import UserList from "./component/Admin/Userlist";
import Category from "./component/Admin/Category";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            
              <Login />
             
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/sofa/:id" element={<SofaDetails />} />

        {/* Admin Layout with nested routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="users" element={<UserList />} />
          <Route path="category" element={<Category />} />
        </Route>

        <Route
          path="*"
          element={<h2 className="text-center mt-10">404 - Page Not Found</h2>}
        />
      </Routes>

      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default App;
