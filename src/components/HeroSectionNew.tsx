import StarField from "./StarField";
import TypingAnimation from "./TypingAnimation";
import { useState } from "react";

const HeroSection = () => {
  const [typingDone, setTypingDone] = useState(false);

  const lines = [
    { text: "Andrew Girgis", font: "handwriting", delay: 500 },
    { text: "Data Scientist · Applied Economist", font: "handwriting", delay: 0 },
    { text: "Turning complex data into meaningful solutions", font: "handwriting", delay: 0 },
  ];

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <StarField />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md md:max-w-lg rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/30">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">
                ~/andrew-girgis
              </span>
            </div>
            <div className="p-4 font-mono text-sm text-muted-foreground leading-relaxed">
              <p>
                <span className="text-accent">$</span> cat about-me.txt
              </p>
              <pre className="mt-2 text-foreground text-xs sm:text-sm">
{`{
  "location": "Toronto, ON",
  "focus": [
    "Data Science",
    "Economics",
    "AI"
  ],
  "tools": [
    "Python", "R", "SQL",
    "TensorFlow", "Pandas"
  ]
}`}
              </pre>
              <p className="mt-2">
                <span className="text-accent">$</span>{" "}
                <span className="typing-cursor" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <TypingAnimation
            lines={lines}
            speed={45}
            onComplete={() => setTypingDone(true)}
          />

          <div
            className={`mt-8 transition-all duration-700 ${typingDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Learn more
              <svg
                className="w-4 h-4 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;