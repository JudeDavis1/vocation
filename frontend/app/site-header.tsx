"use client";

import React from "react";
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { frontendRoutes } from "@/config";

export function SiteHeader() {
  const rightMenuItems = [
    {
      title: "Home",
      href: "/",
    },
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
    <div className="p-4 w-full">
      <Navbar className="ml-auto w-full" isBordered>
        <NavbarContent justify="start" className="sm:hidden">
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="start">
          {rightMenuItems.map((item, i) => (
            <Link href={item.href} key={item.href}>
              {item.title}
            </Link>
          ))}
        </NavbarContent>

        <NavbarMenu>
          <br />
          {rightMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link href={item.href}>{item.title}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
