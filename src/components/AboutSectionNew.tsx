import { useState, useEffect, useRef } from "react";
import ProfilePictureSwitcher from "@/components/ui/ProfilePictureSwitcher";

const headshot = "/about/Soccer-pic.jpg";
const mountainShot = "/about/mountain_shot.jpeg";

const AboutSection = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animClass = !mounted
    ? "opacity-100 translate-y-0"
    : isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8";

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${animClass}`}
      >
        <h2 className="text-2xl font-bold text-foreground mb-8 font-mono">
          <span className="text-primary">$</span> cat about-me.txt
        </h2>

        <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:items-center">
          <div className="relative mx-auto min-h-[500px] w-full max-w-[420px] lg:mx-0">
            <div className="absolute left-4 top-6 z-10 rotate-[-4deg]">
              <ProfilePictureSwitcher
                className="h-[340px] w-[250px] rounded-[1.75rem] border border-border/80 object-cover shadow-2xl shadow-black/30"
                storageKey="aboutProfilePicture"
              />
            </div>
            <div className="absolute right-1 top-28 z-20 rotate-[5deg]">
              <img
                src={headshot}
                alt="Andrew Girgis playing soccer"
                loading="lazy"
                className="h-[270px] w-[205px] rounded-[1.5rem] border border-border/80 object-cover object-[55%_50%] shadow-2xl shadow-black/30"
              />
            </div>
            <div className="absolute bottom-8 left-12 z-30 rotate-[-2deg]">
              <img
                src={mountainShot}
                alt="Andrew outdoors in the mountains"
                loading="lazy"
                className="h-[185px] w-[255px] rounded-[1.35rem] border border-border/80 object-cover object-center shadow-2xl shadow-black/30"
              />
            </div>
          </div>

          <div>
            <div className="space-y-6 rounded-2xl border border-border bg-card/70 p-6 text-muted-foreground leading-relaxed shadow-lg backdrop-blur-sm sm:p-8">
              <p>
                I'm a{" "}
                <span className="text-foreground font-medium">
                  Data Scientist and Technical Builder
                </span>{" "}
                based in Toronto, Canada. I build products and tools that
                combine{" "}
                <span className="text-primary">data, AI, and software</span> to
                solve real-world problems.
              </p>
              <p>
                My work spans machine learning, AI applications, data
                engineering, web scraping, interactive dashboards, and
                automations. I'm especially interested in the automotive market,
                property tech, sustainability, and open source software.
              </p>
              <p>
                When I'm not building, I'm probably playing soccer,
                experimenting with the latest AI tools, or diving down a rabbit
                hole to learn something new.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Python",
                "R",
                "SQL",
                "Machine Learning",
                "Plotly",
                "Shiny",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-mono rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm hover:text-foreground hover:border-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
