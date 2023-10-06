export interface BackendErrorResponse {
  userError: string;
}

export class AppSettings {
  public static shared = new AppSettings();

  public backendURL = "http://localhost:8080/api/v1";
}

export const backendRoutes = {
  user: {
    create: AppSettings.shared.backendURL + "/user/create",
    login: AppSettings.shared.backendURL + "/user/login",
    get: AppSettings.shared.backendURL + "/user",
  },
  project: {
    create: AppSettings.shared.backendURL + "/project/create",
  },
};

export const frontendRoutes = {
  login: "/login",
  signUp: "/sign-up",

  // User's personal profile
  me: {
    dashboard: "/me/dashboard",
  },
};
