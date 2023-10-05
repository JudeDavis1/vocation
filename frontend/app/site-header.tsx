"use client";

import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { frontendRoutes } from "@/config";
import {
  NavMenuItem,
  NavMenuItemProps,
} from "@/components/theme/nav-menu-item";

export function SiteHeader() {
  const rightMenuItems: NavMenuItemProps[] = [
    {
      title: "Login",
      href: frontendRoutes.login,
    },
    {
      title: "Sign Up",
      href: frontendRoutes.signUp,
    },
  ];
  return (
    <div className="p-4 flex justify-end">
      <NavigationMenu className="ml-auto">
        <NavigationMenuList>
          {rightMenuItems.map((item: NavMenuItemProps, i) => (
            <NavMenuItem title={item.title} href={item.href} key={i} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
