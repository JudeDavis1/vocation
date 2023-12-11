import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Project, User } from "../types/models/user";
import { getUserData } from "../fetch-user";
import { backendErrorHandle } from "../backend-error-handle";

export interface DashboardUserDataState {
  userData?: User;
  isLoading: boolean;
  errorMsg?: string;

  // Project being edited
  // If undefined, none are being edited
  editingProjectId?: Project["id"];
  // Actual edits being applied to the project
  projectEdits?: Partial<Project>;
}

interface UpdateUserProjectPayload {
  projectId: Project["id"];
  updates: Partial<Project>;
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
  reducers: {
    setEditingProjectId: (
      state,
      action: PayloadAction<Project["id"] | undefined>
    ) => {
      state.editingProjectId = action.payload;
    },
    setProjectEdits: (
      state,
      action: PayloadAction<Partial<Project> | undefined>
    ) => {
      state.projectEdits = action.payload;
    },
    updateUserProject: (
      state,
      action: PayloadAction<UpdateUserProjectPayload>
    ) => {
      if (state.userData?.projects === undefined) {
        return;
      }

      const { projectId, updates } = action.payload;

      // Find the project index to update
      const idx = state.userData.projects.findIndex(
        (proj) => proj.id === projectId
      );
      if (idx === -1) {
        // Project was not found
        return;
      }

      // Update the state
      state.userData.projects[idx] = {
        ...state.userData.projects[idx],
        ...updates,
      };
    },
  },
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
