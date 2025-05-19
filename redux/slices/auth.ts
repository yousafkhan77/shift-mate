import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateAuth(state, action) {
      state.token = action.payload;
      AsyncStorage.setItem("token", action.payload);
    },

    removeAuth(state, action) {
      state.token = action.payload;
      AsyncStorage.removeItem("token");
    },
  },
});

export const authReducer = authSlice.reducer;

export const { updateAuth, removeAuth } = authSlice.actions;
