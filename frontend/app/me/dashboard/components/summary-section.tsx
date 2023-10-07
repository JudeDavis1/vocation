"use client";

import React from "react";
import { Loader } from "lucide-react";

import { CreateProjectForm } from "./create-project-form";
import { ProjectsDataTable } from "./projects-data-table";

import { User } from "@/types/models/user";
import { getUserData } from "@/services/dashboard/fetch-user";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SummarySection() {
  const [reload, setReload] = React.useState(true);
  const [userData, setUserData] = React.useState<User>();
  React.useEffect(() => {
    if (reload) {
      getUserData().then((data: User) => {
        setUserData(data);
        setReload(false);
      });
    }
  }, [reload]);

  return (
    <div className="flex gap-4 sm:p-4">
      <ScrollArea className="h-96 space-x-1">
        <div className="m-2">
          {reload || userData?.projects == undefined ? (
            <Loader className="animate-spin" />
          ) : (
            <ProjectsDataTable
              projects={userData?.projects}
              setReload={setReload}
            />
          )}
        </div>
      </ScrollArea>
      {/* Project creation form */}
      <div className="flex justify-end ml-auto">
        <CreateProjectForm userData={userData} setReload={setReload} />
      </div>
    </div>
  );
}
