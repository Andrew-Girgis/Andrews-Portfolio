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
    lastCommitDate: "2026-04-05T23:04:14Z",

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
    id: "microsoft-workspace-skill",
    title: "Microsoft Workspace Skill",
    subtitle: "Integration with Microsoft Graph API",
    description:
      "This project is a Microsoft Graph API skill for the Hermes Agent, enabling seamless integration with Outlook Calendar, Email, and Contacts. Key features include email management with filters and attachments, calendar event handling, and contact listing. Developed using Python and Shell, it leverages OAuth2 for secure access to Microsoft accounts.",
    lastCommitDate: "2026-04-14T20:24:18Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/microsoft-workspace-skill",
    githubRepo: "Andrew-Girgis/microsoft-workspace-skill",
    tags: {
      technology: ["python", "shell", "microsoft-graph"],
      domain: ["productivity", "email"],
      type: ["api-integration", "skill"],
      method: ["oauth2"],
    },
  },
  {
    id: "accidents-cvpr",
    title: "Accident Detection Competition",
    subtitle: "Predicting accident parameters from CCTV footage",
    description:
      "This project serves as a local research workspace for the Kaggle CVPR 2026 ACCIDENT competition. It focuses on predicting accident timing, localization, and collision types from real CCTV videos using synthetic training data. The repository features Jupyter Notebooks for dataset exploration and baseline models, along with reusable code for effective accident analysis.",
    lastCommitDate: "2026-04-24T21:10:09Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/accidents-cvpr",
    githubRepo: "Andrew-Girgis/accidents-cvpr",
    tags: {
      technology: ["jupyter-notebook", "python"],
      domain: ["machine-learning", "computer-vision"],
      type: ["research", "competition"],
      method: ["zero-shot-learning", "video-analysis"],
    },
  },
  {
    id: "argus",
    title: "Address Intelligence",
    subtitle: "Comprehensive property profiling application",
    description:
      "This full-stack application, Argus, allows users to input a street address or geographic coordinates to receive an extensive property profile. It utilizes Google Maps imagery, AI vision analysis, and geospatial data, featuring a React frontend and a Python FastAPI backend. Key technologies include Docker for infrastructure and OpenAI's GPT-4o for image analysis.",
    lastCommitDate: "2026-04-23T04:28:06Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Argus",
    githubRepo: "Andrew-Girgis/Argus",
    tags: {
      technology: ["react", "python", "fastapi", "docker"],
      domain: ["geospatial", "real-estate"],
      type: ["full-stack-app"],
      method: ["ai-vision-analysis"],
    },
  },
  {
    id: "linkedin-company-scraper",
    title: "LinkedIn Company Scraper",
    subtitle: "Automated data extraction from LinkedIn",
    description:
      "This Python tool extracts detailed company information from LinkedIn pages, making it ideal for researchers and analysts. Key features include batch processing, LinkedIn ID extraction, and organized JSON output. It also offers optional integrations with Supabase and Gemini for enhanced functionality.",
    lastCommitDate: "2025-07-01T04:21:30Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/linkedin-company-scraper",
    githubRepo: "Andrew-Girgis/linkedin-company-scraper",
    tags: {
      technology: ["python", "linkedin", "gemini-api"],
      domain: ["data-extraction", "job-search"],
      type: ["tool", "web-scraping"],
      method: ["web-scraping"],
    },
  },
  {
    id: "kag",
    title: "Kaggle Competition Bootstrapper",
    subtitle: "Streamline your Kaggle workflow from the terminal",
    description:
      "This project provides a Textual TUI tool that simplifies the process of starting Kaggle competitions. Users can quickly scaffold a project folder with essential components like data, notebooks, and notes, while also checking competition access. Built with Python, it enhances productivity by integrating with the Kaggle CLI and offering a user-friendly interface for competition selection.",
    lastCommitDate: "2026-04-19T18:03:19Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/kag",
    githubRepo: "Andrew-Girgis/kag",
    tags: {
      technology: ["python", "kaggle-cli", "textual"],
      domain: ["data-science", "economics"],
      type: ["cli-tool", "workflow-automation"],
      method: ["project-scaffolding", "terminal-ui"],
    },
  },
  {
    id: "hunyuan3d-playground",
    title: "3D Mesh Generation",
    subtitle: "Offline image-to-3D mesh converter",
    description:
      "This project allows users to convert images into textured 3D meshes (.glb) using Tencent's Hunyuan3D-2.1 model. It operates fully offline without the need for an API key, providing a seamless experience for generating 3D assets. Key features include background removal, shape generation, and texture painting, leveraging technologies such as Python, C++, and CUDA.",
    lastCommitDate: "2026-04-14T03:23:46Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/hunyuan3d-playground",
    githubRepo: "Andrew-Girgis/hunyuan3d-playground",
    tags: {
      technology: ["python", "c++", "cuda", "docker", "jupyter-notebook"],
      domain: ["computer-graphics", "machine-learning"],
      type: ["tool", "research"],
      method: ["image-processing", "3d-modeling"],
    },
  },
  {
    id: "municipal-waste-schedule-etl",
    title: "Municipal Waste ETL",
    subtitle: "Automated waste collection schedule pipeline",
    description:
      "This project implements a Python ETL pipeline that automates the extraction, normalization, and aggregation of municipal waste collection schedules from ReCollect. Key features include address resolution, event extraction for multiple municipalities, and robust error handling. The pipeline is designed for scalability and maintainability, producing analytics-ready data formats for further analysis.",
    lastCommitDate: "2026-01-06T13:52:13Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/municipal-waste-schedule-etl",
    githubRepo: "Andrew-Girgis/municipal-waste-schedule-etl",
    tags: {
      technology: ["python"],
      domain: ["data-engineering"],
      type: ["etl-pipeline"],
      method: ["api-integration"],
    },
  },
  {
    id: "computare",
    title: "Personal Finance Platform",
    subtitle: "AI-driven transaction categorization",
    description:
      "This project is an open-source personal finance platform that extracts transactions from Canadian bank statements and categorizes them using AI. Key features include detecting recurring subscriptions and storing data in a structured PostgreSQL database. Built to support Scotiabank, Wealthsimple, and American Express, it employs technologies like Python and TypeScript for robust data handling.",
    lastCommitDate: "2026-02-06T22:07:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Computare",
    githubRepo: "Andrew-Girgis/Computare",
    tags: {
      technology: ["python", "typescript", "postgresql"],
      domain: ["finance", "ai"],
      type: ["full-stack-app"],
      method: ["web-scraping", "data-categorization"],
    },
  },
  {
    id: "stratascratch-sql-practice",
    title: "SQL Practice Solutions",
    subtitle: "Personal SQL solutions for data challenges",
    description:
      "This repository contains a collection of SQL solutions to practice problems sourced from StratasScratch, a platform for real-world data science interview questions. Each problem is organized into its own folder, featuring a detailed description and multiple solution approaches, showcasing the author's analytical skills and problem-solving abilities.",
    lastCommitDate: "2026-02-19T16:24:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/stratascratch-sql-practice",
    githubRepo: "Andrew-Girgis/stratascratch-sql-practice",
    tags: {
      technology: ["sql"],
      domain: ["data-science"],
      type: ["practice-repo"],
      method: ["problem-solving"],
    },
  },
  {
    id: "computare-doc-ingest",
    title: "Document Ingestion CLI",
    subtitle: "Lightweight tool for OCR and JSON extraction",
    description:
      "This project provides a command-line interface for performing optical character recognition (OCR) on documents and extracting data in JSON format. It features two processing methods, allowing users to choose between a one-step process and a more detailed two-step approach. Built with Python, it is designed for ease of use and efficient evaluation of document datasets.",
    lastCommitDate: "2026-02-08T23:01:09Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/computare-doc-ingest",
    githubRepo: "Andrew-Girgis/computare-doc-ingest",
    tags: {
      technology: ["python"],
      domain: ["data-extraction", "document-processing"],
      type: ["cli-tool"],
      method: ["ocr", "json-extraction"],
    },
  },
  {
    id: "celevid",
    title: "AI Video Editor",
    subtitle: "Automated video processing with AI",
    description:
      "Celevid is an AI-powered video editing tool that automatically transcribes videos, removes pauses, and adds captions. Key features include GPU-accelerated transcription, smart pause removal, and customizable caption styles. Built with Python, it supports various video formats and offers detailed analytics on file processing.",
    lastCommitDate: "2026-01-28T04:59:06Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/celevid",
    githubRepo: "Andrew-Girgis/celevid",
    tags: {
      technology: ["python"],
      domain: ["machine-learning", "video-editing"],
      type: ["tool", "automation"],
      method: ["transcription", "pause-removal"],
    },
  },
  {
    id: "x-video-downloader",
    title: "Video Downloader Tool",
    subtitle: "Download videos from X/Twitter easily",
    description:
      "This project is a simple terminal-friendly wrapper around `yt-dlp`, enabling users to download videos from X/Twitter effortlessly. It supports various options such as specifying output directories, filename templates, and metadata printing in JSON format. Built using Python, this tool streamlines the video downloading process with minimal setup.",
    lastCommitDate: "2026-01-27T05:30:23Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/x-video-downloader",
    githubRepo: "Andrew-Girgis/x-video-downloader",
    tags: {
      technology: ["python", "yt-dlp"],
      domain: ["video-downloading"],
      type: ["command-line-tool"],
      method: ["web-scraping"],
    },
  },
  {
    id: "property-geocode-checker",
    title: "Property Geocode Checker",
    subtitle: "Validate property coordinates against Google Maps",
    description:
      "This project allows users to validate latitude and longitude values for a list of properties by re-geocoding each address using the Google Maps Geocoding API. It compares the geocoded results with the provided coordinates, generating a summary report and identifying mismatches. Key features include customizable tolerance for matching coordinates and detailed output for discrepancies.",
    lastCommitDate: "2026-01-11T07:43:34Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/property-geocode-checker",
    githubRepo: "Andrew-Girgis/property-geocode-checker",
    tags: {
      technology: ["python", "google-maps-api"],
      domain: ["real-estate", "data-validation"],
      type: ["data-tool"],
      method: ["geocoding", "data-cleaning"],
    },
  },
  {
    id: "nfl-project",
    title: "NFL Wins and Flags Analysis",
    subtitle: "Exploring the impact of penalties on game outcomes",
    description:
      "This project investigates the correlation between wins and penalties (flags) in American Football. By analyzing game data, it aims to uncover insights into how penalties affect team performance and game outcomes. The project utilizes data analysis techniques to visualize trends and patterns in the data.",
    lastCommitDate: "2025-02-14T20:49:18Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/NFL-Project",
    githubRepo: "Andrew-Girgis/NFL-Project",
    tags: {
      technology: ["python", "pandas", "matplotlib"],
      domain: ["sports-analytics", "data-science"],
      type: ["research"],
      method: ["data-analysis", "statistical-analysis"],
    },
  },
  {
    id: "personal-rag-pipeline",
    title: "Personal RAG Pipeline",
    description:
      "This project implements a personal RAG (Red, Amber, Green) pipeline for data analysis and visualization. It allows users to assess and categorize data based on specific criteria, providing insights into performance metrics. The pipeline utilizes Python for data processing and visualization, making it a valuable tool for data scientists and economists.",
    lastCommitDate: "2025-12-07T23:44:45Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/personal-rag-pipeline",
    githubRepo: "Andrew-Girgis/personal-rag-pipeline",
    tags: {
      technology: ["python", "data-visualization", "data-analysis"],
      domain: ["economics", "data-science"],
      type: ["data-pipeline", "analysis-tool"],
      method: ["data-categorization", "performance-assessment"],
    },
  },
  {
    id: "public-jobs-scraper",
    title: "Government Jobs Scraper",
    subtitle: "Automated data collection for government job postings",
    description:
      "This project systematically collects and analyzes technical government job postings from Canada, the UK, and Australia. It features an automated data collection system that covers 14 jurisdictions, monitoring various job categories to analyze position classifications, compensation structures, and qualification requirements using Python and PLpgSQL.",
    lastCommitDate: "2025-12-07T06:09:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/public_jobs_scraper",
    githubRepo: "Andrew-Girgis/public_jobs_scraper",
    tags: {
      technology: ["python", "plpgsql", "playwright"],
      domain: ["public-administration", "labor-market"],
      type: ["research", "data-collection"],
      method: ["web-scraping", "data-analysis"],
    },
  },
  {
    id: "seti-demo-chatbot",
    title: "SETI Chatbot",
    subtitle: "A chatbot interface for SETI data exploration",
    description:
      "This project showcases a chatbot designed to facilitate user interaction with SETI data. Built using HTML, it provides a user-friendly interface for querying and exploring various datasets related to the Search for Extraterrestrial Intelligence. The chatbot aims to enhance accessibility to complex data through conversational queries.",
    lastCommitDate: "2025-07-11T20:06:52Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/SETI-demo-chatbot",
    githubRepo: "Andrew-Girgis/SETI-demo-chatbot",
    tags: {
      technology: ["html"],
      domain: ["data-exploration", "astronomy"],
      type: ["web-app"],
      method: ["chatbot-interface"],
    },
  },
  {
    id: "toronto-fire-incidents-plotly",
    title: "Toronto Fire Incidents",
    subtitle: "Interactive mapping dashboard for fire incidents in Toronto",
    description:
      "This project is an interactive Plotly Dash web application that visualizes every Toronto Fire Service incident from 2011 to 2024. Users can explore total fires per ward, fires per 1,000 residents, and a raw point cloud of individual incidents, providing insights into fire clustering and neighborhood risks. Built using Python, CSS, and JavaScript, it features zero-config hosting and extensible code for future enhancements.",
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
      "This repository showcases the coursework completed for ECON 607: Data Science for Economists, highlighting assignments and projects that emphasize data management, manipulation, and visualization techniques. Key features include practical applications of Python, R, and MATLAB to analyze complex datasets and create insightful visualizations. The project covers various topics such as text analysis and unsupervised learning, reflecting the skills acquired during the course.",
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
    title: "Web Media Production",
    subtitle: "Foundational web development projects",
    description:
      "This project showcases a collection of initial web projects created for the IASC 1P02 course at Brock University. It focuses on foundational HTML and CSS exercises, highlighting skills in structuring web pages, styling with CSS, and embedding media. The project serves as an introduction to frontend development and reflects the creator's early interest in web technologies.",
    lastCommitDate: "2017-12-07T19:41:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/IASC-1P02",
    githubRepo: "Andrew-Girgis/IASC-1P02",
    tags: {
      technology: ["html", "css", "javascript"],
      domain: ["web-development"],
      type: ["frontend-project"],
      method: ["web-design"],
    },
  },
  {
    id: "data-vizualization",
    title: "Data Visualization",
    subtitle: "Visualizing data from STAT 842",
    description:
      "This project showcases various data visualization techniques applied in the context of STAT 842. It utilizes a diverse set of programming languages including Python and R to create insightful visual representations of data. Key features include interactive plots and comprehensive analysis, making it a valuable resource for understanding statistical concepts.",
    lastCommitDate: "2025-04-04T04:25:16Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Data-Vizualization",
    githubRepo: "Andrew-Girgis/Data-Vizualization",
    tags: {
      technology: ["python", "r", "jupyter-notebook"],
      domain: ["data-visualization", "statistics"],
      type: ["research", "educational"],
      method: ["data-analysis", "visualization-techniques"],
    },
  },
  {
    id: "uwes-r-tutorial",
    title: "R Tutorial for Economics",
    subtitle: "Beginner-friendly workshop series",
    description:
      "This project provides a comprehensive R tutorial aimed at students interested in applying data analysis to economics. It includes two interactive sessions covering the basics of R and its applications in economic analysis, utilizing technologies such as R and TeX. Participants will gain hands-on experience with real-world economic data and analytical techniques.",
    lastCommitDate: "2025-03-13T01:08:04Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/UWES-R-Tutorial",
    githubRepo: "Andrew-Girgis/UWES-R-Tutorial",
    tags: {
      technology: ["r", "tex"],
      domain: ["economics", "data-analysis"],
      type: ["workshop", "tutorial"],
      method: ["data-manipulation", "statistical-analysis"],
    },
  },
  {
    id: "exploratory-data-analysis",
    title: "Exploratory Data Analysis",
    description:
      "This project focuses on exploratory data analysis techniques using R and TeX. It showcases various methods for visualizing and summarizing data to uncover patterns and insights. The project emphasizes the importance of data exploration in the data science workflow, making it a valuable resource for understanding complex datasets.",
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
      "This project focuses on the application of macroeconomic theories and models using R and TeX. It showcases various econometric techniques to analyze economic data, providing insights into macroeconomic trends and policies. The project emphasizes reproducibility and clarity in presenting complex economic analyses.",
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
      "This project explores the application of machine learning techniques in economic analysis. It utilizes Jupyter Notebooks to demonstrate various models and algorithms implemented in Python and R, showcasing their effectiveness in economic data interpretation. The project aims to bridge the gap between traditional economic methods and modern data science approaches.",
    lastCommitDate: "2025-02-27T22:13:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/ECON626-MachineLearningForEconomists",
    githubRepo: "Andrew-Girgis/ECON626-MachineLearningForEconomists",
    tags: {
      technology: ["jupyter-notebook", "python", "r"],
      domain: ["economics", "machine-learning"],
      type: ["research"],
      method: ["data-analysis", "modeling"],
    },
  },
  {
    id: "touchbistro-cxc",
    title: "TouchBistro Customer Experience",
    description:
      "This project focuses on analyzing customer experience data for TouchBistro, a restaurant management platform. Utilizing Jupyter Notebook, the project employs data visualization and statistical analysis to derive insights that can enhance customer satisfaction and operational efficiency. Key features include interactive visualizations and comprehensive data reports, making it a valuable tool for restaurant managers.",
    lastCommitDate: "2025-02-15T20:38:12Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/TouchBistro-CxC",
    githubRepo: "Andrew-Girgis/TouchBistro-CxC",
    tags: {
      technology: ["jupyter-notebook", "python", "data-visualization"],
      domain: ["customer-experience", "data-analysis"],
      type: ["research", "dashboard"],
      method: ["statistical-analysis", "data-visualization"],
    },
  },
  {
    id: "valentines-website-2025",
    title: "Valentine's Day Proposal Website",
    subtitle: "An interactive way to propose on Valentine's Day",
    description:
      "This project is an interactive Valentine's Day proposal website designed to create a memorable experience for asking someone to be your Valentine. It features elegant scroll-based text reveal animations, interactive Yes/No buttons, and a playful design that encourages engagement. Built with HTML, CSS, and JavaScript, it showcases smooth animations and a mobile-responsive layout.",
    lastCommitDate: "2025-02-13T04:22:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Valentines-Website-2025",
    githubRepo: "Andrew-Girgis/Valentines-Website-2025",
    tags: {
      technology: ["html", "css", "javascript"],
      domain: ["web-development"],
      type: ["full-stack-app"],
      method: ["user-interaction"],
    },
  },
];
