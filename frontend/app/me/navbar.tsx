import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import React from "react";

import { ModeToggle } from "@/components/theme/mode-toggle";

export function MeNavBar() {
  const menuItems = [
    {
      href: "",
      title: "Explore",
    },
    {
      href: "",
      title: "Monitor",
    },
  ];
  return (
    <div className="p-2">
      <Navbar isBordered>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarBrand>
            <Image
              src={"/favicon.png"}
              layout="fixed"
              width={70}
              height={70}
              alt=""
              className="p-4 min-w-[70px] min-h-[70px]"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex" justify="start">
          {menuItems.map((item) => (
            <NavbarItem key={item.title}>
              <Link href={item.href}>{item.title}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <span className="p-4">
          <ModeToggle />
        </span>
        <NavbarMenu>
          <br />
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.title}>
              <Link size="lg" href={item.href}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
