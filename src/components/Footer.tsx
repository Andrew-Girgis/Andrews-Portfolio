import { Linkedin, Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import pkg from "../../package.json";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrewagirgis",
    hoverBg: "group-hover:bg-[#0072b1]",
    icon: <Linkedin className="h-6 w-6 text-foreground group-hover:text-white transition-colors" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/andrew-girgis",
    hoverBg: "group-hover:bg-foreground",
    icon: <Github className="h-6 w-6 text-foreground group-hover:text-background transition-colors" />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/AndrewGirgis",
    hoverBg: "group-hover:bg-foreground",
    icon: <FaXTwitter className="h-6 w-6 text-foreground group-hover:text-background transition-colors" />,
  },
  {
    label: "Kaggle",
    href: "https://www.kaggle.com/andrewagirgis",
    hoverBg: "group-hover:bg-[#20BEFF]",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
        className="fill-foreground group-hover:fill-white transition-colors"
      >
        <path d="M385.708,476.478L254.742,313.713l125.578-121.534c2.334-2.426,1.526-9.433-4.761-9.433h-62.16    c-3.145,0-6.288,1.618-9.433,4.761L185.128,307.604V32.738c0-4.491-2.247-6.737-6.738-6.737h-46.618    c-4.492,0-6.737,2.246-6.737,6.737v446.433c0,4.491,2.246,6.738,6.737,6.738h46.618c4.491,0,6.738-2.247,6.738-6.738v-97.91    l27.666-26.317l99.257,126.294c2.695,3.145,5.839,4.762,9.432,4.762h60.095c3.143,0,4.939-0.899,5.389-2.696L385.708,476.478z" />
      </svg>
    ),
  },
  {
    label: "StrataScratch",
    href: "https://platform.stratascratch.com/user/AndrewGirgis",
    hoverBg: "group-hover:bg-[#00A699]",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 40 20"
        className="fill-foreground group-hover:fill-white transition-colors"
      >
        <path d="m24.159 7.895.016.568v3.305l-.004.321c-.028 3.027-2.218 5.495-4.88 5.495-2.664 0-4.854-2.464-4.881-5.495l-.004-2.118-2.325.027.008 2.103c.036 4.355 3.266 7.895 7.201 7.895 3.935 0 7.166-3.54 7.2-7.895l-.01-4.194c.027-3.027 2.217-5.49 4.88-5.49s4.853 2.463 4.88 5.49l.024 2.091h2.304l-.008-2.103C38.53 3.54 35.3 0 31.36 0c-3.936 0-7.166 3.54-7.201 7.895Z" />
        <path d="m12.077 7.895-.004.482h-.004v3.775c-.027 3.023-2.198 5.432-4.86 5.432-2.663 0-4.853-2.464-4.881-5.495l-.004-2.118L0 9.998l.004 2.103C.044 16.46 3.274 20 7.209 20s7.165-3.54 7.2-7.895l-.015-4.194c.031-3.028 2.221-5.49 4.88-5.49 2.663 0 4.853 2.462 4.88 5.49l.024 2.091h2.305l-.004-2.103C26.444 3.54 23.213 0 19.279 0c-3.936 0-7.166 3.54-7.202 7.895Z" />
      </svg>
    ),
  },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Footer = () => {
  const version = pkg?.version ?? "0.0.0";

  return (
    <footer id="footer" className="bg-surface-alt border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-12" />

      <ScrollReveal variant="fadeIn">
        <div className="max-w-7xl mx-auto">
          {/* Three-column layout on desktop */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
            {/* Column 1: Name + tagline */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold font-serif text-foreground mb-2">Andrew Girgis</h3>
              <p className="text-sm text-muted-foreground mb-4">Data Scientist & Applied Economist</p>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <a href="https://cal.com/andrew-girgis/1on1" target="_blank" rel="noopener noreferrer">Book a Chat</a>
              </Button>
            </div>

            {/* Column 2: Quick nav links */}
            <div className="text-center">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Navigate</h4>
              <div className="flex flex-col gap-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "projects", label: "Projects" },
                  { id: "workspace", label: "Workspace" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Social icons */}
            <div className="text-center md:text-right">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Connect</h4>
              <TooltipProvider>
                <div className="flex justify-center md:justify-end items-center gap-4">
                  {socialLinks.map((link) => (
                    <Tooltip key={link.label}>
                      <TooltipTrigger asChild>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                          aria-label={link.label}
                        >
                          <div className={`w-11 h-11 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 ${link.hoverBg}`}>
                            {link.icon}
                          </div>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Buy Me a Coffee - commented out */}
          {/* <a
            href="https://www.buymeacoffee.com/andrewgirgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-[#FFDD00]">
              <SiBuymeacoffee className="h-6 w-6 text-foreground group-hover:text-background transition-colors" />
            </div>
          </a> */}

          <div className="border-t border-border pt-8 space-y-2 text-muted-foreground text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Andrew Girgis</p>
            <p className="text-xs">v{version}</p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
