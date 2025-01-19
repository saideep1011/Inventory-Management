// src/Navbar.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleUserType } from "../slices/userSlice";

const Navbar: React.FC = () => {
  const userType = useSelector((state: any) => state.user.userType);
  const dispatch = useDispatch();

  const handleUser = () => {
    dispatch(toggleUserType());
  };

  return (
    <nav
      className="bg-black text-white p-4 fixed top-0 left-0 right-0 z-10"
      style={{ backgroundColor: "#161718" }}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleUser}
      >
        <h1 className="text-xl font-bold w-full capitalize flex items-start justify-end">
          {userType}
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
