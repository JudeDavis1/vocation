"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

import { CreateProjectForm } from "./create-project-form";
import { ProjectsDataTable } from "./data-table/projects-data-table";
import { KpiSection } from "./stats-section/kpi-section";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AppDispatch, RootState } from "@/lib/stores/root";
import { getUserDataThunk } from "@/lib/stores/dashboard-user-data";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitProjectData } from "@/lib/dashboard/create-project-form/on-submit";

export function SummarySection() {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserDataThunk());
  }, []);

  return (
    <div className="gap-4 sm:p-4 xl:w-11/12 w-full space-y-8">
      {/* Project creation form */}
      <div className="flex justify-start mr-auto">
        <KpiSection />
      </div>

      <ScrollArea className="h-96 w-full border border-solid border-muted rounded-lg">
        <div className="m-3">
          <div className="flex">
            <h1 className="text-2xl">Your projects</h1>
            <CreateProjectPopover />
          </div>
          <ProjectsDataTable />
        </div>
      </ScrollArea>
    </div>
  );
}

function CreateProjectPopover() {
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboardUserData);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="ml-auto" variant="ghost" size="icon">
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <CreateProjectForm
          onSubmit={async (data) => {
            if (state.userData) {
              await submitProjectData(data, String(state.userData.id));
            }
            dispatch(getUserDataThunk());
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
