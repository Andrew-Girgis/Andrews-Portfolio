import { GraduationCap, Code, Target, Heart, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfilePictureSwitcher from "@/components/ui/ProfilePictureSwitcher";
import mountainShot from "@/assets/mountain_shot.jpeg";
import headshot from "@/assets/Soccer-pic.jpg";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    content: (
      <div className="space-y-4 text-foreground/80">
        <div>
          <p className="font-semibold">University of Waterloo</p>
          <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
            <li>Master of Arts in Economics</li>
            <li>Graduate Diploma in Computational Data Analytics</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Brock University</p>
          <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
            <li>BA Honours in Economics</li>
            <li>Minor in Applied Computing</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    icon: Code,
    title: "Technical Arsenal",
    content: (
      <ul className="space-y-2 text-foreground/80">
        <li>
          <strong>Languages:</strong> Python, R, SQL
        </li>
        <li>
          <strong>Data Science:</strong> pandas, NumPy, scikit-learn,
          TensorFlow
        </li>
        <li>
          <strong>Focus Areas:</strong> Machine Learning, Econometrics,
          Data Visualization
        </li>
      </ul>
    ),
  },
  {
    icon: Target,
    title: "Mission",
    content: (
      <p className="text-foreground/80">
        Driving positive change through data-driven solutions. I'm
        committed to leveraging technology to solve real-world challenges
        and create sustainable impact.
      </p>
    ),
  },
  {
    icon: Heart,
    title: "Beyond Data",
    content: (
      <p className="text-foreground/80">
        Enthusiast of automotive technology, physics, and emerging tech.
        Always eager to explore new frontiers and expand my knowledge
        horizon.
      </p>
    ),
  },
];

const AboutSection = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="about" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Subtle gradient blob for depth */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold font-serif text-foreground mb-4">
              Andrew Girgis
            </h2>
            <p className="text-xl text-muted-foreground">
              Data Scientist | Applied Economist
              {/* | Entrepreneur */}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:items-stretch">
          {/* Profile Section - Tilted Photo Stack */}
          <ScrollReveal variant="slideLeft">
            <div className="flex flex-col items-center md:items-start h-full">
              <div className="relative w-full flex-1 mb-6 min-h-[520px] md:min-h-[620px]">
                {/* Photo 1: Bottom layer - Main portrait */}
                <div className="absolute left-1/2 -translate-x-16 md:left-6 md:translate-x-0 -top-12 md:top-20 z-0">
                  <ProfilePictureSwitcher
                    className="w-[200px] md:w-[240px] aspect-[3/4] object-cover rounded-2xl shadow-large transition-all duration-300 hover:shadow-xl"
                    storageKey="aboutProfilePicture"
                  />
                </div>

                {/* Photo 2: Middle layer - Headshot */}
                <div className="absolute left-1/2 -translate-x-48 md:-left-24 md:translate-x-0 top-28 md:top-80 z-10">
                  <img
                    src={headshot}
                    alt="Andrew Girgis playing soccer"
                    loading="lazy"
                    className="w-[200px] md:w-[240px] aspect-[3/4] object-cover rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Photo 3: Top layer - Mountain shot */}
                <div className="absolute left-1/2 -translate-x-16 md:left-6 md:translate-x-0 top-[270px] md:top-[600px] z-20">
                  <img
                    src={mountainShot}
                    alt="Andrew enjoying nature and outdoor activities"
                    loading="lazy"
                    className="w-[200px] md:w-[240px] aspect-[3/4] rounded-xl object-cover transition-all duration-300 hover:shadow-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>

              {/* Download Resume Button */}
              <Button asChild className="w-full rounded-full bg-accent-warm hover:bg-accent-warm/90 text-accent-warm-foreground">
                <a
                  href="/Andrews-Resume.pdf"
                  target="_blank"
                  aria-label="View Andrew Girgis resume (PDF)"
                  className="flex items-center justify-center gap-2 w-full"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* About Text */}
          <div className="space-y-8">
            <ScrollReveal>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Welcome! I'm Andrew Girgis, a Data Scientist passionate about
                turning complex data into meaningful solutions.
              </p>
            </ScrollReveal>

            {cards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.1}>
                <Card className="p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <card.icon className="h-6 w-6 text-primary mt-1" />
                    <h3 className="text-xl font-semibold font-serif text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  {card.content}
                </Card>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal>
              <button
                onClick={scrollToProjects}
                className="group w-full flex items-center justify-center gap-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors py-4"
              >
                Explore My Latest Projects
                <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
