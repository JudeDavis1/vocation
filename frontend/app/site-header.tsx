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

interface NavMenuItemProps {
  title: string;
  href: string;
}

export function SiteHeader() {
  const rightMenuItems: NavMenuItemProps[] = [
    {
      title: "Login",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/sign-up",
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

function NavMenuItem({ title, href }: NavMenuItemProps) {
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
