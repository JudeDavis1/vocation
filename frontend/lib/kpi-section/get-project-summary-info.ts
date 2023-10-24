import { Project } from "../types/models/user";
import { KpiSectionSummaryItem } from "../types/project-stats/stats-section-summary";

export function getProjectSummaryInfo(
  projects: Project[]
): KpiSectionSummaryItem {
  const getPercentage = (n: number) => (n / projects.length) * 100;

  const summary: KpiSectionSummaryItem = {};
  summary.completed = getPercentage(
    projects.filter((project) => project.status == "COMPLETED").length
  );
  summary.inProgress = getPercentage(
    projects.filter((project) => project.status == "IN_PROGRESS").length
  );
  summary.notStarted = getPercentage(
    projects.filter((project) => project.status == "NOT_STARTED").length
  );

  return summary;
}
