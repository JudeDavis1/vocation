export interface BackendErrorResponse {
  userError: string;
}

export class AppSettings {
  public static shared = new AppSettings();

  public backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;
}

export const backendRoutes = {
  user: {
    create: AppSettings.shared.backendURL + "/user/create",
    login: AppSettings.shared.backendURL + "/user/login",
    get: AppSettings.shared.backendURL + "/user",
  },
  project: {
    create: AppSettings.shared.backendURL + "/project/create",
    delete: AppSettings.shared.backendURL + "/project/delete",
    update: AppSettings.shared.backendURL + "/project/update",
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
