// src/Navbar.tsx
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white p-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-bold  w-full flex items-start justify-end">
          Inventory Management
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
