// src/Navbar.tsx
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [userType, setUserType] = useState("admin");
  const handleUser = () => {
    if (userType === "admin") {
      setUserType("user");
    } else {
      setUserType("admin");
    }
  };
  return (
    <nav
      className="bg-black text-white p-4 fixed top-0 left-0 right-0 z-10"
      style={{ backgroundColor: "#161718" }}
    >
      <div
        className="flex items-center justify-between  cursor-pointer"
        onClick={handleUser}
      >
        <h1 className="text-xl font-bold  w-full capitalize flex items-start justify-end">
          {userType}
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
