"use client";

import React from "react";

import { CreateProjectForm } from "./create-project-form";
import { ProjectsDataTable } from "./projects-data-table";

import { User } from "@/types/models/user";
import { getUserData } from "@/services/dashboard/fetch-user";

export function SummarySection() {
  const [userData, setUserData] = React.useState<User>();
  React.useEffect(() => {
    getUserData().then(setUserData);
  }, []);

  return (
    <div className="sm:p-4 gap-2 w-full">
      {/* Project creation form */}
      <div className="flex justify-end ml-auto">
        <CreateProjectForm userData={userData} />
      </div>

      <br />

      <ProjectsDataTable projects={userData?.projects} />
    </div>
  );
}
