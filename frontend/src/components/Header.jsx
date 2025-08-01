import React, { useState, useEffect, useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {Link} from "react-router-dom";

const Header = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/geu-logo-white.svg" : "/geu-logo-red.svg";
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -60], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";
      
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
  }, []);

  return (
    <motion.nav
      style={{ y, opacity }}
      className="flex sticky shadow-sm top-0 left-0 w-full border-b px-4 sm:px-6 bg-background z-50 justify-between items-center h-14 p-2"
    >
      <Link to="/" className="flex items-center gap-2 h-full">
        <div className="h-full p-1">
          <img src="/geu-logo.png" className="h-full w-full object-contain"/>
        </div>
        <div className="w-32">
          <img
            className="w-full h-full object-contain"
            src={logo}
            alt="Graphic Era Logo"
          />
        </div>
      </Link>
      <ModeToggle />
    </motion.nav>
  );
};

export default Header;