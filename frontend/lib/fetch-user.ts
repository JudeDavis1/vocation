import axios from "axios";

import { requestOptions } from "./request-options";

import { backendRoutes } from "@/config";
import { User } from "@/lib/types/models/user";

export async function getUserData(): Promise<User> {
  const res = await axios({
    url: backendRoutes.user.get,
    method: "GET",
    ...requestOptions(),
  });
  return res.data as User;
}
