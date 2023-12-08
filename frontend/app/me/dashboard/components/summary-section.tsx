"use client";

import React from "react";
import { useDispatch } from "react-redux";

import { CreateProjectForm } from "./create-project-form";
import { ProjectsDataTable } from "./data-table/projects-data-table";
import { KpiSection } from "./stats-section/kpi-section";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AppDispatch } from "@/lib/stores/root";
import { getUserDataThunk } from "@/lib/stores/dashboard-user-data";

export function SummarySection() {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserDataThunk());
  }, []);

  return (
    <div className="gap-4 sm:p-4 xl:w-11/12 w-full space-y-8">
      {/* Project creation form */}
      <div className="flex justify-start mr-auto">
        <CreateProjectForm />
        <KpiSection />
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
