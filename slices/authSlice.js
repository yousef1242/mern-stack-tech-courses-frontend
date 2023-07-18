import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getCookie("userInfoDataWhenLoginUser")
      ? JSON.parse(getCookie("userInfoDataWhenLoginUser"))
      : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLogout(state, action) {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
