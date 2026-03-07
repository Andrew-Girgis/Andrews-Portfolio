import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import WorkspaceSection from "@/components/WorkspaceSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Skip to content for keyboard accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Navigation />
      <HeroSection />
      {/* Wave divider: Hero to About */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 60" className="w-full h-8 sm:h-12 text-background" preserveAspectRatio="none">
          <path d="M0,60 L0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,60 Z" fill="currentColor" />
        </svg>
      </div>
      <AboutSection />
      <ProjectsSection />
      <WorkspaceSection />
      <Footer />
    </div>
  );
};

export default Index;
