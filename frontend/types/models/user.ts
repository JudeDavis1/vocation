export type User = {
  firstname: string;
  lastname: string;

  role: string;
  email: string;
  userType: UserTypeKey;

  annualLeaveDays: number;

  currentProjects: Project[];
  completedProjects: Project[];
};

export type Project = {
  title: string;
  description: string;
  status: ProjectStatusKey;

  userId: number;
};

export const UserType = {
  REGULAR: "Regular",
  MANAGER: "Manager",
} as const;
export type UserTypeKey = (typeof UserType)[keyof typeof UserType];

export const ProjectStatus = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;
export type ProjectStatusKey =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];
