export type User = {
  id: number;
  firstname: string;
  lastname: string;

  role: string;
  email: string;
  userType: UserTypeKey;

  annualLeaveDays: number;

  projects?: Project[];
};

export type Project = {
  [key: string]: any;

  title: string;
  description: string;
  status: keyof typeof ProjectStatus;

  userId: number;
  id: number;
};

export enum UserType {
  REGULAR = "Regular",
  MANAGER = "Manager",
}
export type UserTypeKey = (typeof UserType)[keyof typeof UserType];

export enum ProjectStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export type ProjectStatusKey =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];
