import axios from "axios";

import { backendRoutes } from "@/config";
import { User } from "@/lib/types/models/user";

export async function getUserData(): Promise<User> {
  const res = await axios({
    url: backendRoutes.user.get,
    method: "GET",
    withCredentials: true,
    data: { sessionToken: localStorage.getItem("sessionToken") },
  });
  return res.data as User;
}
