import React, { useState, useEffect, useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import {
  BookOpen,
  FileText,
  Loader2,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import TooltipWrapper from "./TooltipWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AdmitCard from "./AdmitCard";
import { useCookieStore } from "../stores/useCookieStore";

const Header = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => setTheme(theme === "light" ? "dark" : "light");
  const [githubStarsCount, setGithubStarsCount] = useState(0);
  const { logout, loginingOut, authenticated } = useAuthStore();
  const { campus } = useCookieStore();

  useEffect(() => {
    const getGithubStarCount = async () => {
      try {
        const { data } = await axios.get(
          "https://api.github.com/repos/abhijeetsinghrajput/geu-erp"
        );
        setGithubStarsCount(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    };
    getGithubStarCount();
  }, []);

  const logo =
    theme === "dark" ? "/graphic-era-light.svg" : "/graphic-era-dark.svg";
  const githubLogo =
    theme === "dark" ? "/github-mark-white.svg" : "/github-mark.svg";

  const lastScrollY = useRef(0);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -60], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? "down" : "up";

      animate(y, scrollDirection === "down" ? -60 : 0, { duration: 0.3 });
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  const handleGithubClick = () =>
    window.open("https://github.com/abhijeetsinghrajput/geu-erp", "_blank");

  return (
    <motion.nav
      style={{ y, opacity }}
      className="flex sticky shadow-sm top-0 left-0 w-full border-b px-4 sm:px-6 bg-background z-50 justify-between items-center h-14 p-2"
    >
      {/* Logo */}
      <TooltipWrapper content="Go to homepage">
        <Link to="/" className="flex items-center gap-2 h-full">
          <div className="h-full p-1">
            <img
              className="w-full h-full object-contain"
              src={campus === "hill" ? "gehu-circular-logo.png" : "./geu-circular-logo.png"}
              alt="Graphic Era University Logo"
            />
          </div>
          <div className="w-32">
            <img
              className="w-full h-full object-contain"
              src={logo}
              alt="Graphic Era Logo"
            />
          </div>
        </Link>
      </TooltipWrapper>

      {/* Right section */}
      <div className="flex gap-1 items-center">
        <TooltipWrapper content="Rate us on GitHub">
          <Button size="sm" variant="ghost" onClick={handleGithubClick}>
            {githubStarsCount}
            <div className="size-5 text-base">
              <img
                className="w-full h-full object-contain"
                src={githubLogo}
                alt="GitHub Logo"
              />
            </div>
          </Button>
        </TooltipWrapper>

        {authenticated && <AdmitCard />}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="size-8">
              <Settings />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-40" align="end">
            {/* Theme toggle */}
            <DropdownMenuItem onClick={toggleMode}>
              {theme === "light" ? <Moon /> : <Sun />}
              <span>{theme === "light" ? "Dark" : "Light"}</span>
            </DropdownMenuItem>

            {/* Docs */}
            <DropdownMenuItem asChild>
              <NavLink to="/docs" className="flex items-center gap-2 w-full">
                <BookOpen className="h-4 w-4" />
                <span>Docs</span>
              </NavLink>
            </DropdownMenuItem>

            {/* Privacy Policy */}
            <DropdownMenuItem asChild>
              <NavLink
                to="/privacy-policy"
                className="flex items-center gap-2 w-full"
              >
                <FileText className="h-4 w-4" />
                <span>Privacy Policy</span>
              </NavLink>
            </DropdownMenuItem>

            {/* Logout */}
            {authenticated && (
              <>
                <DropdownMenuSeparator className="bg-input" />
                <DropdownMenuItem
                  onClick={logout}
                  disabled={loginingOut}
                  className="text-red-600 flex items-center gap-2"
                >
                  {loginingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  <span>Logout</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {children}
      </div>
    </motion.nav>
  );
};

export default Header;
