import React, { useState, useEffect, useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ExternalLink, Loader2, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import TooltipWrapper from "./TooltipWrapper";

const Header = ({children}) => {
  const { theme } = useTheme();
  const [githubStarsCount, setGithubStarsCount] = useState(0);

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

  const logo = theme === "dark" ? "/graphic-era-light.svg" : "/graphic-era-dark.svg";
  const githubLogo = theme === "dark" ? "/github-mark-white.svg" : "/github-mark.svg";

  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -60], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? "down" : "up";

      if (scrollDirection === "down") {
        setHidden(true);
        animate(y, -60, { duration: 0.3 });
      } else if (scrollDirection === "up") {
        setHidden(false);
        animate(y, 0, { duration: 0.3 });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  const handleGithubClick = () => {
    window.open("https://github.com/abhijeetsinghrajput/geu-erp", "_blank");
  };

  return (
    <motion.nav
      style={{ y, opacity }}
      className="flex sticky shadow-sm top-0 left-0 w-full border-b px-4 sm:px-6 bg-background z-50 justify-between items-center h-14 p-2"
    >
      <TooltipWrapper content={"go to homepage"}>
        <Link to="/" className="flex items-center gap-2 h-full">
          <div className="h-full p-1">
            <img
              src="/geu-logo.png"
              className="h-full w-full object-contain"
              alt="GEU Logo"
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
      <div className="flex gap-1 items-center">
        <TooltipWrapper content="Rate us on Github">
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

        <ModeToggle />
        {children}
      </div>
    </motion.nav>
  );
};

export default Header;
