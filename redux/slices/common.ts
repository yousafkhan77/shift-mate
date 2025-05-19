import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Toast {
  message: string;
  type: string;
}

const initialState: {
  toast: Toast | null;
  store: { [key: string]: any };
} = {
  store: {},
  toast: null,
};

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    updateToastMessage(
      state,
      action: PayloadAction<{ message: string; type: string } | null>
    ) {
      state.toast = action.payload;
    },

    updateStore(state, action: PayloadAction<{ key: string; value: any }>) {
      state.store = {
        ...state.store,
        [action.payload.key]: action.payload.value,
      };
      AsyncStorage.setItem(
        action.payload.key,
        JSON.stringify(action.payload.value)
      );
    },

    removeStore(state) {
      state.store = {};
    },
  },
});

export const commonReducer = commonSlice.reducer;
export const { updateToastMessage, updateStore, removeStore } =
  commonSlice.actions;

export const getStore = (state: RootState) => state.commonSlice.store;
