import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavIconSwitcher from "./ui/ImageSwitcher";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Check localStorage for saved theme, default to light
    const stored = localStorage.getItem("theme");
    return (stored === "light" || stored === "dark") ? stored : "light";
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    // Persist theme to localStorage whenever it changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Clickable Avatar Icon */}
          <div 
            onClick={() => scrollToSection("home")}
            className="cursor-pointer"
          >
            <NavIconSwitcher />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-white hover:text-white/90 transition-colors [text-shadow:_0_1px_8px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_100%)]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-white hover:text-white/90 transition-colors [text-shadow:_0_1px_8px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_100%)]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium text-white hover:text-white/90 transition-colors [text-shadow:_0_1px_8px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_100%)]"
            >
              Projects & Tools
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="text-sm font-medium text-white hover:text-white/90 transition-colors [text-shadow:_0_1px_8px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_100%)]"
            >
              Connect
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full text-white hover:text-white/90 [filter:_drop-shadow(0_1px_8px_rgb(0_0_0_/_80%))_drop-shadow(0_0_4px_rgb(0_0_0_/_100%))]"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
