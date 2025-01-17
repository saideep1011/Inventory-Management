// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import InventoryPage from "./pages/InventoryPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<InventoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
