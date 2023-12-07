import axios from "axios";

import { backendRoutes } from "@/config";
import { User } from "@/lib/types/models/user";
import { toast } from "@/components/ui/use-toast";

export async function getUserData(): Promise<User> {
  toast({ title: localStorage.getItem("sessionToken") ?? "error" });
  const res = await axios({
    url: backendRoutes.user.get,
    method: "GET",
    withCredentials: true,
    data: { sessionToken: localStorage.getItem("sessionToken") },
  });
  return res.data as User;
}
