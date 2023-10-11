import axios from "axios";

import { backendRoutes } from "@/config";
import { Project, ProjectStatus } from "@/types/models/user";

export async function updateProject(
  projectId: number,
  newProject: Partial<Project>,
  originalProject: Project,
  setReload: SetReloadState
) {
  // Ensure we don't make any unrequired backend calls
  if (newProject === originalProject) {
    return;
  }

  await axios.patch(
    backendRoutes.project.update,
    { id: projectId, ...newProject },
    { withCredentials: true }
  );
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
