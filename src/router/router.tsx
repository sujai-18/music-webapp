import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "../containers";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
