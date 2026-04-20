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
    id: "kag",
    title: "Kaggle Competition Bootstrapper",
    subtitle: "Streamline your Kaggle workflow with a terminal interface",
    description:
      "This project provides a Textual TUI tool that simplifies the process of starting Kaggle competitions directly from the terminal. It allows users to quickly scaffold project folders with necessary files, check competition access, and manage local notebooks. Built with Python, it enhances productivity by integrating competition data and notes seamlessly into the workflow.",
    lastCommitDate: "2026-04-19T18:03:19Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/kag",
    githubRepo: "Andrew-Girgis/kag",
    tags: {
      technology: ["python", "textual", "kaggle-cli"],
      domain: ["data-science", "economics"],
      type: ["tool", "workflow-automation"],
      method: ["project-scaffolding"],
    },
  },
  {
    id: "microsoft-workspace-skill",
    title: "Microsoft Workspace Skill",
    subtitle: "Integration with Outlook services",
    description:
      "This project implements a Microsoft Graph API skill for the Hermes Agent, enabling seamless integration with Outlook Calendar, Email, and Contacts. Key features include email management with advanced filtering, calendar event handling, and contact listing. Developed using Python and Shell, it requires a Microsoft account and Azure App Registration for setup.",
    lastCommitDate: "2026-04-14T20:24:18Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/microsoft-workspace-skill",
    githubRepo: "Andrew-Girgis/microsoft-workspace-skill",
    tags: {
      technology: ["python", "microsoft-graph", "oauth2"],
      domain: ["productivity", "email"],
      type: ["api-integration", "skill"],
      method: ["email-management", "calendar-integration"],
    },
  },
  {
    id: "hunyuan3d-playground",
    title: "3D Mesh Generation",
    subtitle: "Convert images to textured 3D models",
    description:
      "This project enables users to convert any image into a textured 3D mesh (.glb) using Tencent's Hunyuan3D-2.1 model, fully offline without the need for an API key. It features a quickstart guide for setting up on NVIDIA Runpod, background removal, shape generation, and texture painting, leveraging technologies such as Python, C++, and CUDA.",
    lastCommitDate: "2026-04-14T03:23:46Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/hunyuan3d-playground",
    githubRepo: "Andrew-Girgis/hunyuan3d-playground",
    tags: {
      technology: ["python", "cuda", "docker", "jupyter-notebook"],
      domain: ["machine-learning", "3d-modeling"],
      type: ["research", "tool"],
      method: ["image-processing", "mesh-generation"],
    },
  },
  {
    id: "accidents-cvpr",
    title: "Accident Detection",
    subtitle: "Predicting accident parameters from CCTV footage",
    description:
      "This project is a local research workspace for the Kaggle CVPR 2026 ACCIDENT competition, focusing on predicting accident timing, localization, and collision types from CCTV video. It employs Jupyter Notebooks for dataset exploration and baseline models, utilizing synthetic data for training and real footage for testing. Key technologies include Python and Jupyter Notebook.",
    lastCommitDate: "2026-04-06T02:57:35Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/accidents-cvpr",
    githubRepo: "Andrew-Girgis/accidents-cvpr",
    tags: {
      technology: ["python", "jupyter-notebook"],
      domain: ["machine-learning", "computer-vision"],
      type: ["research", "competition"],
      method: ["zero-shot-learning", "video-analysis"],
    },
  },
  {
    id: "municipal-waste-schedule-etl",
    title: "Municipal Waste ETL",
    subtitle: "Automated waste collection schedule extraction",
    description:
      "This project implements a scalable Python ETL pipeline that extracts and normalizes municipal waste collection schedules from ReCollect services. Key features include address resolution, event extraction for multiple municipalities, and robust error handling. The pipeline prepares data for analysis by transforming nested JSON into structured formats, making it analytics-ready.",
    lastCommitDate: "2026-01-06T13:52:13Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/municipal-waste-schedule-etl",
    githubRepo: "Andrew-Girgis/municipal-waste-schedule-etl",
    tags: {
      technology: ["python"],
      domain: ["data-science", "economics"],
      type: ["data-pipeline"],
      method: ["etl", "api-integration"],
    },
  },
  {
    id: "computare",
    title: "Personal Finance Platform",
    subtitle: "AI-driven transaction categorization",
    description:
      "This project is an open-source personal finance platform that extracts transactions from Canadian bank statements and categorizes them using AI. It detects recurring subscriptions and stores all data in a structured PostgreSQL database, supporting institutions like Scotiabank, Wealthsimple, and American Express.",
    lastCommitDate: "2026-02-06T22:07:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Computare",
    githubRepo: "Andrew-Girgis/Computare",
    tags: {
      technology: ["python", "typescript", "postgresql", "css", "javascript"],
      domain: ["finance", "artificial-intelligence"],
      type: ["full-stack-app"],
      method: ["web-scraping", "data-extraction"],
    },
  },
  {
    id: "linkedin-company-scraper",
    title: "LinkedIn Company Scraper",
    subtitle: "Extract company data from LinkedIn",
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
    id: "stratascratch-sql-practice",
    title: "SQL Practice Solutions",
    subtitle: "Personal SQL solutions for data challenges",
    description:
      "This project showcases a collection of SQL solutions to practice problems sourced from StratasScratch, a platform for data science interview preparation. Each problem is organized in its own folder, containing a detailed description and multiple solution approaches, demonstrating the author's analytical skills and problem-solving abilities. The repository serves as a valuable resource for anyone looking to enhance their SQL proficiency.",
    lastCommitDate: "2026-02-19T16:24:28Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/stratascratch-sql-practice",
    githubRepo: "Andrew-Girgis/stratascratch-sql-practice",
    tags: {
      technology: ["sql"],
      domain: ["data-science"],
      type: ["practice-problems"],
      method: ["sql-queries"],
    },
  },
  {
    id: "computare-doc-ingest",
    title: "Document OCR Ingest",
    subtitle: "Lightweight CLI for document processing",
    description:
      "This project provides a command-line interface for performing OCR on documents and extracting data in JSON format. It features two processing methods, allowing users to choose between a one-step and a two-step approach. Built with Python, it includes evaluation scripts and customizable task schemas for various document types.",
    lastCommitDate: "2026-02-08T23:01:09Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/computare-doc-ingest",
    githubRepo: "Andrew-Girgis/computare-doc-ingest",
    tags: {
      technology: ["python"],
      domain: ["document-processing", "data-extraction"],
      type: ["cli-tool"],
      method: ["ocr", "json-extraction"],
    },
  },
  {
    id: "celevid",
    title: "AI Video Editor",
    subtitle: "Automated video processing with AI",
    description:
      "Celevid is an AI-powered video editing tool that automates transcription, pause removal, and captioning. It leverages GPU acceleration for fast processing and supports various video formats. Key features include customizable caption styles, quality presets, and detailed analytics for improved workflow.",
    lastCommitDate: "2026-01-28T04:59:06Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/celevid",
    githubRepo: "Andrew-Girgis/celevid",
    tags: {
      technology: ["python", "ffmpeg", "gpu"],
      domain: ["video-editing", "artificial-intelligence"],
      type: ["tool", "automation"],
      method: ["transcription", "pause-removal"],
    },
  },
  {
    id: "x-video-downloader",
    title: "Video Downloader Tool",
    subtitle: "Download videos from X/Twitter effortlessly",
    description:
      "This project is a simple terminal-friendly wrapper around `yt-dlp`, allowing users to download videos from X/Twitter with ease. It offers various options such as specifying the output directory, customizing filename templates, and printing metadata in JSON format. Built using Python, it provides a straightforward command-line interface for efficient video downloading.",
    lastCommitDate: "2026-01-27T05:30:23Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/x-video-downloader",
    githubRepo: "Andrew-Girgis/x-video-downloader",
    tags: {
      technology: ["python"],
      domain: ["media"],
      type: ["command-line-tool"],
      method: ["web-scraping"],
    },
  },
  {
    id: "property-geocode-checker",
    title: "Property Geocode Checker",
    subtitle: "Validate property geocoding accuracy",
    description:
      "This project validates latitude and longitude values for a list of properties by re-geocoding each address using the Google Maps Geocoding API. It compares the geocoded coordinates against the provided ones, producing a summary report and a list of mismatches. Key features include customizable tolerance for matching coordinates and easy input/output handling with CSV files.",
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
      "This project investigates the correlation between game wins and penalty flags in American Football. By analyzing historical game data, it aims to uncover patterns that may influence team performance. The project utilizes data analysis techniques to provide insights into how penalties affect the outcome of games.",
    lastCommitDate: "2025-02-14T20:49:18Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/NFL-Project",
    githubRepo: "Andrew-Girgis/NFL-Project",
    tags: {
      technology: ["python", "pandas", "matplotlib"],
      domain: ["sports-analytics", "data-science"],
      type: ["research"],
      method: ["correlation-analysis"],
    },
  },
  {
    id: "personal-rag-pipeline",
    title: "RAG Pipeline",
    description:
      "This project implements a personal RAG (Red, Amber, Green) pipeline for data analysis and visualization. It focuses on automating the process of data collection, processing, and reporting, enabling users to easily track key metrics over time. The pipeline leverages Python for data manipulation and visualization, ensuring a robust and efficient workflow.",
    lastCommitDate: "2025-12-07T23:44:45Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/personal-rag-pipeline",
    githubRepo: "Andrew-Girgis/personal-rag-pipeline",
    tags: {
      technology: ["python", "data-visualization", "automation"],
      domain: ["data-analysis", "economics"],
      type: ["data-pipeline", "automation"],
      method: ["data-processing", "reporting"],
    },
  },
  {
    id: "public-jobs-scraper",
    title: "Government Jobs Scraper",
    subtitle: "Automated job data collection and analysis",
    description:
      "This project systematically collects and analyzes technical government job postings across Canada, the UK, and Australia to explore differences in position classifications, compensation structures, and qualification requirements. Utilizing Python and PLpgSQL, it automates data collection from 14 jurisdictions, providing insights into labor market dynamics and job descriptions.",
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
    subtitle: "Interactive chatbot for SETI research",
    description:
      "This project features an interactive chatbot designed to assist users in exploring the Search for Extraterrestrial Intelligence (SETI). Built using HTML, it provides a user-friendly interface for engaging with SETI-related queries and information. The chatbot aims to enhance public understanding of SETI research and its significance in the search for extraterrestrial life.",
    lastCommitDate: "2025-07-11T20:06:52Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/SETI-demo-chatbot",
    githubRepo: "Andrew-Girgis/SETI-demo-chatbot",
    tags: {
      technology: ["html"],
      domain: ["science-communication"],
      type: ["web-app"],
      method: ["chatbot"],
    },
  },
  {
    id: "toronto-fire-incidents-plotly",
    title: "Toronto Fire Incidents",
    subtitle: "Interactive dashboard for fire incident analysis",
    description:
      "This project features an interactive Plotly Dash web application that visualizes every Toronto Fire Service incident from 2011 to 2024. Users can explore total fires per ward, compare fires per 1,000 residents, and view individual incident data. Built with Python, JavaScript, and CSS, it offers zero-config hosting and is designed for extensibility.",
    lastCommitDate: "2025-06-29T00:05:24Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/toronto-fire-incidents-plotly",
    githubRepo: "Andrew-Girgis/toronto-fire-incidents-plotly",
    tags: {
      technology: ["python", "javascript", "css"],
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
      "This repository showcases the coursework completed for ECON 607: Data Science for Economists, featuring assignments and projects that highlight data compilation, manipulation, and visualization techniques. Utilizing tools such as Python, R, and MATLAB, the projects cover topics including text analysis and unsupervised learning, providing practical experience in managing complex datasets. The work reflects a strong emphasis on applying modern data science techniques in an economic context.",
    lastCommitDate: "2025-01-21T05:15:05Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Data-Science-For-Economists",
    githubRepo: "Andrew-Girgis/Data-Science-For-Economists",
    tags: {
      technology: ["python", "r", "matlab"],
      domain: ["economics", "data-science"],
      type: ["coursework", "research"],
      method: ["data-manipulation", "data-visualization"],
    },
  },
  {
    id: "iasc-1p02",
    title: "Intro to Web Development",
    subtitle: "Foundational web projects from university course",
    description:
      "This project showcases a collection of initial web development exercises created for the IASC 1P02 course at Brock University. It focuses on foundational skills in HTML and CSS, including page structure, styling, and media embedding. The work reflects the author's first exposure to frontend development, highlighting key learning outcomes in web design.",
    lastCommitDate: "2017-12-07T19:41:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/IASC-1P02",
    githubRepo: "Andrew-Girgis/IASC-1P02",
    tags: {
      technology: ["html", "css", "javascript"],
      domain: ["web-development"],
      type: ["portfolio", "educational"],
      method: ["frontend-development"],
    },
  },
  {
    id: "data-vizualization",
    title: "Data Visualization",
    subtitle: "Visualizing data insights from STAT 842",
    description:
      "This project showcases various data visualization techniques implemented in the course STAT 842. It utilizes a range of programming languages including Python and R to create insightful visual representations of data. Key features include interactive plots and comprehensive analysis tools, making it a valuable resource for understanding complex datasets.",
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
    subtitle: "Beginner-friendly R workshop series",
    description:
      "This project provides a comprehensive R tutorial designed for students interested in applying data analysis to economics. It covers essential R syntax, data structures, and real-world economic applications, making it ideal for beginners. The workshop includes hands-on sessions and encourages participants to engage with economic data using R and RStudio.",
    lastCommitDate: "2025-03-13T01:08:04Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/UWES-R-Tutorial",
    githubRepo: "Andrew-Girgis/UWES-R-Tutorial",
    tags: {
      technology: ["r", "tex", "rstudio"],
      domain: ["economics", "data-analysis"],
      type: ["workshop", "tutorial"],
      method: ["data-manipulation", "economic-analysis"],
    },
  },
  {
    id: "exploratory-data-analysis",
    title: "Exploratory Data Analysis",
    description:
      "This project focuses on exploratory data analysis techniques using R and TeX. It showcases various statistical methods and visualizations to uncover insights from datasets. The project emphasizes data cleaning, transformation, and interpretation, making it a valuable resource for understanding data-driven decision-making.",
    lastCommitDate: "2025-02-27T22:15:11Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Exploratory-Data-Analysis",
    githubRepo: "Andrew-Girgis/Exploratory-Data-Analysis",
    tags: {
      technology: ["r", "tex"],
      domain: ["economics", "data-science"],
      type: ["research"],
      method: ["exploratory-data-analysis"],
    },
  },
  {
    id: "applied-macroeconometrics",
    title: "Applied Macroeconometrics",
    description:
      "This project focuses on the application of macroeconomic theories using econometric methods. It leverages R for data analysis and TeX for documentation, showcasing various econometric models and their implications in real-world scenarios. The project aims to provide insights into economic trends and policy impacts through rigorous statistical analysis.",
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
    subtitle: "A comprehensive exploration of ML techniques in economics",
    description:
      "This project focuses on applying machine learning techniques to economic data analysis. It utilizes Jupyter Notebooks, Python, and R to demonstrate various algorithms and their implications in economic research. Key features include data preprocessing, model evaluation, and visualization of results, making it a valuable resource for economists looking to integrate ML into their work.",
    lastCommitDate: "2025-02-27T22:13:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/ECON626-MachineLearningForEconomists",
    githubRepo: "Andrew-Girgis/ECON626-MachineLearningForEconomists",
    tags: {
      technology: ["jupyter-notebook", "python", "r"],
      domain: ["economics", "machine-learning"],
      type: ["research"],
      method: ["data-analysis", "model-evaluation"],
    },
  },
  {
    id: "touchbistro-cxc",
    title: "TouchBistro Customer Experience",
    description:
      "This project focuses on analyzing customer experience data for TouchBistro, utilizing Jupyter Notebook for data exploration and visualization. It employs various data analysis techniques to uncover insights and trends that can enhance customer satisfaction and operational efficiency. The project showcases the application of data science methodologies in a real-world context, leveraging Python and data visualization libraries.",
    lastCommitDate: "2025-02-15T20:38:12Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/TouchBistro-CxC",
    githubRepo: "Andrew-Girgis/TouchBistro-CxC",
    tags: {
      technology: ["jupyter-notebook", "python", "data-visualization"],
      domain: ["customer-experience", "data-analysis"],
      type: ["research"],
      method: ["data-exploration", "data-visualization"],
    },
  },
  {
    id: "valentines-website-2025",
    title: "Valentine's Day Proposal Website",
    subtitle: "An interactive way to ask someone to be your Valentine",
    description:
      "This charming Valentine's Day proposal website offers a memorable and interactive experience for users. It features elegant scroll-based text reveal animations, playful Yes/No buttons, and a mobile-responsive design, all built with HTML, CSS, and JavaScript. The site is designed with a clean, romantic aesthetic, making it a delightful way to express affection.",
    lastCommitDate: "2025-02-13T04:22:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Valentines-Website-2025",
    githubRepo: "Andrew-Girgis/Valentines-Website-2025",
    tags: {
      technology: ["html", "css", "javascript"],
      domain: ["web-development", "user-experience"],
      type: ["single-page-app"],
      method: ["interactive-design"],
    },
  },
];
