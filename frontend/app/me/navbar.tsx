import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavMenuItem } from "@/components/theme/nav-menu-item";
import { ModeToggle } from "@/components/theme/mode-toggle";

export function MeNavBar() {
  return (
    <div className="p-2">
      <NavigationMenu>
        <h1 className="select-none px-8 text-muted-foreground">Dashboard</h1>
        <NavigationMenuList>
          <div className="space-x-4 flex">
            <NavMenuItem href="" title="Explore" />
            <NavMenuItem href="" title="Monitor" />
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
