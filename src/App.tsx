// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import InventoryPage from "./pages/InventoryPage";
import store from "./store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-black min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<InventoryPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
