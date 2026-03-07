import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLight from "@/assets/AG_Logo_Design_light.svg";
import logoDark from "@/assets/AG_Logo_Design_dark.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "workspace", label: "Workspace" },
  { id: "footer", label: "Connect" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme");
    return (stored === "light" || stored === "dark") ? stored : "light";
  });

  const activeSection = useActiveSection(navItems.map((item) => item.id));

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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo — click to go home */}
            <button
              onClick={() => scrollToSection("home")}
              aria-label="Go to top"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded flex items-center justify-start w-12"
            >
              <img
                src={!isScrolled || theme === "dark" ? logoLight : logoDark}
                alt="AG Logo"
                className={`w-auto ${!isScrolled || theme === "dark" ? "h-10" : "h-10"}`}
              />
            </button>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs font-medium uppercase tracking-wide transition-colors ${
                    isScrolled
                      ? `text-foreground hover:text-primary ${activeSection === item.id ? "text-primary border-b-2 border-primary pb-1" : ""}`
                      : `text-white hover:text-white/90 [text-shadow:_0_1px_8px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_100%)] ${activeSection === item.id ? "border-b-2 border-white pb-1" : ""}`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full transition-all ${
                  isScrolled
                    ? "text-foreground hover:text-foreground/80"
                    : "text-white hover:text-white/90 [filter:_drop-shadow(0_1px_8px_rgb(0_0_0_/_80%))_drop-shadow(0_0_4px_rgb(0_0_0_/_100%))]"
                }`}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                className={`md:hidden p-2 rounded-md transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-foreground/80"
                    : "text-white hover:text-white/90 [filter:_drop-shadow(0_1px_8px_rgb(0_0_0_/_80%))_drop-shadow(0_0_4px_rgb(0_0_0_/_100%))]"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-8 pt-16">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-medium tracking-wide transition-colors ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
