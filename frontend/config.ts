export class AppSettings {
  public static shared = new AppSettings();

  public backendURL = "http://localhost:8080/api/v1";
}

export const backendRoutes = {
  user: {
    create: AppSettings.shared.backendURL + "/user/create",
    login: AppSettings.shared.backendURL + "/user/login",
  },
};
