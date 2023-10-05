"use client";

import axios from "axios";
import React from "react";
import { Loader2 } from "lucide-react";

import { User } from "@/types/models/user";
import { getUserData } from "@/services/dashboard/fetch-user";

export function SummarySection() {
  const [userData, setUserData] = React.useState<User>();
  React.useEffect(() => {
    getUserData().then(setUserData);
  }, []);

  return (
    <div>
      {!userData && <Loader2 className="animate-spin" />}
      {userData && <div>{userData.email}</div>}
    </div>
  );
}
