import axios from "axios";

import { backendRoutes } from "@/config";
import { User } from "@/lib/types/models/user";

export async function getUserData(): Promise<User> {
  const sessionToken = localStorage.getItem("sessionToken");

  const res = await axios({
    url: backendRoutes.user.get,
    method: "GET",
    headers: {
      Authorization: sessionToken,
    },
    withCredentials: true,
  });
  return res.data as User;
}
