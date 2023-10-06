"use client";

import React from "react";

import { CreateProjectForm } from "./create-project-form";
import { ProjectCard } from "./project-card";

import { User } from "@/types/models/user";
import { getUserData } from "@/services/dashboard/fetch-user";

export function SummarySection() {
  const [userData, setUserData] = React.useState<User>();
  React.useEffect(() => {
    getUserData().then(setUserData);
  }, []);

  return (
    <div className="sm:p-4 flex justify-end ml-auto gap-y-2">
      <CreateProjectForm />

      {/* Project List section */}
      {userData?.projects &&
        userData.projects.map((project) => <ProjectCard project={project} />)}
    </div>
  );
}
