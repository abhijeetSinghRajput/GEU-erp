import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { cn } from "../lib/utils";

export function ModeToggle({ className }) {
  const { setTheme, theme } = useTheme();
  const toggleMode = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button
      variant="ghost"
      onClick={toggleMode}
      className={cn("h-8", className)}
    >
      {theme === "light" ? <Sun /> : <Moon />}
      <span className="capitalize">{theme}</span>
    </Button>
  );
}
