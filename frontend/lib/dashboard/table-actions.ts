import axios from "axios";
import { isEqual } from "lodash";

import { backendRoutes } from "@/config";
import { Project } from "@/lib/types/models/user";

export async function updateProject(
  projectId: number,
  newProject: Partial<Project>,
  originalProject: Project,
  setReload: SetReloadState
) {
  // Ensure we don't make any unrequired backend calls
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

  await axios.patch(backendRoutes.project.update, {
    id: projectId,
    ...newProject,
  });
  setReload(true);
}

export async function deleteProject(project: Project) {
  await axios({
    method: "delete",
    url: backendRoutes.project.delete,
    data: { id: project.id },
    withCredentials: true,
  });
}
