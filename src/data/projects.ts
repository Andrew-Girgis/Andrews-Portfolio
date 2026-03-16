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
    lastCommitDate: "2026-02-17T00:10:08Z",

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
    lastCommitDate: "2025-06-21T19:49:59Z",

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
    lastCommitDate: "2025-12-09T05:48:27Z",

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
    lastCommitDate: "2026-01-03T03:24:06Z",

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
    lastCommitDate: "2026-01-01T20:36:55Z",

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
    lastCommitDate: "2025-05-28T21:45:54Z",

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
    lastCommitDate: "2025-09-25T12:38:22Z",

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
  {
    id: "linkedin-company-scraper",
    title: "LinkedIn Company Scraper",
    subtitle: "Extract structured company data from LinkedIn",
    description:
      "This Python-based tool allows users to extract comprehensive company information from LinkedIn pages, including industry, size, and headquarters. Key features include batch processing, LinkedIn ID extraction for job search integration, and organized JSON output. It is designed for researchers and developers seeking structured data for analysis.",
    lastCommitDate: "2025-07-01T04:21:30Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/linkedin-company-scraper",
    githubRepo: "Andrew-Girgis/linkedin-company-scraper",
    tags: {
      technology: ["python", "linkedin", "web-scraping"],
      domain: ["data-extraction", "job-search"],
      type: ["tool", "scraper"],
      method: ["web-scraping"],
    },
  },
  {
    id: "stratascratch-sql-practice",
    title: "SQL Practice Solutions",
    subtitle: "Collection of SQL solutions for interview questions",
    description:
      "This project showcases a personal collection of SQL solutions to practice problems sourced from StratasScratch, a platform for real-world data science interview questions. Each problem is organized in its own folder, featuring a detailed description and multiple solution approaches, allowing for a comprehensive understanding of SQL techniques and best practices.",
    lastCommitDate: "2026-02-19T16:24:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/stratascratch-sql-practice",
    githubRepo: "Andrew-Girgis/stratascratch-sql-practice",
    tags: {
      technology: ["sql"],
      domain: ["data-science", "analytics"],
      type: ["practice", "repository"],
      method: ["problem-solving"],
    },
  },
  {
    id: "computare-doc-ingest",
    title: "Document OCR Ingest",
    subtitle: "Lightweight CLI for document processing",
    description:
      "This project provides a command-line interface for performing optical character recognition (OCR) on documents and extracting data in JSON format. It features a two-step processing method and evaluation capabilities, allowing users to run tasks on various document types. Built using Python, it leverages structured pipelines and customizable prompts for efficient data extraction.",
    lastCommitDate: "2026-02-08T23:01:09Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/computare-doc-ingest",
    githubRepo: "Andrew-Girgis/computare-doc-ingest",
    tags: {
      technology: ["python"],
      domain: ["data-extraction", "document-processing"],
      type: ["cli-tool"],
      method: ["optical-character-recognition"],
    },
  },
  {
    id: "computare",
    title: "Personal Finance Platform",
    subtitle: "AI-powered transaction categorization tool",
    description:
      "This open-source personal finance platform extracts transactions from Canadian bank statements and categorizes them using AI. It detects recurring subscriptions and stores all data in a structured PostgreSQL database, supporting institutions like Scotiabank, Wealthsimple, and American Express.",
    lastCommitDate: "2026-02-06T22:07:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Computare",
    githubRepo: "Andrew-Girgis/Computare",
    tags: {
      technology: ["python", "typescript", "postgresql", "css", "javascript"],
      domain: ["finance", "artificial-intelligence"],
      type: ["full-stack-app"],
      method: ["web-scraping", "data-categorization"],
    },
  },
  {
    id: "celevid",
    title: "AI Video Editor",
    subtitle: "Automated video processing with AI",
    description:
      "Celevid is an AI-powered video editing tool that automates transcription, pause removal, and captioning for videos. It features GPU-accelerated transcription, multiple caption styles, and supports various video formats. Built using Python, Celevid is designed for fast processing and detailed analytics.",
    lastCommitDate: "2026-01-28T04:59:06Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/celevid",
    githubRepo: "Andrew-Girgis/celevid",
    tags: {
      technology: ["python"],
      domain: ["machine-learning", "video-editing"],
      type: ["tool"],
      method: ["transcription", "video-processing"],
    },
  },
  {
    id: "x-video-downloader",
    title: "Video Downloader Tool",
    subtitle: "Download videos from X/Twitter easily",
    description:
      "This project is a simple terminal-friendly wrapper around `yt-dlp`, allowing users to download videos from X/Twitter effortlessly. It offers features such as customizable output directories and metadata printing in JSON format. Built using Python, it streamlines the video downloading process for users who prefer command-line tools.",
    lastCommitDate: "2026-01-27T05:30:23Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/x-video-downloader",
    githubRepo: "Andrew-Girgis/x-video-downloader",
    tags: {
      technology: ["python", "yt-dlp"],
      domain: ["social-media"],
      type: ["command-line-tool"],
      method: ["video-downloading"],
    },
  },
  {
    id: "property-geocode-checker",
    title: "Property Geocode Checker",
    subtitle: "Validate property geocoding accuracy",
    description:
      "This project allows users to validate latitude and longitude values for a list of properties by re-geocoding each address using the Google Maps Geocoding API. It compares the geocoded coordinates with the provided ones and generates a summary report along with a list of mismatches, making it easy to identify discrepancies in geocoding results.",
    lastCommitDate: "2026-01-11T07:43:34Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/property-geocode-checker",
    githubRepo: "Andrew-Girgis/property-geocode-checker",
    tags: {
      technology: ["python", "google-maps-api"],
      domain: ["real-estate", "data-validation"],
      type: ["data-tool"],
      method: ["geocoding", "data-comparison"],
    },
  },
  {
    id: "nfl-project",
    title: "NFL Correlation Analysis",
    subtitle: "Exploring wins and penalties in football",
    description:
      "This project investigates the correlation between game wins and penalty flags in American Football. By analyzing historical data, it aims to uncover patterns that may influence team performance. The project utilizes statistical methods to provide insights into how penalties impact game outcomes.",
    lastCommitDate: "2025-02-14T20:49:18Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/NFL-Project",
    githubRepo: "Andrew-Girgis/NFL-Project",
    tags: {
      technology: ["python", "pandas", "matplotlib"],
      domain: ["sports-analytics", "data-science"],
      type: ["research", "analysis"],
      method: ["correlation-analysis", "data-visualization"],
    },
  },
  {
    id: "personal-rag-pipeline",
    title: "Personal RAG Pipeline",
    description:
      "This project implements a personal RAG (Red, Amber, Green) pipeline to streamline data processing and visualization. It focuses on automating data workflows and enhancing decision-making through clear visual indicators. The pipeline is designed to be efficient and user-friendly, making it accessible for data scientists and economists alike.",
    lastCommitDate: "2025-12-07T23:44:45Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/personal-rag-pipeline",
    githubRepo: "Andrew-Girgis/personal-rag-pipeline",
    tags: {
      technology: ["python", "pandas", "matplotlib"],
      domain: ["data-science", "economics"],
      type: ["data-pipeline", "automation"],
      method: ["data-visualization", "workflow-automation"],
    },
  },
  {
    id: "public-jobs-scraper",
    title: "Government Jobs Scraper",
    subtitle: "Automated analysis of technical government job postings",
    description:
      "This project systematically collects and analyzes technical government job postings from Canada, the UK, and Australia to explore differences in position classifications, compensation structures, and qualification requirements. Utilizing Python and PLpgSQL, it features an automated data collection system covering 14 jurisdictions and monitoring 44-46 job categories, enabling comprehensive labor market analysis.",
    lastCommitDate: "2025-12-07T06:09:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/public_jobs_scraper",
    githubRepo: "Andrew-Girgis/public_jobs_scraper",
    tags: {
      technology: ["python", "plpgsql", "playwright"],
      domain: ["public-administration", "labor-market"],
      type: ["research"],
      method: ["web-scraping", "data-analysis"],
    },
  },
  {
    id: "seti-demo-chatbot",
    title: "SETI Chatbot",
    subtitle: "Interactive chatbot for SETI research",
    description:
      "This project features an interactive chatbot designed to assist users in exploring the Search for Extraterrestrial Intelligence (SETI). Built using HTML, it provides a user-friendly interface for engaging with SETI-related queries and information. The chatbot aims to enhance public understanding of SETI initiatives and foster interest in space exploration.",
    lastCommitDate: "2025-07-11T20:06:52Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/SETI-demo-chatbot",
    githubRepo: "Andrew-Girgis/SETI-demo-chatbot",
    tags: {
      technology: ["html"],
      domain: ["space-exploration", "education"],
      type: ["web-app"],
      method: ["chatbot"],
    },
  },
  {
    id: "toronto-fire-incidents-plotly",
    title: "Toronto Fire Incidents",
    subtitle: "Interactive mapping dashboard for fire incidents",
    description:
      "This project is an interactive Plotly Dash web app that visualizes every Toronto Fire Service incident from 2011 to 2024. Users can explore total fires per ward, compare fires per 1,000 residents, and view individual incident data through an engaging interface. Built with Python, CSS, and JavaScript, it features zero-config hosting and is designed for extensibility.",
    lastCommitDate: "2025-06-29T00:05:24Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/toronto-fire-incidents-plotly",
    githubRepo: "Andrew-Girgis/toronto-fire-incidents-plotly",
    tags: {
      technology: ["python", "css", "javascript"],
      domain: ["public-safety", "data-visualization"],
      type: ["dashboard", "web-app"],
      method: ["data-exploration"],
    },
  },
  {
    id: "data-science-for-economists",
    title: "Data Science for Economists",
    subtitle: "Coursework from ECON 607",
    description:
      "This repository showcases the coursework completed for ECON 607: Data Science for Economists, highlighting assignments and projects that demonstrate data management, manipulation, and visualization techniques. Utilizing tools such as Python, R, and MATLAB, the projects cover topics like text analysis and unsupervised learning, providing practical skills essential for analyzing complex datasets in economics.",
    lastCommitDate: "2025-01-21T05:15:05Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Data-Science-For-Economists",
    githubRepo: "Andrew-Girgis/Data-Science-For-Economists",
    tags: {
      technology: ["python", "r", "matlab"],
      domain: ["economics", "data-science"],
      type: ["coursework", "projects"],
      method: ["data-manipulation", "data-visualization"],
    },
  },
  {
    id: "iasc-1p02",
    title: "Intro to Web Development",
    subtitle: "Foundational web projects from university course",
    description:
      "This project showcases a collection of foundational web pages created during Andrew Girgis's first-year course in Interactive Arts and Science at Brock University. It focuses on the basics of web development, utilizing HTML5 for content structure and CSS3 for styling and layout. The project highlights key features such as semantic HTML, CSS classes, and image embedding, marking Andrew's initial foray into frontend development.",
    lastCommitDate: "2017-12-07T19:41:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/IASC-1P02",
    githubRepo: "Andrew-Girgis/IASC-1P02",
    tags: {
      technology: ["html5", "css3", "javascript"],
      domain: ["web-development", "education"],
      type: ["frontend-project"],
      method: ["web-design"],
    },
  },
  {
    id: "data-vizualization",
    title: "Data Visualization",
    subtitle: "Visualizing data from STAT 842",
    description:
      "This project contains code developed for the STAT 842 course, focusing on various data visualization techniques. It utilizes a range of programming languages including Python and R to create insightful visual representations of data. Key features include interactive plots and comprehensive data analysis tools, making it a valuable resource for understanding complex datasets.",
    lastCommitDate: "2025-04-04T04:25:16Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Data-Vizualization",
    githubRepo: "Andrew-Girgis/Data-Vizualization",
    tags: {
      technology: ["python", "r", "jupyter-notebook"],
      domain: ["data-visualization", "education"],
      type: ["research", "course-project"],
      method: ["data-analysis", "visualization-techniques"],
    },
  },
  {
    id: "uwes-r-tutorial",
    title: "R Tutorial for Economics",
    subtitle: "Beginner-friendly workshop series",
    description:
      "This project provides a comprehensive R tutorial designed for students interested in economics and data analysis. It covers the basics of R programming and its applications in economic analysis through hands-on sessions. Participants will learn essential R functions and engage in real-world economic data challenges using R and RStudio.",
    lastCommitDate: "2025-03-13T01:08:04Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/UWES-R-Tutorial",
    githubRepo: "Andrew-Girgis/UWES-R-Tutorial",
    tags: {
      technology: ["r", "tex", "rstudio"],
      domain: ["economics", "data-analysis"],
      type: ["workshop", "tutorial"],
      method: ["data-manipulation", "statistical-analysis"],
    },
  },
  {
    id: "exploratory-data-analysis",
    title: "Exploratory Data Analysis",
    description:
      "This project focuses on exploratory data analysis using R and TeX, providing insights into complex datasets. It showcases various statistical techniques and visualizations to uncover patterns and trends. The project emphasizes the importance of data exploration in the data science workflow.",
    lastCommitDate: "2025-02-27T22:15:11Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Exploratory-Data-Analysis",
    githubRepo: "Andrew-Girgis/Exploratory-Data-Analysis",
    tags: {
      technology: ["r", "tex"],
      domain: ["data-science", "economics"],
      type: ["research"],
      method: ["exploratory-data-analysis"],
    },
  },
  {
    id: "applied-macroeconometrics",
    title: "Applied Macroeconometrics",
    description:
      "This project focuses on the application of macroeconomic theories and models using R and TeX. It aims to analyze economic data and provide insights into macroeconomic trends and policies. The project showcases advanced econometric techniques and is designed for researchers and practitioners in the field of economics.",
    lastCommitDate: "2025-02-27T22:14:34Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Applied-Macroeconometrics",
    githubRepo: "Andrew-Girgis/Applied-Macroeconometrics",
    tags: {
      technology: ["r", "tex"],
      domain: ["economics", "macroeconomics"],
      type: ["research"],
      method: ["econometric-analysis"],
    },
  },
  {
    id: "econ626-machinelearningforeconomists",
    title: "Machine Learning for Economists",
    description:
      "This project explores the application of machine learning techniques in economic analysis. It utilizes Jupyter Notebooks to demonstrate various algorithms and their effectiveness in economic modeling. Key technologies include Python and R for data analysis and visualization, making it a valuable resource for economists looking to enhance their data science skills.",
    lastCommitDate: "2025-02-27T22:13:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/ECON626-MachineLearningForEconomists",
    githubRepo: "Andrew-Girgis/ECON626-MachineLearningForEconomists",
    tags: {
      technology: ["python", "r", "jupyter-notebook"],
      domain: ["economics", "machine-learning"],
      type: ["research"],
      method: ["data-analysis", "modeling"],
    },
  },
  {
    id: "touchbistro-cxc",
    title: "TouchBistro Customer Experience",
    description:
      "This project focuses on analyzing customer experience data for TouchBistro, a restaurant management software. Utilizing Jupyter Notebook, it employs data visualization and statistical analysis techniques to derive insights into customer satisfaction and service efficiency. The project aims to enhance decision-making processes for restaurant managers by providing actionable recommendations based on data-driven findings.",
    lastCommitDate: "2025-02-15T20:38:12Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/TouchBistro-CxC",
    githubRepo: "Andrew-Girgis/TouchBistro-CxC",
    tags: {
      technology: ["jupyter-notebook", "python", "data-visualization"],
      domain: ["customer-experience", "data-analysis"],
      type: ["research", "analysis"],
      method: ["statistical-analysis", "data-visualization"],
    },
  },
  {
    id: "valentines-website-2025",
    title: "Valentine's Day Proposal Website",
    subtitle: "An interactive proposal experience",
    description:
      "This charming Valentine's Day proposal website offers a memorable way to ask someone to be your Valentine. It features smooth animations, interactive Yes/No buttons, and playful messages that enhance user engagement. Built with HTML, CSS, and JavaScript, the site is mobile-responsive and designed with a romantic aesthetic.",
    lastCommitDate: "2025-02-13T04:22:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Valentines-Website-2025",
    githubRepo: "Andrew-Girgis/Valentines-Website-2025",
    tags: {
      technology: ["html", "css", "javascript"],
      domain: ["web-development"],
      type: ["interactive-website"],
      method: ["user-engagement"],
    },
  },
];
