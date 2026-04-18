import { Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import AsciiSkyline from "@/components/AsciiSkyline";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/andrew-girgis",
    icon: <Github className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrewagirgis",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    label: "X",
    href: "https://x.com/AndrewGirgis",
    icon: <FaXTwitter className="h-5 w-5" />,
  },
  {
    label: "Kaggle",
    href: "https://www.kaggle.com/andrewagirgis",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512"
        className="fill-current"
      >
        <path d="M385.708,476.478L254.742,313.713l125.578-121.534c2.334-2.426,1.526-9.433-4.761-9.433h-62.16c-3.145,0-6.288,1.618-9.433,4.761L185.128,307.604V32.738c0-4.491-2.247-6.737-6.738-6.737h-46.618c-4.492,0-6.737,2.246-6.737,6.737v446.433c0,4.491,2.246,6.738,6.737,6.738h46.618c4.491,0,6.738-2.247,6.738-6.738v-97.91l27.666-26.317l99.257,126.294c2.695,3.145,5.839,4.762,9.432,4.762h60.095c3.143,0,4.939-0.899,5.389-2.696L385.708,476.478z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer id="footer" className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm font-mono text-foreground">Andrew Girgis</p>
            <p className="text-xs text-muted-foreground mt-1">
              Data Scientist · Applied Economist
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-8 text-center">
        <p className="text-xs text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} Andrew Girgis. Built with curiosity.
        </p>
      </div>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <AsciiSkyline />
      </div>
    </footer>
  );
};

export default Footer;