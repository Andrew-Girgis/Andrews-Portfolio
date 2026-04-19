import type { TerminalLine } from "../TerminalContext";

export interface CommandContext {
  addLine: (type: TerminalLine["type"], content: string) => void;
  clearLines: () => void;
}

export interface Command {
  description: string;
  execute: (args: string[], ctx: CommandContext) => Promise<string | void>;
}

const KNOWN_DIRECTORIES = ["projects", "workspace", ".writeups"];
const KNOWN_FILES = ["about-me.txt"];

const aboutMe = `Location:  Toronto, ON
Focus:     Data Science, Economics, AI
Tools:     Python, R, SQL, TensorFlow, Pandas

I'm a Data Scientist and Applied Economist based in Toronto, Canada.
I build tools at the intersection of data, economics, and AI — turning
complex datasets into actionable insights and pragmatic solutions.

My work spans predictive modeling, NLP, web scraping, interactive
dashboards, and voice AI. I'm especially interested in civic tech,
housing markets, sustainability, and making data accessible.`;

const projectList = `Computare            Personal finance platform for Canadians
Adio                 Voice AI repair companion
Municipalities       AI-powered municipal budget scraper`;

const fullProjectList = `Computare            Personal finance platform for Canadians
Adio                 Voice AI repair companion
Municipalities       AI-powered municipal budget scraper
LinkedIn Scraper     Job data extraction with LLM enhancement
Deep Learning CNN    CIFAR-10 regularization study
House Prices        ML pipeline for residential sales
Auto Dashboard       Canadian automotive stocks & exports
Census Explorer      Canadian census data interactive explorer
BEV Prediction       Electric vehicle stock forecasting
Public Opinion       Text similarity & sentiment analysis`;

function normalizePath(path: string): string {
  let p = path.replace(/\/+$/, "");
  if (p.startsWith("./")) p = p.slice(2);
  return p;
}

