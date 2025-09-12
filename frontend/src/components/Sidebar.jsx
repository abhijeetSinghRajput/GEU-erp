import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { SidebarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { buttonClass } from "./ui/button";

const Sidebar = ({ items, heading="Navbar"}) => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // offset for header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <SidebarIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-4">
        <SheetHeader className="justify-start text-start">
          <SheetTitle>{heading}</SheetTitle>
          <SheetDescription>Choose a section to explore.</SheetDescription>
        </SheetHeader>

        <ul className="mt-4">
          {items.map((item) => (
            <li key={item.id}>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "text-muted-foreground w-full justify-start gap-1 px-2"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Button>
              </SheetClose>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
