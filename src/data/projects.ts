import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "adio",
    title: "Adio",
    subtitle: "Voice AI Repair Companion",
    image: "/projects/adio.jpg",
    imageAlt: "Adio voice AI repair companion interface",
    description:
      "Adio is a voice-first repair companion for home appliances and basic car fixes. It executes one procedural step at a time with confirmation-gated progression and interruption commands. Built for the AI Agents Waterloo Voice Hackathon. Features parallel STT race (smallest.ai Pulse + OpenAI Realtime), smallest.ai Waves streaming TTS, Supabase Postgres + pgvector RAG, and a YouTube Guide Mode that compiles video transcripts into step-by-step repair procedures.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Adio",
    lastCommitDate: "2026-02-17T00:10:08Z",

    githubRepo: "Andrew-Girgis/Adio",
    featured: true,
    tags: {
      technology: ["typescript", "openai", "supabase", "pgvector"],
      domain: ["ai", "voice-ai", "consumer-tech"],
      type: ["full-stack-app"],
      method: ["rag", "speech-to-text", "text-to-speech"],
    },
  },
  {
    id: "computare",
    title: "Computare",
    subtitle: "Open-Source Personal Finance Platform for Canadians",
    image: "/projects/computare-projects.png",
    imageAlt: "Computare personal finance dashboard",
    description:
      "An open-source personal finance platform that extracts transactions from Canadian bank statements (Scotiabank PDF, Wealthsimple CSV, Amex), categorizes them with a 3-tier AI pipeline (rules → merchant cache → GPT-4o-mini), detects recurring subscriptions, and stores everything in PostgreSQL with Row Level Security. Features a Next.js dashboard, FastAPI backend, and 9 materialized views for analytics.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Computare",
    lastCommitDate: "2026-04-28T13:06:26Z",

    githubRepo: "Andrew-Girgis/Computare",
    featured: true,
    tags: {
      technology: ["python", "nextjs", "typescript", "supabase", "openai", "fastapi"],
      domain: ["personal-finance", "fintech", "ai"],
      type: ["full-stack-app"],
      method: ["pdf-extraction", "ai-categorization", "data-pipeline"],
    },
  },
  {
    id: "microsoft-workspace-skill",
    title: "Microsoft Workspace Skill",
    subtitle: "Microsoft Graph Integration for Agent Workflows",
    description:
      "A Hermes Agent skill that connects Outlook email, calendar, contacts, and profile data through Microsoft Graph. It supports OAuth setup, token refresh, email search and sending, calendar scheduling, free/busy lookup, Teams meeting creation, and safe preview-based email sending for agent-assisted productivity workflows.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/microsoft-workspace-skill",
    lastCommitDate: "2026-04-14T20:24:18Z",

    githubRepo: "Andrew-Girgis/microsoft-workspace-skill",
    tags: {
      technology: ["python", "microsoft-graph", "oauth2"],
      domain: ["productivity", "ai-agents"],
      type: ["agent-tooling", "integration"],
      method: ["api-integration", "oauth", "automation"],
    },
  },
  {
    id: "kag",
    title: "kag",
    subtitle: "Kaggle Competition Workspace TUI",
    description:
      "A Textual-based terminal app that turns Kaggle competition setup into a repeatable workflow. It provides a searchable competition picker, scaffolds notebooks, notes, data folders, virtual environments, and git repositories, checks Kaggle access, and enriches project notes from competition pages.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/kag",
    lastCommitDate: "2026-10-12T23:11:31Z",

    githubRepo: "Andrew-Girgis/kag",
    tags: {
      technology: ["python", "textual", "kaggle-api"],
      domain: ["developer-tools", "data-science"],
      type: ["cli", "tui"],
      method: ["project-scaffolding", "workflow-automation"],
    },
  },
  {
    id: "municipalities-budget-scraper",
    title: "Municipalities Budget Scraper",
    subtitle: "AI-Powered Municipal Financial Report Discovery",
    image: "/projects/municipalitiesBudgetScraper.jpg",
    imageAlt: "Municipal financial report discovery dashboard",
    description:
      "An intelligent web scraper built in support of @BuildCanada that automatically discovers and downloads annual audited financial reports from Canadian municipality websites. Features AI-powered document discovery via OpenAI, Firecrawl API for web crawling, Playwright browser automation, and a 4-strategy PDF extraction pipeline. Processes all 3,696 Canadian municipalities with URL caching for 10x faster subsequent runs.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/Municipalities-Budget-Scraper",
    lastCommitDate: "2025-12-09T05:48:27Z",

    githubRepo: "Andrew-Girgis/Municipalities-Budget-Scraper",
    featured: true,
    tags: {
      technology: ["python", "openai", "playwright", "firecrawl"],
      domain: ["civic-tech", "public-policy"],
      type: ["data-engineering", "scraper"],
      method: ["web-scraping", "ai-document-discovery"],
    },
  },
  {
    id: "municipal-waste-schedule-etl",
    title: "Municipal Waste Schedule ETL",
    subtitle: "Public-Sector Waste Collection Data Pipeline",
    description:
      "A Python ETL pipeline that extracts municipal waste collection schedules from ReCollect-powered services, augments Peel recycling data from Circular Materials, and normalizes nested event JSON into analytics-ready schedule outputs. The pipeline supports multiple Ontario municipalities, audit-friendly raw response storage, retry-aware API clients, and staged extraction, transformation, and merge scripts.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/municipal-waste-schedule-etl",
    lastCommitDate: "2026-01-06T13:52:13Z",

    githubRepo: "Andrew-Girgis/municipal-waste-schedule-etl",
    tags: {
      technology: ["python", "recollect-api", "pandas"],
      domain: ["civic-tech", "public-policy", "data-engineering"],
      type: ["etl-pipeline"],
      method: ["api-extraction", "data-normalization", "data-pipeline"],
    },
  },
  {
    id: "public-jobs-scraper",
    title: "Public Jobs Scraper",
    subtitle: "Cross-Jurisdiction Government Job Research Pipeline",
    description:
      "A research-grade scraping system for technical government job postings across Canada, Australia, and the United Kingdom. It monitors 14 jurisdictions, applies fuzzy title matching to reduce false positives, standardizes job details for comparative public-administration analysis, supports parallel Playwright collection, and includes Supabase upload workflows with GPT-assisted extraction for inconsistent pages.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/public_jobs_scraper",
    lastCommitDate: "2026-05-23T00:02:47Z",

    githubRepo: "Andrew-Girgis/public_jobs_scraper",
    tags: {
      technology: ["python", "playwright", "supabase", "openai"],
      domain: ["public-policy", "career", "government"],
      type: ["scraper", "research-dataset"],
      method: ["web-scraping", "fuzzy-matching", "ai-extraction"],
    },
  },
  {
    id: "linkedin-job-scraper",
    title: "LinkedIn Job Scraper",
    subtitle: "Intelligent Job Data Extraction with LLM Enhancement",
    image: "/projects/linkedinJobScraper.jpg",
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
    id: "linkedin-company-scraper",
    title: "LinkedIn Company Scraper",
    subtitle: "Company Enrichment for Job Search Data Pipelines",
    description:
      "A Python scraper that extracts structured company data from LinkedIn pages, including company IDs, industry, size, headquarters, specialties, websites, and descriptions. It supports batch processing, rate limiting, optional Gemini URL verification, Supabase storage, and company ID extraction for downstream job search and business intelligence workflows.",
    status: "available",
    link: "https://github.com/Andrew-Girgis/linkedin-company-scraper",
    lastCommitDate: "2025-07-01T04:21:30Z",

    githubRepo: "Andrew-Girgis/linkedin-company-scraper",
    tags: {
      technology: ["python", "selenium", "gemini", "supabase"],
      domain: ["career", "data-engineering"],
      type: ["scraper"],
      method: ["web-scraping", "entity-enrichment", "data-pipeline"],
    },
  },
  {
    id: "deep-learning-cnn-cifar10",
    title: "Deep Learning CNN Regularization",
    subtitle: "CIFAR-10 Image Classification (UWaterloo STAT 940)",
    image: "/projects/deepLearningCNN.jpg",
    imageAlt: "CNN architecture comparison for CIFAR-10 classification",
    description:
      "A comprehensive exploration of CNN architectures and regularization techniques for CIFAR-10 image classification. Systematically compares 6 model architectures—from a 2-layer baseline to a fully optimized model with batch normalization, dropout, and data augmentation.",
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
    image: "/projects/housePricePrediction.jpg",
    imageAlt: "House price prediction model results and feature analysis",
    description:
      "An end-to-end machine learning pipeline for predicting residential home sale prices using linear regression. Covers 2006–2010 housing sales including the 2008 financial crisis. Final model achieves R² = 0.89 with ~$26,000 average prediction error.",
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
      "This interactive dashboard compares the cumulative returns of leading Canadian automotive companies against the TSX Index while visualizing provincial auto export performance. Built in R Shiny using tidyquant, tidyverse, and Statistics Canada data.",
    image: "/projects/autodashboardprojectimage.jpg",
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
    image: "/projects/censusExplorerImage.jpg",
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
      "This paper explores predictors of stock market returns for Battery Electric Vehicle (BEV) startups using GARCH and VAR models to forecast volatility and returns.",
    image: "/projects/future_of_EVStocks.jpg",
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
      "This project analyzes the relationship between an article and its comments using text similarity and sentiment analysis techniques. Insights are visualized with Gephi to highlight key themes and connections.",
    image: "/projects/Network_Analysis_Portfolio.jpg",
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
    id: "omail",
    title: "Omail Client",
    subtitle: "AI-powered mail and calendar application",
    description:
      "Omail is a native mail and calendar client designed for the Omarchy ecosystem, featuring a local AI assistant for enhanced productivity. Built with C++ and QML, it offers live themes, a JSON CLI, and seamless account integration with OAuth for secure access. Users can manage personal and work profiles, compose emails, schedule events, and utilize AI-driven features for mail classification and response suggestions.",
    lastCommitDate: "2026-10-17T17:33:18Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/omail",
    githubRepo: "Andrew-Girgis/omail",
    tags: {
      technology: ["c++", "qml", "shell", "qmake"],
      domain: ["productivity", "email"],
      type: ["desktop-app"],
      method: ["local-ai"],
    },
  },
  {
    id: "omarchy-edgerunners-theme",
    title: "Cyberpunk Edgerunners Theme",
    subtitle: "A neon theme inspired by Cyberpunk: Edgerunners",
    description:
      "This project features a vibrant neon theme for Omarchy, inspired by stills from the animated series *Cyberpunk: Edgerunners*. It includes a dark violet-black background with electric cyan and neon green accents, along with a selection of wallpapers named after iconic quotes from the series. Users can easily install the theme and switch backgrounds using simple commands.",
    lastCommitDate: "2026-10-16T05:29:54Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/omarchy-edgerunners-theme",
    githubRepo: "Andrew-Girgis/omarchy-edgerunners-theme",
    tags: {
      technology: ["omarchy"],
      domain: ["design"],
      type: ["theme"],
      method: ["visual-design"],
    },
  },
  {
    id: "hushscript",
    title: "Hushscript",
    subtitle: "Local interview transcription tool",
    description:
      "Hushscript is a local interview transcription tool that processes audio in memory, providing English transcription with punctuation and optional speaker labeling. It supports batch uploads of audio files and exports results in TXT, Markdown, and structured JSON formats. Built using Python and Docker, it ensures privacy by avoiding cloud services and maintaining local processing.",
    lastCommitDate: "2026-10-05T03:16:22Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/hushscript",
    githubRepo: "Andrew-Girgis/hushscript",
    tags: {
      technology: ["python", "docker", "javascript"],
      domain: ["data-science", "natural-language-processing"],
      type: ["desktop-app", "api"],
      method: ["audio-transcription", "data-export"],
    },
  },
  {
    id: "argus",
    title: "Address Intelligence",
    subtitle: "Comprehensive property profiling application",
    description:
      "This full-stack application provides detailed property profiles by analyzing street addresses or geographic coordinates. Utilizing Google Maps imagery, AI vision analysis, and geospatial data, it features a React frontend and a Python FastAPI backend, ensuring a seamless user experience. The project leverages modern technologies such as Docker for infrastructure and MLflow for observability.",
    lastCommitDate: "2026-09-29T13:45:09Z",
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
    id: "token-holdem",
    title: "Token Hold'em",
    subtitle: "Poker game with LLM agents",
    description:
      "Token Hold'em is an interactive poker game where players can compete against AI agents in a Texas Hold'em format. The project utilizes Gradio for the user interface and Modal for AI decision-making, allowing for a seamless gaming experience. Key features include deterministic game mechanics, customizable agent settings, and a leaderboard for tracking performance.",
    lastCommitDate: "2026-06-15T20:05:55Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/token-holdem",
    githubRepo: "Andrew-Girgis/token-holdem",
    tags: {
      technology: ["python", "gradio", "modal", "typescript"],
      domain: ["game", "artificial-intelligence"],
      type: ["web-app", "interactive-game"],
      method: ["deterministic-simulation", "model-inference"],
    },
  },
  {
    id: "taskflow",
    title: "Task Management Tool",
    subtitle: "A CLI tool for organizing tasks",
    description:
      "TaskFlow is a modern command-line interface tool designed for efficient task management. It allows users to add, list, update, and delete tasks while providing features like filtering and statistics tracking. Built with Python, it stores tasks locally in a JSON file for easy access and persistence.",
    lastCommitDate: "2026-06-11T05:32:32Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/taskflow",
    githubRepo: "Andrew-Girgis/taskflow",
    tags: {
      technology: ["python"],
      domain: ["productivity"],
      type: ["cli-tool"],
      method: ["task-management"],
    },
  },
  {
    id: "kaggle-s6e4-autoresearch",
    title: "Kaggle Autoresearch",
    subtitle: "Predicting irrigation needs using autonomous research",
    description:
      "This project implements an autoresearch-style workspace for predicting irrigation needs from tabular data in the Kaggle Playground Series. It utilizes Python and Jupyter Notebook to optimize balanced accuracy through controlled changes to a candidate file and a stable evaluator. Key features include a structured experiment setup, automated evaluation, and a focus on reproducibility in machine learning workflows.",
    lastCommitDate: "2026-04-30T12:53:50Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/kaggle-s6e4-autoresearch",
    githubRepo: "Andrew-Girgis/kaggle-s6e4-autoresearch",
    tags: {
      technology: ["python", "jupyter-notebook", "machine-learning"],
      domain: ["agriculture", "data-science"],
      type: ["research", "competition"],
      method: ["classification", "autonomous-research"],
    },
  },
  {
    id: "accidents-cvpr",
    title: "Accident Detection",
    subtitle: "Predicting accident parameters from CCTV footage",
    description:
      "This project is a local research workspace for the Kaggle CVPR 2026 ACCIDENT competition, focusing on predicting accident timing, localization, and collision types from CCTV video. It utilizes Jupyter Notebooks for dataset exploration and includes reusable code for a zero-shot sim-to-real problem, leveraging synthetic data for training and real footage for testing.",
    lastCommitDate: "2026-04-24T21:10:09Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/accidents-cvpr",
    githubRepo: "Andrew-Girgis/accidents-cvpr",
    tags: {
      technology: ["jupyter-notebook", "python"],
      domain: ["computer-vision", "machine-learning"],
      type: ["research"],
      method: ["zero-shot-learning"],
    },
  },
  {
    id: "property-geocode-checker",
    title: "Property Geocode Checker",
    subtitle: "Validate property geocoding accuracy",
    description:
      "This project validates latitude and longitude values for a list of properties by re-geocoding each address using the Google Maps Geocoding API. It compares the results to the provided coordinates and generates a summary report of matches and mismatches, along with a detailed output of mismatched properties. The tool is built in Python and requires a Google Maps API key for geocoding.",
    lastCommitDate: "2026-01-11T07:43:34Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/property-geocode-checker",
    githubRepo: "Andrew-Girgis/property-geocode-checker",
    tags: {
      technology: ["python", "google-maps-api"],
      domain: ["real-estate", "data-validation"],
      type: ["data-tool", "utility"],
      method: ["geocoding", "data-comparison"],
    },
  },
  {
    id: "toronto-fire-incidents-plotly",
    title: "Toronto Fire Incidents",
    subtitle: "Interactive dashboard for fire data analysis",
    description:
      "This project features an interactive Plotly Dash web-app that visualizes every Toronto Fire Service incident from 2011 to 2024. Users can explore total fires per ward, fires per 1,000 residents, and a raw point cloud of individual incidents, all while utilizing open-source mapping tiles and zero-config hosting. Built during a data exploration hack-session, it aims to highlight fire clustering and per-capita risk across neighborhoods.",
    lastCommitDate: "2025-06-29T00:05:24Z",
    status: "available",
    link: "https://github.com/Andrew-Girgis/toronto-fire-incidents-plotly",
    githubRepo: "Andrew-Girgis/toronto-fire-incidents-plotly",
    tags: {
      technology: ["python", "javascript", "css"],
      domain: ["urban-studies", "public-safety"],
      type: ["dashboard", "data-visualization"],
      method: ["data-analysis", "interactive-visualization"],
    },
  },
];
