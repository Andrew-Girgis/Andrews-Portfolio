import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import innovationImage from "@/assets/innovation_canada.jpg";
import evStocksImage from "@/assets/future_of_EVStocks.jpg";
import networkImage from "@/assets/Network_Analysis_Portfolio.jpg";

interface Project {
  title: string;
  description: string;
  image: string;
  status?: "coming-soon" | "available";
  link?: string;
}

const projects: Project[] = [
  {
    title: "Small businesses... Big impact",
    description:
      "This study explores the impact of government funding on the innovation and growth of small businesses within a country's economy. It aims to analyze how financial support influences entrepreneurial success, technological advancements, and overall economic development.",
    image: innovationImage,
    status: "coming-soon",
  },
  {
    title:
      "Can we predict the future of the cars of the future: A study on predictors of BEV car manufacturer stock returns",
    description:
      "This paper explores predictors of stock market returns for Battery Electric Vehicle (BEV) startups using GARCH and VAR models to forecast volatility and returns. Model accuracy is evaluated via mean absolute percent error. The study identifies optimal forecasting models, assesses volatility and return predictions, and finds the proposed predictors inadequate for accurate forecasting.",
    image: evStocksImage,
    status: "available",
    link: "#",
  },
  {
    title:
      "Understanding Public Opinion Through Text Similarity and Sentiment Analysis",
    description:
      "This project analyzes the relationship between an article and its comments using text similarity and sentiment analysis techniques. It applies Jaccard and Semantic Similarity scores to measure lexical and contextual overlap and uses sentiment intensity analysis to gauge the emotional tone of comments. Insights are visualized with Gephi to highlight key themes and connections within positive and negative sentiments.",
    image: networkImage,
    status: "available",
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-foreground mb-16 animate-fade-in-up">
          Projects & Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => project.link && window.open(project.link, "_blank")}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.status === "coming-soon" && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    COMING SOON
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
