"use client";

import React from "react";

import { CreateProjectForm } from "./create-project-form";
import { ProjectsDataTable } from "./data-table/projects-data-table";
import { StatsSection } from "./stats-section/kpi-section";

import { User } from "@/lib/types/models/user";
import { getUserData } from "@/lib/dashboard/fetch-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatsSectionSummaryItem } from "@/lib/types/project-stats/stats-section-summary";
import { getProjectSummaryInfo } from "@/lib/kpi-section/get-project-summary-info";

export function SummarySection() {
  const [reload, setReload] = React.useState(true);
  const [userData, setUserData] = React.useState<User>();
  const [projectsSummary, setProjectSummary] =
    React.useState<StatsSectionSummaryItem>({});

  React.useEffect(() => {
    if (reload) {
      getUserData().then((data: User) => {
        setUserData(data);
        setReload(false);
      });
    }
  }, [reload]);

  React.useEffect(() => {
    if (!userData?.projects) {
      return;
    }

    const total = userData.projects.length;
    if (total === 0) {
      setProjectSummary({
        completed: 0,
        inProgress: 0,
        notStarted: 0,
      });
      return;
    }

    const summary = getProjectSummaryInfo(userData.projects);
    setProjectSummary(summary);
  }, [userData]);

  return (
    <div className="gap-4 sm:p-4 xl:w-11/12 w-full space-y-8">
      {/* Project creation form */}
      <div className="flex justify-start mr-auto">
        <CreateProjectForm userData={userData} setReload={setReload} />
        <StatsSection projectInfo={projectsSummary} />
      </div>

      <ScrollArea className="h-96 w-full border border-solid border-muted rounded-lg">
        <div className="m-3">
          <h1 className="text-2xl">Your projects</h1>
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
