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
    <div className="lg:flex gap-4 sm:p-4 xl:w-11/12 w-full">
      {/* Project creation form */}
      <div className="flex justify-start mr-auto m-2">
        <CreateProjectForm userData={userData} setReload={setReload} />
      </div>
      <ScrollArea className="h-96 w-full">
        <div className="m-2">
          <ProjectsDataTable
            projects={userData?.projects ?? []}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
