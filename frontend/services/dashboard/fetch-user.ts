import axios from "axios";

import { backendRoutes } from "@/config";
import { User } from "@/types/models/user";

export async function getUserData(): Promise<User> {
  const res = await axios.get(backendRoutes.user.get, {
    withCredentials: true,
  });
  return res.data as User;
}
