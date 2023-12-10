"use client";

import axios from "axios";
import { isEqual } from "lodash";

import { requestOptions } from "../request-options";
import { AppDispatch } from "../stores/root";
import {
  DashboardUserDataState,
  getUserDataThunk,
} from "../stores/dashboard-user-data";
import { backendErrorHandle } from "../backend-error-handle";

import { backendRoutes } from "@/config";
import { Project } from "@/lib/types/models/user";
import { toast } from "@/components/ui/use-toast";

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
