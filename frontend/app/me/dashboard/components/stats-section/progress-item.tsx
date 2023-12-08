"use client";

import { CircularProgress } from "@nextui-org/progress";
import { CircularProgressVariantProps } from "@nextui-org/react";

export interface ProgressItemProps {
  value: number | undefined;
  color?: CircularProgressVariantProps["color"];
  size?: CircularProgressVariantProps["size"];
  label?: string;
}

export function ProgressItem({
  value,
  color = "primary",
  label = "",
  size = "lg",
}: ProgressItemProps) {
  return (
    <div className="text-xs space-y-1">
      <CircularProgress
        aria-label={label}
        color={color}
        value={value}
        size={size}
        showValueLabel={true}
        className="flex justify-center mx-auto"
      />
      <span className="text-center flex justify-center mx-auto">{label}</span>
    </div>
  );
}
