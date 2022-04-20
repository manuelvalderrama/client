import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Plantillas from "../pages/plantillas";
export default function MyRoutes({ Plantilla }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="plantilla"
          element={<Plantillas Plantilla={Plantilla} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
