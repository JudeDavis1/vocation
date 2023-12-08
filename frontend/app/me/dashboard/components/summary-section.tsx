"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateProjectForm } from "./create-project-form";
import { ProjectsDataTable } from "./data-table/projects-data-table";
import { KpiSection } from "./stats-section/kpi-section";

import { ScrollArea } from "@/components/ui/scroll-area";
import { KpiSectionSummaryItem } from "@/lib/types/project-stats/stats-section-summary";
import { getProjectSummaryInfo } from "@/lib/kpi-section/get-project-summary-info";
import { AppDispatch, RootState } from "@/lib/stores/root";
import { getUserDataThunk } from "@/lib/stores/dashboard-user-data";

export function SummarySection() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);

  const [projectsSummary, setProjectSummary] =
    React.useState<KpiSectionSummaryItem>({});

  React.useEffect(() => {
    dispatch(getUserDataThunk());
  }, []);

  React.useEffect(() => {
    if (!state.userData?.projects) {
      return;
    }

    const total = state.userData.projects.length;
    if (total === 0) {
      setProjectSummary({
        completed: 0,
        inProgress: 0,
        notStarted: 0,
      });
      return;
    }

    const summary = getProjectSummaryInfo(state.userData.projects);
    setProjectSummary(summary);
  }, [state.userData]);

  return (
    <div className="gap-4 sm:p-4 xl:w-11/12 w-full space-y-8">
      {/* Project creation form */}
      <div className="flex justify-start mr-auto">
        <CreateProjectForm />
        <KpiSection projectInfo={projectsSummary} />
      </div>

      <ScrollArea className="h-96 w-full border border-solid border-muted rounded-lg">
        <div className="m-3">
          <h1 className="text-2xl">Your projects</h1>
          <ProjectsDataTable />
        </div>
      </ScrollArea>
    </div>
  );
}
