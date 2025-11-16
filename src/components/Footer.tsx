import { Linkedin, Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import pkg from "../../package.json";

const Footer = () => {
  const version = pkg?.version ?? "0.0.0";

  return (
    <footer id="footer" className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-foreground mb-8">Connect with me</h3>

        <div className="flex justify-center items-center gap-6 mb-12">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/andrewagirgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-[#0072b1]">
              <Linkedin className="h-6 w-6 text-foreground group-hover:text-white transition-colors" />
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/andrew-girgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-foreground">
              <Github className="h-6 w-6 text-foreground group-hover:text-background transition-colors" />
            </div>
          </a>

          {/* X */}
          <a
            href="https://x.com/AndrewGirgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-foreground">
              <FaXTwitter className="h-6 w-6 text-foreground group-hover:text-background transition-colors" />
            </div>
          </a>

          {/* Kaggle */}
          <a
            href="https://www.kaggle.com/andrewagirgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-[#20BEFF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                className="fill-foreground group-hover:fill-white transition-colors"
              >
                <path d="M385.708,476.478L254.742,313.713l125.578-121.534c2.334-2.426,1.526-9.433-4.761-9.433h-62.16    c-3.145,0-6.288,1.618-9.433,4.761L185.128,307.604V32.738c0-4.491-2.247-6.737-6.738-6.737h-46.618    c-4.492,0-6.737,2.246-6.737,6.737v446.433c0,4.491,2.246,6.738,6.737,6.738h46.618c4.491,0,6.738-2.247,6.738-6.738v-97.91    l27.666-26.317l99.257,126.294c2.695,3.145,5.839,4.762,9.432,4.762h60.095c3.143,0,4.939-0.899,5.389-2.696L385.708,476.478z" />
              </svg>
            </div>
          </a>

          {/* StrataScratch */}
          <a
            href="https://platform.stratascratch.com/user/AndrewGirgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-[#00A699]">
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
            </div>
          </a>

           {/* Buy Me a Coffee */}
          <a
            href="https://www.buymeacoffee.com/andrewgirgis"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 group-hover:bg-[#FFDD00]">
              <SiBuymeacoffee className="h-6 w-6 text-foreground group-hover:text-background transition-colors" />
            </div>
          </a>

        </div>
        

        <div className="space-y-2 text-muted-foreground text-sm">
          <p>© 2025 Andrew Girgis. All rights reserved.</p>
          <p className="text-xs">v{version}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
