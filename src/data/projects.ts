import innovationImage from "@/assets/innovation_canada.jpg";
import evStocksImage from "@/assets/future_of_EVStocks.jpg";
import networkImage from "@/assets/Network_Analysis_Portfolio.jpg";
import autoDashboardImage from "@/assets/autodashboardprojectimage.png";
import censusExplorerImage from "@/assets/censusExplorerImage.png";
import { Project } from "@/components/ProjectModal";

export const projects: Project[] = [
  // {
  //   id: "small-businesses-big-impact",
  //   title: "Small Businesses, Big Impact",
  //   subtitle: "Government Funding and Innovation Growth",
  //   description:
  //     "This study explores the impact of government funding on the innovation and growth of small businesses within a country's economy. It aims to analyze how financial support influences entrepreneurial success, technological advancements, and overall economic development.",
  //   image: innovationImage,
  //   imageAlt: "Innovation and small business growth visualization",
  //   status: "coming-soon",
  //   tags: {
  //     technology: ["python", "r", "stata"],
  //     domain: ["economics", "public-policy"],
  //     type: ["research"],
  //     method: ["econometrics", "regression-analysis"],
  //   },
  // },
  {
    id: "automotive-dashboard",
    title: "Driving Performance",
    subtitle: "Analyzing Canada's Automotive Stocks and Export Trends",
    description:
      "This interactive dashboard compares the cumulative returns of leading Canadian automotive companies against the TSX Index while visualizing provincial auto export performance. Built in R Shiny using tidyquant, tidyverse, and Statistics Canada data, it highlights the impact of key global events—such as the COVID-19 pandemic, the Russia–Ukraine war, and recent tariff announcements—on both market behavior and trade dynamics within Canada's automotive sector.",
    image: autoDashboardImage,
    imageAlt: "Canadian automotive stocks and export trends dashboard",
    status: "available",
    link: "https://andrew-girgis.shinyapps.io/canadian_automotive_analysis/",
    tags: {
      technology: ["r", "shiny", "tidyquant", "tidyverse"],
      domain: ["automotive", "finance", "data-visualization"],
      type: ["dashboard"],
      method: ["exploratory-data-analysis", "time-series-analysis"],
    },
  },
  {
    id: "bev-stock-prediction",
    title: "Predicting the Future of Electric Vehicles",
    subtitle: "A Study on BEV Car Manufacturer Stock Returns",
    description:
      "This paper explores predictors of stock market returns for Battery Electric Vehicle (BEV) startups using GARCH and VAR models to forecast volatility and returns. Model accuracy is evaluated via mean absolute percent error. The study identifies optimal forecasting models, assesses volatility and return predictions, and finds the proposed predictors inadequate for accurate forecasting.",
    image: evStocksImage,
    imageAlt: "Battery electric vehicle stock market prediction analysis",
    status: "available",
    link: "#",
    tags: {
      technology: ["python", "garch", "var"],
      domain: ["finance", "automotive"],
      type: ["predictive-model", "research"],
      method: ["time-series-forecasting", "volatility-modeling"],
    },
  },
  {
    id: "public-opinion-text-analysis",
    title: "Understanding Public Opinion",
    subtitle: "Text Similarity and Sentiment Analysis",
    description:
      "This project analyzes the relationship between an article and its comments using text similarity and sentiment analysis techniques. It applies Jaccard and Semantic Similarity scores to measure lexical and contextual overlap and uses sentiment intensity analysis to gauge the emotional tone of comments. Insights are visualized with Gephi to highlight key themes and connections within positive and negative sentiments.",
    image: networkImage,
    imageAlt: "Network visualization of text sentiment analysis",
    status: "available",
    link: "#",
    tags: {
      technology: ["python", "nltk", "scikit-learn", "gephi"],
      domain: ["social-science", "marketing"],
      type: ["text-analysis", "network-visualization"],
      method: ["natural-language-processing", "sentiment-analysis"],
    },
  },
  {
    id: "census-data-explorer",
    title: "Canadian Census Data Explorer",
    description:
      "An R Shiny app that lets users select Census year (2011/2016/2021), pick top Canadian cities, choose geography (CT/DA/CSD), preview results, and download a ZIP (CSV + metadata). Powered by cancensus + Statistics Canada vectors.",
    image: censusExplorerImage,
    imageAlt: "Canadian census data interactive explorer interface",
    status: "available",
    link: "https://andrew-girgis.shinyapps.io/cansensus_scrapr/",
    tags: {
      technology: ["r", "shiny", "cancensus"],
      domain: ["demographics", "public-policy"],
      type: ["dashboard", "data-extraction"],
      method: ["exploratory-data-analysis"],
    },
  },
];
