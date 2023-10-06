import Link from "next/link";
import React from "react";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export interface NavMenuItemProps {
  title: string;
  href: string;
}

export function NavMenuItem({ title, href }: NavMenuItemProps) {
  return (
    <NavigationMenuItem key={React.useId()}>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
