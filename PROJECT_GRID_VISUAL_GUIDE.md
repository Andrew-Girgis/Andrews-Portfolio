# Project Grid Visual Guide

## Component Hierarchy

```
ProjectsSection (Main Container)
├── Section Header
│   └── h2#projects-heading "Projects & Tools"
│
├── Grid Container (md:grid-cols-2 lg:grid-cols-3)
│   │
│   ├── ProjectCard (for each project)
│   │   ├── Image Container (h-48 md:h-52)
│   │   │   ├── Image (object-cover, hover:scale-110)
│   │   │   ├── Gradient Overlay (on hover)
│   │   │   └── Coming Soon Ribbon (if status="coming-soon")
│   │   │
│   │   └── Card Content (p-6)
│   │       ├── Title (h3, line-clamp-2)
│   │       ├── TagGroup (animated)
│   │       │   └── Badges (colored by category)
│   │       ├── Description (line-clamp-3)
│   │       └── Action Buttons
│   │           ├── View Details Button
│   │           └── Open Project Button (if link exists)
│   │
│   └── ... (repeat for each project)
│
└── ProjectModal (Dialog)
    ├── Modal Header
    │   ├── Title
    │   └── Description
    ├── Large Image (max-h-[360px])
    ├── Tag Categories (grouped)
    │   ├── Technology Section
    │   ├── Domain Section
    │   ├── Type Section
    │   └── Method Section
    ├── Open Project Button (if link)
    └── Coming Soon Banner (if status)
```

## Visual Representation

```
┌─────────────────────────────────────────────────────────────────┐
│                        Projects & Tools                         │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │  COMING SOON │
│    Image     │  │    Image     │  │    ╱────────│
│   (h-52)     │  │   (h-52)     │  │   Image      │
│              │  │              │  │  (h-52)      │
├──────────────┤  ├──────────────┤  ├──────────────┤
│ Project Title│  │ Project Title│  │ Project Title│
│              │  │              │  │              │
│ python r ... │  │ python nltk  │  │ r shiny ...  │
│ finance ...  │  │ social-sci..│  │ automotive..│
│ dashboard    │  │ text-anal... │  │ research     │
│ time-series..│  │ nlp senti... │  │ econometric │
│              │  │              │  │              │
│ Description  │  │ Description  │  │ Description  │
│ (3 lines)    │  │ (3 lines)    │  │ (3 lines)    │
│              │  │              │  │              │
│ [Details] 🔗 │  │ [Details]    │  │ [Details]    │
└──────────────┘  └──────────────┘  └──────────────┘
     ↓ click
     
┌─────────────────────────────────────────────────────────────┐
│  ✕                  Project Modal                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🎯 Large Project Title                                     │
│  Full description with all details about the project...    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │              Large Project Image                     │  │
│  │                (max-h-360px)                        │  │
│  │                                                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  TECHNOLOGY                                                │
│  python  r  shiny  tidyquant                              │
│                                                             │
│  DOMAIN                                                    │
│  automotive  finance  data visualization                   │
│                                                             │
│  TYPE                                                      │
│  dashboard                                                 │
│                                                             │
│  METHOD                                                    │
│  exploratory data analysis  time series analysis          │
│                                                             │
│  [ 🔗 Open Project ]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tag Color Scheme

```
┌─────────────────────────────────────────────────────────────┐
│ TECHNOLOGY (Blue)                                           │
│ ┌────────┐ ┌────────┐ ┌────────┐                          │
│ │ python │ │   r    │ │ shiny  │  bg-blue-100/text-blue-800│
│ └────────┘ └────────┘ └────────┘                          │
│                                                             │
│ DOMAIN (Green)                                             │
│ ┌───────────┐ ┌─────────┐                                 │
│ │ economics │ │ finance │  bg-green-100/text-green-800    │
│ └───────────┘ └─────────┘                                 │
│                                                             │
│ TYPE (Purple)                                              │
│ ┌───────────┐ ┌──────────┐                                │
│ │ dashboard │ │ research │  bg-purple-100/text-purple-800 │
│ └───────────┘ └──────────┘                                │
│                                                             │
│ METHOD (Orange)                                            │
│ ┌────────────────────┐ ┌───────────────────┐              │
│ │ time series foreca│ │ sentiment analysis│              │
│ └────────────────────┘ └───────────────────┘              │
│ bg-orange-100/text-orange-800                             │
└─────────────────────────────────────────────────────────────┘
```

## Animation Timeline

```
Scroll into view
     │
     ▼
Tag Container appears (initial state: hidden)
     │
     ▼
Stagger animation starts (staggerChildren: 0.03)
     │
     ├─► Tag 1: opacity 0→1, y 4→0 (0ms)
     ├─► Tag 2: opacity 0→1, y 4→0 (30ms)
     ├─► Tag 3: opacity 0→1, y 4→0 (60ms)
     ├─► Tag 4: opacity 0→1, y 4→0 (90ms)
     └─► ... (continues for all tags)
