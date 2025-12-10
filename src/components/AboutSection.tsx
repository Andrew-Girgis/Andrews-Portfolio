import { GraduationCap, Code, Target, Heart, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfilePictureSwitcher from "@/components/ui/ProfilePictureSwitcher";
import mountainShot from "@/assets/mountain_shot.jpeg";
import headshot from "@/assets/Headshot.jpeg";

const AboutSection = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Andrew Girgis
          </h2>
          <p className="text-xl text-muted-foreground">
            Economist | Data Scientist 
            {/* | Entrepreneur */}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:items-stretch">
          {/* Profile Section - Three Photo Stack */}
          <div className="flex flex-col items-center md:items-start h-full animate-scale-in">
            {/* Photo Cluster Container */}
            <div className="relative w-full flex-1 mb-6 min-h-[520px] md:min-h-[620px]">
              {/* Photo 1: Bottom layer - Main portrait with ProfilePictureSwitcher */}
              <div className="absolute left-1/2 -translate-x-16 md:left-6 md:translate-x-0 -top-12 md:top-20 z-0">
                <ProfilePictureSwitcher 
                  className="w-[200px] md:w-[240px] aspect-[3/4] object-cover rounded-2xl shadow-large transition-all duration-300 hover:shadow-xl"
                  storageKey="aboutProfilePicture"
                />
              </div>

              {/* Photo 2: Middle layer - Headshot (overlaps top-right of Photo 1) */}
                        {/* Photo 2: Middle layer (z-10) - Headshot, overlaps top-right of Photo 1 */}
          <div className="absolute left-1/2 -translate-x-48 md:-left-24 md:translate-x-0 top-28 md:top-80 z-10">
            <img
              src={headshot}
              alt="Andrew Girgis headshot"
              className="w-[200px] md:w-[240px] aspect-[3/4] object-cover rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            />
          </div>

              {/* Photo 3: Top layer - Mountain shot (overlaps top-left of Photo 2) */}
              <div className="absolute left-1/2 -translate-x-16 md:left-6 md:translate-x-0 top-[270px] md:top-[600px] z-20">
                <img
                  src={mountainShot}
                  alt="Andrew enjoying nature and outdoor activities"
                  className="w-[200px] md:w-[240px] aspect-[3/4] rounded-xl object-cover transition-all duration-300 hover:shadow-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            {/* Download Resume Button */}
            <Button asChild variant="default" className="w-full rounded-full">
              <a
                href="/Andrews-Resume.pdf"
                download
                aria-label="Download Andrew Girgis resume (PDF)"
                className="flex items-center justify-center gap-2 w-full"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* About Text */}
          <div className="space-y-8 animate-fade-in">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Welcome! I'm Andrew Girgis, a Data Scientist passionate about
              turning complex data into meaningful solutions.
            </p>

            {/* Education */}
            <Card className="p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
              <div className="flex items-start gap-3 mb-4">
                <GraduationCap className="h-6 w-6 text-primary mt-1" />
                <h3 className="text-xl font-semibold text-foreground">
                  Education
                </h3>
              </div>
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
            </Card>

            {/* Technical Arsenal */}
            <Card className="p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
              <div className="flex items-start gap-3 mb-4">
                <Code className="h-6 w-6 text-primary mt-1" />
                <h3 className="text-xl font-semibold text-foreground">
                  Technical Arsenal
                </h3>
              </div>
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
            </Card>

            {/* Mission */}
            <Card className="p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
              <div className="flex items-start gap-3 mb-4">
                <Target className="h-6 w-6 text-primary mt-1" />
                <h3 className="text-xl font-semibold text-foreground">Mission</h3>
              </div>
              <p className="text-foreground/80">
                Driving positive change through data-driven solutions. I'm
                committed to leveraging technology to solve real-world challenges
                and create sustainable impact.
              </p>
            </Card>

            {/* Beyond Data */}
            <Card className="p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
              <div className="flex items-start gap-3 mb-4">
                <Heart className="h-6 w-6 text-primary mt-1" />
                <h3 className="text-xl font-semibold text-foreground">
                  Beyond Data
                </h3>
              </div>
              <p className="text-foreground/80">
                Enthusiast of automotive technology, physics, and emerging tech.
                Always eager to explore new frontiers and expand my knowledge
                horizon.
              </p>
            </Card>

            {/* CTA */}
            <button
              onClick={scrollToProjects}
              className="group w-full flex items-center justify-center gap-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors py-4"
            >
              Explore My Latest Projects
              <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
