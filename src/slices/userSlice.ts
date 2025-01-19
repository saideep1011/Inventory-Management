// src/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userType: string;
}

const initialState: UserState = {
  userType: "admin",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleUserType: (state) => {
      state.userType = state.userType === "admin" ? "user" : "admin";
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
  },
});

export const { toggleUserType, setUserType } = userSlice.actions;
export default userSlice.reducer;
