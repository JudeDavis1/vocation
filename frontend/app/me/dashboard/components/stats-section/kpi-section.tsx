import { ProgressItem } from "./progress-item";

import { StatsSectionSummaryItem } from "@/lib/types/project-stats/stats-section-summary";

export interface StatsSectionProps {
  projectInfo: StatsSectionSummaryItem;
}

export function StatsSection({ projectInfo }: StatsSectionProps) {
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
