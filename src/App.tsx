// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchLocPage from "./pages/SearchLocPage";
import DirectionPage from "./pages/DirectionPage";
import LoadingPage from "./pages/LoadingPage";
import DriverPage from "./pages/DriverPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchLocPage />} />
        <Route path="/directions" element={<DirectionPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/driver" element={<DriverPage />} />
      </Routes>
    </Router>
  );
};

export default App;