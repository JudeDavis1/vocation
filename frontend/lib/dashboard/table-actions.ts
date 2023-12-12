"use client";

import axios from "axios";
import { isEqual } from "lodash";
import { Row } from "@tanstack/react-table";

import { requestOptions } from "../request-options";
import { AppDispatch, RootState } from "../stores/root";
import {
  DashboardUserDataState,
  dashboardUserDataSlice,
  getUserDataThunk,
} from "../stores/dashboard-user-data";
import { backendErrorHandle } from "../backend-error-handle";
import { createProjectSchema } from "../types/create-project/form-schema";

import { backendRoutes } from "@/config";
import { Project, ProjectStatus } from "@/lib/types/models/user";
import { toast } from "@/components/ui/use-toast";

const { setEditingProjectId, setProjectEdits } = dashboardUserDataSlice.actions;

export async function updateProject(
  projectId: number,
  newProject: Partial<Project>,
  originalProject: Project,
  dispatch: AppDispatch
) {
  /* 
    Ensure we don't make any unrequired backend calls by
    checking if the new & original project are the same before updating.
  */

  // Make a comparable object to the newProject Partial
  const comparableOriginal = Object.keys(newProject).reduce((acc, key) => {
    if (key in originalProject) {
      acc[key] = originalProject[key];
    }
    return acc;
  }, {} as Partial<Project>);

  if (isEqual(newProject, comparableOriginal)) {
    return;
  }

  const sessionToken = localStorage.getItem("sessionToken");
  await axios.patch(
    backendRoutes.project.update,
    {
      id: projectId,
      ...newProject,
    },
    { headers: { Authorization: sessionToken } }
  );
  dispatch(getUserDataThunk());
}

export async function deleteProject(project: Project) {
  await axios({
    method: "delete",
    url: backendRoutes.project.delete,
    data: { id: project.id },
    ...requestOptions(),
  });
}

export async function deleteBatchAndUpdate(
  state: DashboardUserDataState,
  rowSelection: Record<number, boolean>,
  dispatch: AppDispatch
) {
  // If a row can be selected, the state.userData.projects shouldn't be undefined
  // But just please the type checker
  if (state.userData?.projects === undefined) {
    return;
  }

  // Get selected keys and delete the associated project(s)
  const projects = state.userData.projects;
  try {
    await Promise.all(
      Object.keys(rowSelection).map(async (item) => {
        const idx = parseInt(item);
        const project = projects[idx];

        return deleteProject(project);
      })
    );
    // Update user data store
    dispatch(getUserDataThunk());
    toast({
      title: "Success",
      description: `Successfully deleted ${
        Object.keys(rowSelection).length
      } Project(s)`,
      variant: "success",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}

export function onUpdateProject(
  state: RootState["dashboardUserData"],
  dispatch: AppDispatch,
  projectEditsRef: React.MutableRefObject<Partial<Project> | undefined>
) {
  console.log(projectEditsRef.current);
  return async (row: Row<Project>) => {
    if (
      !state.editingProjectId ||
      !projectEditsRef.current ||
      !state.userData?.projects
    ) {
      return;
    }

    // Ensure the project matches the schema requirements
    const originalProjectIdx = state.userData.projects.findIndex(
      (p) => p.id === state.editingProjectId
    );
    if (originalProjectIdx === -1) {
      toast({
        title: "Error",
        description: "Could not find project. Please try refreshing the page.",
        variant: "destructive",
      });
      return;
    }

    // Ensure the project matches the schema requirements
    const parseResult = createProjectSchema.safeParse({
      // Destruct the old project to ensure the fields are still there
      ...state.userData.projects[originalProjectIdx],
      // (this destructure will overwrite the old one...)
      ...projectEditsRef.current,
    });
    if (!parseResult.success) {
      toast({
        title: "Error",
        description: parseResult.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    try {
      await updateProject(
        row.original.id,
        projectEditsRef.current,
        row.original,
        dispatch
      );
      // Update user data store
      dispatch(getUserDataThunk());

      // Reset edit state
      cleanupProjectEdits(dispatch, projectEditsRef);
    } catch (error) {
      toast({
        title: "Error",
        description: backendErrorHandle(error),
        variant: "destructive",
      });
    }
  };
}

export function onProjectEdit(dispatch: AppDispatch) {
  return async (row: Row<Project>) => {
    dispatch(setEditingProjectId(row.original.id));
  };
}

export function onEditCancel(
  dispatch: AppDispatch,
  projectEditsRef: React.MutableRefObject<Partial<Project> | undefined>
) {
  return async () => {
    cleanupProjectEdits(dispatch, projectEditsRef);
  };
}

export function onInputChange(
  dispatch: AppDispatch,
  projectEditsRef: React.MutableRefObject<Partial<Project> | undefined>
) {
  return async (edits: Partial<Project>) => {
    dispatch(
      setProjectEdits({
        ...projectEditsRef.current,
        ...edits,
      })
    );
  };
}

export function updateStatus(dispatch: AppDispatch) {
  return async (
    row: Row<Project>,
    projectStatus: keyof typeof ProjectStatus
  ) => {
    await updateProject(
      row.original.id,
      { status: projectStatus },
      row.original,
      dispatch
    );
  };
}

export function isEditingRow(state: RootState["dashboardUserData"]) {
  return (row: Row<Project>) => row.original.id === state.editingProjectId;
}

export function cleanupProjectEdits(
  dispatch: AppDispatch,
  projectEditsRef: React.MutableRefObject<Partial<Project> | undefined>
) {
  dispatch(setEditingProjectId(undefined));
  dispatch(setProjectEdits(undefined));
  projectEditsRef.current = undefined;
}
