import axios from "axios";

import { backendRoutes } from "@/config";
import { Project, ProjectStatus } from "@/types/models/user";

export async function changeProjectStatus(
  projectId: number,
  newStatus: keyof typeof ProjectStatus,
  originalStatus: keyof typeof ProjectStatus,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Ensure we don't make any unrequired backend calls
  if (newStatus === originalStatus) {
    return;
  }

  await axios.patch(
    backendRoutes.project.update,
    { id: projectId, status: newStatus },
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
