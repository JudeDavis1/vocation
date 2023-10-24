import { ProgressItem } from "./progress-item";

import { KpiSectionSummaryItem } from "@/lib/types/project-stats/stats-section-summary";

export interface KpiSectionProps {
  projectInfo: KpiSectionSummaryItem;
}

export function KpiSection({ projectInfo }: KpiSectionProps) {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl">KPIs for this week</h1>

      <div className="flex gap-x-16">
        <ProgressItem
          value={projectInfo.completed}
          color="success"
          label="Completed"
        />
        <ProgressItem
          value={projectInfo.inProgress}
          color="default"
          label="In progress"
        />
        <ProgressItem
          value={projectInfo.notStarted}
          color="danger"
          label="Not started"
        />
      </div>
    </div>
  );
}
