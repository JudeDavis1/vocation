export const UserType = {
  REGULAR: 0,
  MANAGER: 1,
} as const;
export type UserTypeKey = (typeof UserType)[keyof typeof UserType];

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
  userId: number;
};
