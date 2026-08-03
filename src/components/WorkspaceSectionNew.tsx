import { DeskSetup } from "@/components/DeskSetup";

const WorkspaceSection = () => {
  return (
    <section id="workspace" className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground font-mono">
            <span className="text-primary">$</span> open ./workspace
          </h2>
          <p className="mt-2 text-muted-foreground">
            This is the setup I use to build data products, experiment with machine learning,
            and ship projects. Hover over each part to see the tools I use.
          </p>
        </div>

        <div>
          <DeskSetup />
        </div>
      </div>
    </section>
  );
};

export default WorkspaceSection;
