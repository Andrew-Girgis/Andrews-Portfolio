interface ComingSoonPageProps {
  command: string;
  title: string;
  description: string;
}

const ComingSoonPage = ({ command, title, description }: ComingSoonPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          <span className="text-primary">$</span> {command}
        </h1>
        <p className="text-muted-foreground mb-12">{description}</p>

        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            <span className="text-primary">$</span> echo "{title}: coming soon..."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
