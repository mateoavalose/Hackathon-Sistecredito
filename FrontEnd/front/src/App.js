// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CRUD from "./pages/CRUD";
import NotFound from "./components/NotFound";
import Prediction from "./components/Prediction";
import HomePage from "./pages/Home";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/CRUD" element={<CRUD />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