export const commands: Record<string, Command> = {
  cat: {
    description: "Display file contents. Try: cat about-me.txt",
    execute: async (args, ctx) => {
      const file = normalizePath(args[0] || "");
      if (file === "about-me.txt") {
        ctx.addLine("output", aboutMe);
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (KNOWN_DIRECTORIES.includes(file)) {
        ctx.addLine("error", `cat: ${file}: Is a directory. Try: ls ${file}`);
        return;
      }
      ctx.addLine("error", `cat: ${file || ""}: No such file or directory`);
    },
  },

  ls: {
    description: "List directory contents. Try: ls, ls projects, ls projects -a, ls -a",
    execute: async (args, ctx) => {
      const showAll = args.includes("-a") || args.includes("--all") || args.includes("-la") || args.includes("-al");
      const target = normalizePath(args.filter((a) => !a.startsWith("-"))[0] || "");

      if (target === "projects" && !showAll) {
        ctx.addLine("output", projectList);
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (target === "projects" && showAll) {
        ctx.addLine("output", fullProjectList);
        window.location.href = "/projects";
        return;
      }

      if (target === ".writeups" || target === "writeups") {
        ctx.addLine("output", "you found the hidden writeups directory. Coming soon...");
        await new Promise((r) => setTimeout(r, 1200));
        window.location.href = "/writeups";
        return;
      }

      if (target === "workspace") {
        ctx.addLine("output", "workspace/");
        window.location.href = "/workspace";
        return;
      }

      if (target === "about-me.txt") {
        ctx.addLine("error", `about-me.txt: is a file. Try: cat about-me.txt`);
        return;
      }

      if (target) {
        const isDir = KNOWN_DIRECTORIES.includes(target);
        const isFile = KNOWN_FILES.includes(target);
        if (!isDir && !isFile) {
          ctx.addLine("error", `ls: cannot access '${target}': No such file or directory`);
          return;
        }
      }

      if (!target) {
        const entries = showAll
          ? ".writeups/  about-me.txt  projects/  workspace/"
          : "about-me.txt  projects/  workspace/";
        ctx.addLine("output", entries);
        return;
      }
    },
  },

  cd: {
    description: "Change directory. Try: cd workspace, cd projects, cd .writeups",
    execute: async (args, ctx) => {
      const target = normalizePath(args[0] || "");

      if (target === "~" || target === "/" || target === "~/andrew-girgis" || target === "") {
        ctx.addLine("output", "~/andrew-girgis");
        window.location.href = "/";
        return;
      }

      if (target === "workspace") {
        ctx.addLine("output", "~/andrew-girgis/workspace");
        window.location.href = "/workspace";
        return;
      }

      if (target === "projects") {
        ctx.addLine("output", "~/andrew-girgis/projects");
        window.location.href = "/projects";
        return;
      }

      if (target === ".writeups" || target === "writeups") {
        ctx.addLine("output", "~/andrew-girgis/.writeups");
        window.location.href = "/writeups";
        return;
      }

      if (KNOWN_FILES.includes(target)) {
        ctx.addLine("error", `cd: ${target}: Not a directory. Try: cat ${target}`);
        return;
      }

      ctx.addLine("error", `cd: no such directory: ${target}`);
    },
  },

  pwd: {
    description: "Print working directory",
    execute: async () => {
      return "~/andrew-girgis";
    },
  },

  whoami: {
    description: "Display current user info",
    execute: async () => {
      return `Andrew Girgis
Data Scientist · Applied Economist
Toronto, ON`;
    },
  },

  help: {
    description: "Show available commands",
    execute: async () => {
      return `Available commands:
  cat <file>        Display file contents (try: cat about-me.txt)
  ls [dir]          List directory contents (try: ls, ls -a)
  ls <dir> -a       Show all items including hidden
  cd <dir>          Navigate to a page (workspace, projects, .writeups)
  pwd               Print working directory
  whoami            Display current user info
  clear             Clear terminal output
  neofetch          System info
  help              Show this help message`;
    },
  },

  clear: {
    description: "Clear terminal output",
    execute: async (_args, ctx) => {
      ctx.clearLines();
    },
  },

  neofetch: {
    description: "Display system info (easter egg)",
    execute: async () => {
      const logo = [
        "    .:=+*#%@#*+:.     ",
        "  :#@@@@@@@@@@@@@#-.   ",
        " +@@@#*+=---=+*#%@@+  ",
        "-@*:..   .---..  :*@. ",
        " *=. .-==+==-.    .+= ",
        "  . .+=.   .=+.  .    ",
        "   .+:  =+=  .=+:     ",
        "   *#. -*-  .+%+      ",
        "    +#@@@@@@%*=        ",
        "      -*##*+-.         ",
      ];
      const info = [
        "andrew@andrew-girgis",
        "──────────────────────",
        "OS: macOS Darwin",
        "Host: MacBook Pro",
        "Kernel: Data Science",
        "Shell: Python 3.12",
        "Terminal: Geist Mono",
        "Editor: VS Code",
        "Theme: Snowflake Dark",
        "",
        "████████████████  CPU: Curiosity @ ∞GHz",
        "████████████████  Memory: Lots of coffee",
        "████████████████  Uptime: Since the data said so",
        "████████████████  Packages: pip(347), npm(42)",
        "████████████████  Resolution: More pixels than patience",
      ];
      const lines: string[] = [];
      const maxLines = Math.max(logo.length, info.length);
      for (let i = 0; i < maxLines; i++) {
        const left = (logo[i] || "").padEnd(22);
        const right = info[i] || "";
        lines.push(left + right);
      }
      return lines.join("\n");
    },
  },

  sudo: {
    description: "Execute command as superuser (spoiler: you can't)",
    execute: async (args, ctx) => {
      ctx.addLine("system", "[sudo] password for andrew: ********");
      await new Promise((r) => setTimeout(r, 800));
      ctx.addLine("error", "sudo: Access denied. Nice try though.");
    },
  },

  coffee: {
    description: "Brew some coffee",
    execute: async (_args, ctx) => {
      ctx.addLine("system", "☕ Brewing...");
      await new Promise((r) => setTimeout(r, 1500));
      ctx.addLine("output", "☕ Just kidding, I drink tea. 🍵");
    },
  },

  "rm -rf": {
    description: "Remove files recursively and forcefully",
    execute: async (_args, ctx) => {
      ctx.addLine("error", "rm: Permission denied. You don't want to do that. 🛑");
    },
  },

  exit: {
    description: "Close the terminal",
    execute: async () => {
      return "There is no escape. This terminal is forever. Just kidding — try the X button on the global terminal, or just scroll down.";
    },
  },
};