"use client";

import React from "react";
import { useSelector } from "react-redux";

import { ProgressItem } from "./progress-item";

import { KpiSectionSummaryItem } from "@/lib/types/project-stats/stats-section-summary";
import { RootState } from "@/lib/stores/root";
import { getProjectSummaryInfo } from "@/lib/kpi-section/get-project-summary-info";

export function KpiSection() {
  const state = useSelector((state: RootState) => state.dashboardUserData);
  const [projectsSummary, setProjectSummary] =
    React.useState<KpiSectionSummaryItem>({});

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
    <div className="sm:p-8 p-4 space-y-4">
      <h1 className="text-2xl">KPIs for this week</h1>

      <div className="flex gap-x-4 sm:gap-x-8">
        <ProgressItem
          value={projectsSummary.completed}
          color="success"
          label="Completed"
        />
        <ProgressItem
          value={projectsSummary.inProgress}
          color="default"
          label="In progress"
        />
        <ProgressItem
          value={projectsSummary.notStarted}
          color="danger"
          label="Not started"
        />
      </div>
    </div>
  );
}
