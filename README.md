# Andrew Girgis - Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing my work as a Data Scientist and Economist.

![Portfolio Preview](https://img.shields.io/badge/version-0.3.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)

## 🌟 Features

### 🎥 Dynamic Hero Section
- **Cinematic Video Background**: Engaging full-screen video showcasing my passions and interests
- **Responsive Design**: Automatically adjusts video container size for optimal viewing on all devices (70vh on desktop, 45vh on mobile)
- **Smooth Gradient Overlay**: Subtle fade effect (90% opacity) that seamlessly transitions into page content
- **Interactive Navigation**: Smooth scrolling to different sections
- **Performance Optimized**: Video preloading and autoplay with fallback support

### 🤖 AI-Powered Chatbot (Sierra)
- **RAG-Enhanced AI Assistant**: Leverages Retrieval-Augmented Generation to provide accurate, context-aware information about my background, experience, and projects
- **Real-time Responses**: Powered by n8n webhook integration for intelligent conversations
- **Session Management**: Maintains conversation context throughout your visit
- **Welcome Popup**: Friendly greeting that appears after 2 seconds (auto-dismisses after 10 seconds)
- **Smart Link Detection**: Automatically converts URLs and markdown links in responses to clickable links
- **Typing Indicators**: Visual feedback while Sierra is thinking, complete with animated avatar
- **Booking Integration**: Detects scheduling requests and can display calendar widgets
- **Mobile Optimized**: Fully responsive chat interface that adapts to all screen sizes
- **Persistent Chat**: Fixed position in bottom-right corner, accessible from any page

### 🎨 Clickable Avatar System
- **Dynamic Icon Switching**: Click the navigation avatar to cycle through 5 different cartoon representations
- **Persistent Selection**: Your choice is saved using localStorage and persists across sessions
- **Smooth Transitions**: Hover effects and scale animations for better UX
- **Interactive Elements**: Avatar serves as both branding and an interactive element

### 🌓 Dark/Light Theme Toggle
- **System-Wide Theme Support**: Seamless switching between light and dark modes
- **Persistent Preferences**: Theme selection saved across sessions
- **Accessible Design**: High contrast for readability in both themes
- **Animated Icons**: Sun/Moon icons that smoothly transition

### 📱 Responsive Navigation
- **Fixed Navigation Bar**: Stays accessible while scrolling with blur backdrop effect
- **Text Shadow Effects**: Enhanced readability with dual-layer shadows ensures navigation text is visible over any video background
- **Scroll-Aware Design**: Navigation adapts appearance when scrolling
- **Mobile Friendly**: Adapts to different screen sizes with responsive breakpoints

### 🎯 Section Highlights

#### About Section
- Professional introduction and career journey
- Comprehensive skill highlights
- Educational background from Brock University and University of Waterloo
- Direct connection links to professional profiles

#### Projects Section
- Featured data science and economics research projects
- Interactive project cards with hover effects
- "Coming Soon" overlays for projects in development
- Direct links to live projects, repositories, and research papers
- Topics include:
  - Government funding impact on small business innovation
  - Electric vehicle stock market predictions using GARCH/VAR models
  - Text similarity and sentiment analysis for public opinion research

#### Footer
- Social media integration with branded hover effects
- Professional contact links (LinkedIn, GitHub, X, Kaggle, StrataScratch)
- Custom SVG icons for specialized platforms
- Version tracking for deployment management

## 🚀 Tech Stack

### Frontend Framework
- **React 18.3** - Modern UI library with hooks and concurrent features
- **TypeScript 5.8** - Type-safe development with enhanced IntelliSense
- **Vite 5.4** - Lightning-fast build tool with HMR (Hot Module Replacement)

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations and optimizations
- **CSS Custom Properties** - Theme variable management

### UI Components & Icons
- **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Consistent, customizable icon system
- **React Icons** - Additional icon library for social media logos

### State Management & Routing
- **TanStack Query (React Query)** - Powerful asynchronous state management
- **React Router DOM v6** - Declarative client-side routing

### AI & Backend Integration
- **n8n Webhook** - Backend AI orchestration and automation
- **Custom RAG Implementation** - Retrieval-Augmented Generation for context-aware responses
- **Session Management** - Client-side session tracking for conversation continuity

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite SWC Plugin** - Super-fast compilation with SWC

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Andrew-Girgis/Andrews-Portfolio.git

# Navigate to project directory
cd Andrews-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`

## 🛠️ Development Scripts

```bash
# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
Andrews-Portfolio/
├── src/
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── sierrachatbot.tsx    # AI chatbot with RAG
│   │   │   ├── ImageSwitcher.tsx    # Avatar cycling system
│   │   │   ├── button.tsx           # Custom button component
│   │   │   ├── input.tsx            # Form input component
│   │   │   └── ...                  # Other UI primitives
│   │   ├── HeroSection.tsx          # Video hero section
│   │   ├── AboutSection.tsx         # About me content
│   │   ├── ProjectsSection.tsx      # Projects showcase
│   │   ├── Footer.tsx               # Footer with social links
│   │   └── Navigation.tsx           # Top navigation bar
│   ├── assets/                      # Static assets
│   │   ├── andrew_intro.mp4         # Hero video
│   │   ├── Cartoon_me_*.png         # Avatar variations
│   │   ├── Sierra_AI_agent.png      # Chatbot avatar
│   │   └── ...                      # Other images
│   ├── pages/
│   │   ├── index.tsx                # Main landing page
│   │   └── notfound.tsx             # 404 page
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── hooks/
│   │   └── use-toast.tsx            # Toast notification hook
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Public static files
├── netlify/
│   └── functions/                   # Netlify serverless functions
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite configuration
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies and scripts
```

## 🌐 Deployment

This site is deployed on **Netlify** with automatic deployments from the `react-version` branch.

### Build Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Manual Deployment
```bash
# Build for production
npm run build

# The dist/ folder contains the production build ready for deployment
```

## 🔑 Environment Variables

For the AI chatbot to function properly, ensure the following is configured:

- **Webhook URL**: `https://n8n.andrew-girgis.com/webhook/chat`
- **Session Management**: Client-side session IDs are automatically generated

## 🎨 Customization Guide

### Theme Colors
Theme colors are defined in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: "...",
      background: "...",
      foreground: "...",
    }
  }
}
```

### Avatar Images
1. Add your custom avatar images to `src/assets/`
2. Update the imports in `src/components/ui/ImageSwitcher.tsx`
3. Add to the `images` array

### Video Background
1. Replace `src/assets/andrew_intro.mp4` with your own video
2. **Recommended specifications:**
   - Codec: H.264
   - Size: Under 20MB for optimal loading
   - Resolution: 1920x1080 or 1280x720
   - Format: MP4 (with WebM fallback)

### Chatbot Customization
- Modify RAG data source in your n8n workflow
- Adjust personality and responses through the n8n configuration
- Update Sierra avatar images in `src/assets/`

## 🐛 Troubleshooting

### Video not playing
- Check that the video file exists in `src/assets/`
- Verify video codec compatibility (H.264 recommended)
- Check browser console for autoplay policy errors

### Chatbot not responding
- Verify n8n webhook URL is accessible
- Check network tab for API call failures
- Ensure CORS is properly configured on webhook endpoint

### TypeScript errors
- Run `rm -rf node_modules/.tmp && npm install`
- Restart VS Code TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Video lazy loading and optimization
- Code splitting and tree shaking via Vite

## 📄 License

This project is open source and available for personal use. Please provide attribution if you use this as inspiration for your own portfolio.

## 👤 Author

**Andrew Girgis**  
Data Scientist | Economist | Entrepreneur

- 🌐 Website: [andrew-girgis.com](https://www.andrew-girgis.com)
- 💼 LinkedIn: [andrewagirgis](https://www.linkedin.com/in/andrewagirgis)
- 🐙 GitHub: [andrew-girgis](https://github.com/andrew-girgis)
- 🐦 X: [@AndrewGirgis](https://x.com/AndrewGirgis)
- 📊 Kaggle: [andrewagirgis](https://www.kaggle.com/andrewagirgis)
- 💻 StrataScratch: [AndrewGirgis](https://platform.stratascratch.com/user/AndrewGirgis)

## 🙏 Acknowledgments

- UI Framework: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- Component Library: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- AI Orchestration: [n8n](https://n8n.io/)
- Hosting: [Netlify](https://www.netlify.com/)

## 🚀 Future Enhancements

- [ ] Blog section for data science articles
- [ ] Interactive data visualizations
- [ ] Project case studies with detailed breakdowns
- [ ] Resume download with custom formatting
- [ ] Contact form integration
- [ ] Analytics dashboard integration

---

**Version:** 0.3.0  
**Last Updated:** November 2025  
**Build Status:** [![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site)

Made with ❤️ and lots of ☕
