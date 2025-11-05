# Cal.com Integration Guide

## Overview
The Cal.com booking widget has been successfully integrated into the React/TypeScript portfolio using modern best practices. The implementation provides a seamless booking experience within the chatbot interface.

## Components Created

### 1. CalBookingWidget Component
**Location:** `src/components/ui/CalBookingWidget.tsx`

**Features:**
- ✅ Automatic theme detection (syncs with light/dark mode)
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states with smooth transitions
- ✅ Error handling with fallback to direct Cal.com link
- ✅ Theme synchronization using MutationObserver
- ✅ TypeScript type safety
- ✅ Reusable across the application

**Props:**
```typescript
interface CalBookingWidgetProps {
  calLink?: string;     // Default: "andrew-girgis/30min"
  theme?: "light" | "dark";  // Optional: auto-detected if not provided
  layout?: "month_view" | "week_view" | "column_view";  // Default: "month_view"
}
```

## Usage Examples

### Basic Usage
```tsx
import CalBookingWidget from "@/components/ui/CalBookingWidget";

// Simple integration
<CalBookingWidget calLink="andrew-girgis/30min" />
```

### In Chatbot Context
The widget is automatically displayed when the AI chatbot detects booking-related responses:

```tsx
// In sierrachatbot.tsx
{!message.isUser && message.hasBookingWidget && (
  <div className="mt-4 ml-11">
    <CalBookingWidget 
      calLink="andrew-girgis/30min"
      layout="month_view"
    />
  </div>
)}
```

### Custom Layout
```tsx
// Week view layout
<CalBookingWidget 
  calLink="andrew-girgis/30min"
  layout="week_view"
/>

// Column view layout
<CalBookingWidget 
  calLink="andrew-girgis/30min"
  layout="column_view"
/>
```

## Integration Points

### 1. Chatbot Integration
**File:** `src/components/ui/sierrachatbot.tsx`

The chatbot automatically detects booking-related keywords and responses:
- Keywords: "book", "appointment", "meeting", "schedule", "calendar"
- API response flag: `action: 'show_booking_widget'`
- Cal.com embed detection in response text

### 2. Theme Synchronization
The widget automatically syncs with your site's theme:
```typescript
// Listens for theme changes in document.documentElement
const observer = new MutationObserver(() => {
  const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  setCurrentTheme(newTheme);
});
```

### 3. Styling
**File:** `src/index.css`

Custom Cal.com widget styles:
```css
/* Cal.com widget custom styling */
[id^="cal-widget-"] {
  color-scheme: light dark;
}

.dark [id^="cal-widget-"] {
  --cal-brand-color: hsl(212 100% 55%);
}

:root [id^="cal-widget-"] {
  --cal-brand-color: hsl(212 100% 48%);
}
```

## How It Works

### 1. Widget Initialization
```typescript
// Cal.com script is dynamically loaded
const script = document.createElement('script');
script.src = 'https://app.cal.com/embed/embed.js';
script.async = true;

// Widget is initialized with custom configuration
window.Cal("init", "30min", { origin: "https://app.cal.com" });
window.Cal.ns["30min"]("inline", {
  elementOrSelector: `#${widgetId}`,
  config: { layout: "month_view", theme: "light" },
  calLink: "andrew-girgis/30min",
});
```

### 2. Loading States
- Shows animated calendar icon during loading
- Smooth fade-in transition when calendar loads
- Loading indicator disappears after 2 seconds

### 3. Error Handling
If Cal.com fails to load:
- Displays user-friendly error message
- Provides fallback button linking directly to Cal.com
- Graceful degradation ensures users can always book

## Comparison: Vanilla JS vs React

### Vanilla JS Approach (Old)
```javascript
// Manual DOM manipulation
function addBookingWidget(chatMessagesContainer) {
  const bookingWrapper = document.createElement('div');
  bookingWrapper.className = 'booking-widget-wrapper';
  // ... inline styles with cssText
  // ... complex script injection
}
```

### React Approach (New)
```tsx
// Clean, declarative component
<CalBookingWidget 
  calLink="andrew-girgis/30min"
  layout="month_view"
/>
```

**Benefits of React Approach:**
- ✅ Declarative and easier to understand
- ✅ Reusable across multiple pages/components
- ✅ Type-safe with TypeScript
- ✅ Better state management
- ✅ Easier testing and maintenance
- ✅ Automatic cleanup with useEffect
- ✅ Better integration with modern tooling

## Testing

### 1. Theme Switching
- Switch between light/dark mode
- Calendar should automatically update theme
- No page refresh required

### 2. Chatbot Integration
Test these messages:
- "I'd like to book a meeting"
- "Can I schedule an appointment?"
- "Show me your calendar"

### 3. Direct Usage
You can also use the widget on any page:
```tsx
import CalBookingWidget from "@/components/ui/CalBookingWidget";

export default function BookingPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Book a Meeting</h1>
      <CalBookingWidget calLink="andrew-girgis/30min" />
    </div>
  );
}
```

## Configuration

### Customizing Cal.com Settings
Edit the widget initialization in `CalBookingWidget.tsx`:

```typescript
window.Cal.ns["30min"]("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#007bff" },  // Your brand color
    dark: { "cal-brand": "#007bff" }
  },
  hideEventTypeDetails: true,  // Hide event details
  layout: layout  // month_view, week_view, or column_view
});
```

### Changing Calendar Link
Update the default calLink prop:
```typescript
calLink = "your-username/your-event-type"
```

## Troubleshooting

### Widget Not Loading
1. Check console for errors
2. Verify Cal.com account is active
3. Ensure event type exists
4. Check network requests for Cal.com script

### Theme Not Switching
1. Verify document.documentElement has `dark` class
2. Check MutationObserver is running
3. Verify CSS variables are set correctly

### Widget Shows Error State
- This is expected behavior - fallback link is provided
- Check Cal.com service status
- Verify calLink is correct format

## Best Practices Applied

1. **Component Composition** - Reusable, self-contained component
2. **Type Safety** - Full TypeScript support with interfaces
3. **Error Boundaries** - Graceful error handling
4. **Performance** - Lazy loading of Cal.com script
5. **Accessibility** - Proper ARIA labels and semantic HTML
6. **Responsive Design** - Works on all screen sizes
7. **Theme Consistency** - Matches site theme automatically
8. **Clean Code** - Well-documented and maintainable

## Future Enhancements

Possible improvements:
- [ ] Add analytics tracking for bookings
- [ ] Support multiple event types
- [ ] Add booking confirmation notifications
- [ ] Custom styling overrides
- [ ] Prefill user information from chat context
- [ ] Add booking widget to dedicated booking page

## Resources

- [Cal.com Documentation](https://cal.com/docs)
- [Cal.com Embed Guide](https://cal.com/docs/core-features/embed)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** November 4, 2025
**Author:** AI Assistant
**Status:** ✅ Production Ready
