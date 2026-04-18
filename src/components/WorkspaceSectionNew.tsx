import { DeskSetup } from "@/components/DeskSetup";

const WorkspaceSection = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          <span className="text-primary">$</span> ls ./workspace
        </h1>
        <p className="text-muted-foreground mb-8">
          This is the setup I use to build data products, experiment with machine learning,
          and ship projects. Hover over each part to see the tools I use.
        </p>

        <DeskSetup />
      </div>
    </div>
  );
};

export default WorkspaceSection;