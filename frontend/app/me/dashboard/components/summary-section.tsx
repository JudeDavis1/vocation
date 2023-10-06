"use client";

import React from "react";

import { CreateProjectForm } from "./create-project-form";

import { User } from "@/types/models/user";
import { getUserData } from "@/services/dashboard/fetch-user";

export function SummarySection() {
  const [userData, setUserData] = React.useState<User>();
  React.useEffect(() => {
    getUserData().then(setUserData);
  }, []);

  return (
    <div className="sm:p-4 flex justify-end ml-auto">
      <CreateProjectForm />
    </div>
  );
}
