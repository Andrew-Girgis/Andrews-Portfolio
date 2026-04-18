import { writeups } from "@/data/writeups";

const WriteupsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          <span className="text-primary">$</span> ls ./writeups
        </h1>
        <p className="text-muted-foreground mb-12">
          Writeups, research notes, and deep dives.
        </p>

        {writeups.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              <span className="text-primary">$</span> echo "Nothing here yet. Check back soon."
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {writeups.map((writeup) => (
              <a
                key={writeup.id}
                href={writeup.link || "#"}
                className="group block rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {writeup.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{writeup.description}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">{writeup.date}</span>
                  <div className="flex gap-1.5">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteupsPage;