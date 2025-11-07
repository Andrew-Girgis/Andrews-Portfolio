# Project Tags Feature

## Overview
Added structured 4-category tag system to projects for enhanced discoverability and future filtering capabilities.

## Tag Categories

### 1. **Technology** 🧩
Tools, frameworks, libraries, and programming languages used
- Examples: `python`, `r`, `shiny`, `scikit-learn`, `nltk`

### 2. **Domain** 🧠
Subject matter, industry, or field of application
- Examples: `economics`, `automotive`, `finance`, `demographics`

### 3. **Type** 🎨
Project type or functionality
- Examples: `dashboard`, `research`, `predictive-model`, `text-analysis`

### 4. **Method** 📊
Analytical or technical approach
- Examples: `econometrics`, `time-series-forecasting`, `sentiment-analysis`

## Implementation Details

### Data Structure
```typescript
interface Project {
  title: string;
  description: string;
  image: string;
  status?: "coming-soon" | "available";
  link?: string;
  tags?: {
    technology?: string[];  // 🧩 tools, frameworks, libraries, languages
    domain?: string[];      // 🧠 subject matter / industry
    type?: string[];        // 🎨 project type / functionality
    method?: string[];      // 📊 analytical or technical approach
  };
}
```

### Tag Format
- **Storage**: kebab-case (e.g., `natural-language-processing`)
- **Display**: spaces (e.g., "natural language processing")
- **Rendering**: Grouped by category in specified order
- **Styling**: Secondary variant badges with small text

### Rendering Logic
```typescript
// Helper function to format tags
const formatTag = (tag: string): string => {
  return tag.split("-").join(" ");
};

// Render tags in category order with accessibility
const renderProjectTags = (tags?: Project["tags"]) => {
  if (!tags) return null;

  const categoryOrder = ["technology", "domain", "type", "method"];

  return (
    <div className="flex flex-wrap gap-1.5 mt-3" aria-label="Project tags">
      {categoryOrder.map((category) => {
        const categoryTags = tags[category];
        if (!categoryTags || categoryTags.length === 0) return null;

        return categoryTags.map((tag, idx) => (
          <Badge
            key={`${category}-${idx}`}
            variant="secondary"
            className="text-xs font-normal"
          >
            {formatTag(tag)}
          </Badge>
        ));
      })}
    </div>
  );
};
```

## Project Tags Mapping

### 1. Small businesses... Big impact (Coming Soon)
```typescript
tags: {
  technology: ["python", "r", "stata"],
  domain: ["economics", "public-policy"],
  type: ["research"],
  method: ["econometrics", "regression-analysis"],
}
```

### 2. Driving Performance: Analyzing Canada's Automotive Stocks
```typescript
tags: {
  technology: ["r", "shiny", "tidyquant", "tidyverse"],
  domain: ["automotive", "finance", "data-visualization"],
  type: ["dashboard"],
  method: ["exploratory-data-analysis", "time-series-analysis"],
}
```

### 3. Can we predict the future of BEV stocks
```typescript
tags: {
  technology: ["python", "garch", "var"],
  domain: ["finance", "automotive"],
  type: ["predictive-model", "research"],
  method: ["time-series-forecasting", "volatility-modeling"],
}
```

### 4. Understanding Public Opinion Through Text Analysis
```typescript
tags: {
  technology: ["python", "nltk", "scikit-learn", "gephi"],
  domain: ["social-science", "marketing"],
  type: ["text-analysis", "network-visualization"],
  method: ["natural-language-processing", "sentiment-analysis"],
}
```

### 5. Canadian Census Data Explorer
```typescript
tags: {
  technology: ["r", "shiny", "cancensus"],
  domain: ["demographics", "public-policy"],
  type: ["dashboard", "data-extraction"],
  method: ["exploratory-data-analysis"],
}
```

## Exported API

The `projects` array is now exported for future filtering/search functionality:

```typescript
import { projects } from "@/components/ProjectsSection";

// Filter by technology
const pythonProjects = projects.filter(p => 
  p.tags?.technology?.includes("python")
);

// Filter by domain
const financeProjects = projects.filter(p => 
  p.tags?.domain?.includes("finance")
);

// Filter by multiple criteria
const researchProjects = projects.filter(p => 
  p.tags?.type?.includes("research")
);
```

## Accessibility

- Tags container has `aria-label="Project tags"` for screen readers
- Each badge uses semantic HTML with proper contrast ratios
- Tags grouped logically by category for better comprehension

## Future Enhancements

1. **Search/Filter UI**: Add filter chips or search input to filter projects by tags
2. **Tag Statistics**: Show tag frequency across all projects
3. **Tag Navigation**: Click tags to filter projects with that tag
4. **Tag Colors**: Color-code tags by category (technology = blue, domain = green, etc.)
5. **Tag Suggestions**: Auto-suggest tags when adding new projects
6. **Tag Analytics**: Track which tags are most viewed/clicked

## Testing Checklist

- [x] Interface updated with 4-category tags structure
- [x] All 5 projects have tags assigned
- [x] Tags render below project titles
- [x] Tags formatted correctly (kebab-case → spaces)
- [x] Tags grouped by category in correct order
- [x] Accessibility attributes added
- [x] Projects array exported for filtering
- [x] No TypeScript errors
- [ ] Unit tests (pending testing library setup)
- [ ] E2E tests for tag filtering (future)

## Files Modified

1. **src/components/ProjectsSection.tsx**
   - Updated `Project` interface with `tags` property
   - Added tags to all 5 project objects
   - Added `formatTag` helper function
   - Added `renderProjectTags` helper function
   - Integrated tag rendering in JSX
   - Exported `projects` array

## Notes

- Tags are optional (`tags?: {...}`) to support projects without tags
- Each category within tags is also optional for flexibility
- Tag rendering skips empty categories automatically
- Badge styling matches existing UI design system
- Tags positioned between title and description for visual hierarchy
