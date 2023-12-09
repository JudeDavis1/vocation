import React from "react";
import { NavbarItem, Link } from "@nextui-org/react";

export interface TypicalMenuItemProps {
  title: string;
  href: string;
}

export function TypicalMenuItem({ title, href }: TypicalMenuItemProps) {
  return (
    <NavbarItem key={React.useId()} className="p-4">
      <Link href={href}>{title}</Link>
    </NavbarItem>
  );
}
