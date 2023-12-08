import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { User } from "../types/models/user";
import { getUserData } from "../fetch-user";
import { backendErrorHandle } from "../backend-error-handle";

export interface DashboardUserDataState {
  userData?: User;
  isLoading: boolean;
  errorMsg?: string;
}

export const getUserDataThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("dashboard-user-data/get-user-data", async (_, { rejectWithValue }) => {
  try {
    return await getUserData();
  } catch (error) {
    return rejectWithValue(backendErrorHandle(error));
  }
});

const initialState: DashboardUserDataState = {
  isLoading: false,
};
export const dashboardUserDataSlice = createSlice({
  name: "dashboard-user-data",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload;
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      });
  },
});
