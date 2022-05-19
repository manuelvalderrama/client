import React from "react";
import Missing from "../pages/404";
import { useAppContext } from "../../context/contextapp";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Plantillas from "../pages/plantillas";
import Login from "../pages/Login";
import Header from "../Header";
import Sidebar from "../Sidebar";
import PrivateRoute from "../privateRoute";
import PublicRoute from "../publicRoute";

export default function MyRoutes({ Plantilla }) {
  const { handleSubmit, changeRemember, logout } = useAppContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className=" max-h-screen">
            <Header logout={logout} />
            <div className="relative flex min-h-screen">
              <Sidebar />
              <div
                style={{ maxWidth: "90%", maxHeight: "100%" }}
                className="bg-white pt-20 "
              >
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </div>
            </div>
          </div>
        }
      />

      <Route
        path="plantilla"
        element={
          <div className=" max-h-screen">
            <Header logout={logout} />
            <div className="relative flex min-h-screen">
              <Sidebar />
              <div
                style={{ maxWidth: "90%", maxHeight: "100%" }}
                className="bg-white pt-20 "
              >
                <PrivateRoute>
                  <Plantillas Plantilla={Plantilla} />
                </PrivateRoute>
              </div>
            </div>
          </div>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login
              handleSubmit={handleSubmit}
              changeRemember={changeRemember}
            />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}
