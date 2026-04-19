import StarField from "./StarField";
import TypingAnimation from "./TypingAnimation";
import AsciiArtPlayer from "./AsciiArtPlayer";
import { saturnFrames } from "@/data/load-frames";
import { saturnArt } from "@/data/ascii-art";
import { useCallback, useState } from "react";

const lines = [
  { text: "Andrew Girgis", font: "handwriting", delay: 500 },
  { text: "Data Scientist · Applied Economist", font: "handwriting", delay: 0 },
  { text: "Turning complex data into meaningful solutions", font: "handwriting", delay: 0 },
];

const HeroSection = () => {
  const [typingDone, setTypingDone] = useState(false);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const frames = saturnFrames.length > 0 ? saturnFrames : [saturnArt.join("\n")];

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hero-typing-complete"));
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <StarField />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 flex justify-center">
          <AsciiArtPlayer
            frames={frames}
            fps={5}
            className="max-w-full"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <TypingAnimation
            lines={lines}
            speed={45}
            onComplete={handleTypingComplete}
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
