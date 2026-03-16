import innovationImage from "@/assets/innovation_canada.jpg";
import evStocksImage from "@/assets/future_of_EVStocks.jpg";
import networkImage from "@/assets/Network_Analysis_Portfolio.jpg";
import autoDashboardImage from "@/assets/autodashboardprojectimage.jpg";
import censusExplorerImage from "@/assets/censusExplorerImage.jpg";
import adioImage from "@/assets/adio.jpg";
import linkedinJobScraperImage from "@/assets/linkedinJobScraper.jpg";
import municipalitiesBudgetScraperImage from "@/assets/municipalitiesBudgetScraper.jpg";
import deepLearningCNNImage from "@/assets/deepLearningCNN.jpg";
import housePricePredictionImage from "@/assets/housePricePrediction.jpg";
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
    id: "adio",
    title: "Adio",
    subtitle: "Voice AI Repair Companion",
    image: adioImage,
    imageAlt: "Adio voice AI repair companion interface",
    description:
      "Adio is a voice-first repair companion for home appliances and basic car fixes. It executes one procedural step at a time with confirmation-gated progression and interruption commands. Built for the AI Agents Waterloo Voice Hackathon. Features parallel STT race (smallest.ai Pulse + OpenAI Realtime), smallest.ai Waves streaming TTS, Supabase Postgres + pgvector RAG, and a YouTube Guide Mode that compiles video transcripts into step-by-step repair procedures.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Adio",
    githubRepo: "Andrew-Girgis/Adio",
    tags: {
      technology: ["typescript", "openai", "supabase", "pgvector"],
      domain: ["ai", "voice-ai", "consumer-tech"],
      type: ["full-stack-app"],
      method: ["rag", "speech-to-text", "text-to-speech"],
    },
  },
  {
    id: "linkedin-job-scraper",
    title: "LinkedIn Job Scraper",
    subtitle: "Intelligent Job Data Extraction with LLM Enhancement",
    image: linkedinJobScraperImage,
    imageAlt: "LinkedIn job scraper data extraction pipeline",
    imagePosition: "center 15%",
    description:
      "A comprehensive LinkedIn job scraping tool that extracts job postings with intelligent parsing, LLM-enhanced skill extraction, and MongoDB storage. Features regex/NLP-based extraction combined with OpenAI GPT for skills analysis, a webhook server with Chrome browser extension for one-click job saving, MongoDB with auto-deduplication, and intelligent parsing of employment type, salary, benefits, and location.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/linkedin-job-scraper",
    githubRepo: "Andrew-Girgis/linkedin-job-scraper",
    tags: {
      technology: ["python", "selenium", "openai", "mongodb"],
      domain: ["career", "data-engineering"],
      type: ["scraper", "full-stack-app"],
      method: ["web-scraping", "nlp", "data-pipeline"],
    },
  },
  {
    id: "municipalities-budget-scraper",
    title: "Municipalities Budget Scraper",
    subtitle: "AI-Powered Municipal Financial Report Discovery",
    image: municipalitiesBudgetScraperImage,
    imageAlt: "Municipal financial report discovery dashboard",
    description:
      "An intelligent web scraper built in support of @BuildCanada that automatically discovers and downloads annual audited financial reports from Canadian municipality websites. Features AI-powered document discovery via OpenAI, Firecrawl API for web crawling, Playwright browser automation, and a 4-strategy PDF extraction pipeline. Processes all 3,696 Canadian municipalities with URL caching for 10x faster subsequent runs.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Municipalities-Budget-Scraper",
    githubRepo: "Andrew-Girgis/Municipalities-Budget-Scraper",
    tags: {
      technology: ["python", "openai", "playwright", "firecrawl"],
      domain: ["civic-tech", "public-policy"],
      type: ["data-engineering", "scraper"],
      method: ["web-scraping", "ai-document-discovery"],
    },
  },
  {
    id: "deep-learning-cnn-cifar10",
    title: "Deep Learning CNN Regularization",
    subtitle: "CIFAR-10 Image Classification (UWaterloo STAT 940)",
    image: deepLearningCNNImage,
    imageAlt: "CNN architecture comparison for CIFAR-10 classification",
    description:
      "A comprehensive exploration of CNN architectures and regularization techniques for CIFAR-10 image classification. Systematically compares 6 model architectures—from a 2-layer baseline to a fully optimized model with batch normalization, dropout, and data augmentation. Key findings include batch normalization stabilizing training, dropout reducing overfitting, and data augmentation improving model robustness. Developed as part of University of Waterloo STAT 940 coursework.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/deep-learning-cnn-regularization-cifar10",
    githubRepo: "Andrew-Girgis/deep-learning-cnn-regularization-cifar10",
    tags: {
      technology: ["python", "tensorflow", "keras"],
      domain: ["computer-vision", "deep-learning"],
      type: ["research"],
      method: ["cnn", "regularization", "image-classification"],
    },
  },
  {
    id: "ml-house-price-prediction",
    title: "House Price Prediction",
    subtitle: "End-to-End ML Pipeline for Residential Home Sales",
    image: housePricePredictionImage,
    imageAlt: "House price prediction model results and feature analysis",
    description:
      "An end-to-end machine learning pipeline for predicting residential home sale prices using linear regression. Covers 2006–2010 housing sales including the 2008 financial crisis. Demonstrates data cleaning, EDA, feature engineering (composite features, log transforms, polynomial terms), and model evaluation. Final model achieves R² = 0.89 with ~$26,000 average prediction error. Built with scikit-learn Pipeline and ColumnTransformer.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/ml-house-price-prediction",
    githubRepo: "Andrew-Girgis/ml-house-price-prediction",
    tags: {
      technology: ["python", "scikit-learn", "pandas"],
      domain: ["real-estate", "finance"],
      type: ["predictive-model"],
      method: ["linear-regression", "feature-engineering", "eda"],
    },
  },
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
    githubRepo: "Andrew-Girgis/canadian-auto-dash",
    tags: {
      technology: ["r", "shiny", "tidyquant", "tidyverse"],
      domain: ["automotive", "finance", "data-visualization"],
      type: ["dashboard"],
      method: ["exploratory-data-analysis", "time-series-analysis"],
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
    githubRepo: "Andrew-Girgis/Cancensus-ScrapR",
    tags: {
      technology: ["r", "shiny", "cancensus"],
      domain: ["demographics", "public-policy"],
      type: ["dashboard", "data-extraction"],
      method: ["exploratory-data-analysis"],
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
];