```

## Keyboard Navigation Flow

```
Tab → Card 1 (focused)
      ├─ Enter → Open Modal
      ├─ Space → Open Modal
      └─ Tab → "View Details" button
              ├─ Enter → Open Modal
              ├─ Tab → "Open Project" button
              │       └─ Enter → Open external link
              └─ Tab → Card 2

Modal Open State:
      ├─ ESC → Close Modal
      ├─ Click Overlay → Close Modal
      └─ Tab → Focus trapped within modal
              ├─ Close button (✕)
              ├─ "Open Project" button
              └─ Back to Close button (cycle)
```

## Responsive Breakpoints

```
Mobile (< 768px):
┌──────────────┐
│   Project    │
│   (h-48)     │
└──────────────┘
┌──────────────┐
│   Project    │
│   (h-48)     │
└──────────────┘

Tablet (768px+):
┌──────────────┐  ┌──────────────┐
│   Project    │  │   Project    │
│   (h-52)     │  │   (h-52)     │
└──────────────┘  └──────────────┘

Desktop (1024px+):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Project    │  │   Project    │  │   Project    │
│   (h-52)     │  │   (h-52)     │  │   (h-52)     │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Dark Mode Comparison

```
Light Mode Tags:
┌─────────────────────────────────────────┐
│ python  (bg-blue-100, text-blue-800)    │
│ finance (bg-green-100, text-green-800)  │
│ dashboard (bg-purple-100, text-purple-800)│
└─────────────────────────────────────────┘

Dark Mode Tags:
┌─────────────────────────────────────────┐
│ python  (bg-blue-900/30, text-blue-300) │
│ finance (bg-green-900/30, text-green-300)│
│ dashboard (bg-purple-900/30, text-purple-300)│
└─────────────────────────────────────────┘
```

## State Variations

### Available Project Card
```
┌──────────────┐
│              │
│    Image     │  ← Hover: scale-110, gradient overlay
│              │
├──────────────┤
│ Title        │  ← Hover: text-primary
│ Tags         │  ← Animated stagger on view
│ Description  │
│ [Details] 🔗 │  ← Both buttons visible
└──────────────┘
```

### Coming Soon Project Card
```
┌──────────────┐
│  COMING SOON │  ← Gradient ribbon (top-right)
│    ╱─────────│
│   Image      │
│              │
├──────────────┤
│ Title        │
│ Tags         │
│ Description  │
│ [Details]    │  ← Only details button (no external link)
└──────────────┘
```

## Focus States

```
Normal State:
┌──────────────┐
│   Project    │
│   Card       │
└──────────────┘

Focused State (keyboard):
┏━━━━━━━━━━━━━━┓  ← Blue ring (ring-2 ring-blue-500)
┃   Project    ┃     with 2px offset
┃   Card       ┃
┗━━━━━━━━━━━━━━┛

Hovered State (mouse):
┌──────────────┐
│   Project    │  ← shadow-sm → shadow-lg
│   Card       │     smooth transition
└──────────────┘
```

## Tag Display Examples

Kebab-case → Human readable:
```
Data:
  "regression-analysis"
  "natural-language-processing"
  "time-series-forecasting"

Display:
  "regression analysis"
  "natural language processing"
  "time series forecasting"
```

## Component Props Flow

```
ProjectsSection
  ├─ projects: Project[]
  ├─ selectedProject: Project | null
  └─ isModalOpen: boolean
      │
      ├─► ProjectCard
      │   ├─ project: Project
      │   ├─ index: number
      │   └─ onDetailsClick: () => void
      │       │
      │       └─► TagGroup
      │           ├─ tags: Project["tags"]
      │           ├─ projectId: string
      │           └─ animated: boolean
      │
      └─► ProjectModal
          ├─ project: Project
          ├─ open: boolean
          └─ onOpenChange: (boolean) => void
              │
              └─► TagGroup (reused, animated: false)
```

## Example Data Flow

```typescript
// Project data in src/data/projects.ts
{
  id: "automotive-dashboard",
  title: "Driving Performance",
  tags: {
    technology: ["r", "shiny", "tidyquant"],
    domain: ["automotive", "finance"],
    type: ["dashboard"],
    method: ["time-series-analysis"]
  }
}
     ↓
// Rendered as card
<ProjectCard project={...} />
     ↓
// Tags extracted by TagGroup
<TagGroup tags={project.tags} projectId={project.id} />
     ↓
// Rendered with colors
<Badge className="bg-blue-100 text-blue-800">r</Badge>
<Badge className="bg-blue-100 text-blue-800">shiny</Badge>
<Badge className="bg-green-100 text-green-800">automotive</Badge>
...
```

This visual guide demonstrates the complete component structure and interaction flows!
