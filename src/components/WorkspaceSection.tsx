import DeskSetup from "./DeskSetup";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const WorkspaceSection = () => {
  const handleHotspotSelect = (productId: string) => {
    // Optional: handle product selection (e.g., analytics, navigation)
    console.log('Selected product:', productId);
  };

  return (
    <section id="workspace" className="py-24 lg:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-foreground">
              Houston — Andrew's Setup
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This is the setup I use to build data products, experiment with machine learning,
              and ship projects. Hover over each part to see the tools I use and how they fit into my workflow.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Desk Setup */}
        <ScrollReveal variant="scaleIn">
          <DeskSetup onSelect={handleHotspotSelect} />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WorkspaceSection;
