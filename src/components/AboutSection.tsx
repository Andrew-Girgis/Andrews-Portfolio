import { GraduationCap, Code, Target, Heart, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfilePictureSwitcher from "@/components/ui/ProfilePictureSwitcher";

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
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Profile Section */}
          <div className="flex flex-col items-center animate-scale-in">
            <ProfilePictureSwitcher 
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-large mb-6 hover:scale-105"
              storageKey="aboutProfilePicture"
            />
            <Button asChild variant="default" className="w-full rounded-full">
              <a
                href="/Andrew_Girgis_Resume_v2025-11.pdf"
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
