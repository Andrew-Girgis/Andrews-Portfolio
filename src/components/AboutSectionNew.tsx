import { useState, useEffect, useRef } from "react";

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
      { threshold: 0.15 }
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
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-alt">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${animClass}`}
      >
        <h2 className="text-2xl font-bold text-foreground mb-8 font-mono">
          <span className="text-primary">$</span> cat about-me.txt
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I'm a <span className="text-foreground font-medium">Data Scientist and Applied Economist</span> based in
            Toronto, Canada. I build tools at the intersection of{" "}
            <span className="text-primary">data, economics, and AI</span> — turning complex
            datasets into actionable insights and pragmatic solutions.
          </p>
          <p>
            My work spans predictive modeling, natural language processing, web scraping,
            interactive dashboards, and voice AI. I'm especially interested in civic tech,
            housing markets, sustainability, and making data accessible to people who need it.
          </p>
          <p>
            When I'm not coding, I'm probably reading about urban development, testing
            out the latest AI tools, or exploring the city.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {["Python", "R", "SQL", "TensorFlow", "Pandas", "OpenAI", "Playwright", "Shiny"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-mono rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-default"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;