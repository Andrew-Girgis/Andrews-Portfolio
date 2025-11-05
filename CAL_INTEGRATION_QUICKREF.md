# Cal.com Integration - Quick Reference

## Component Structure

```
src/
├── components/
│   └── ui/
│       ├── CalBookingWidget.tsx    ⭐ NEW - Main booking widget
│       └── sierrachatbot.tsx       🔄 UPDATED - Added Cal.com integration
├── pages/
│   ├── BookingDemo.tsx             ⭐ NEW - Standalone booking page
│   ├── index.tsx
│   └── notfound.tsx
├── App.tsx                         🔄 UPDATED - Added /booking route
└── index.css                       🔄 UPDATED - Added Cal.com styles
```

## Usage Examples

### 1️⃣ In Chatbot (Automatic)
```tsx
// Already integrated in sierrachatbot.tsx
// Just ask about booking and it shows automatically!

Example messages:
- "Can I book a meeting?"
- "Schedule an appointment"
- "Show me your calendar"
```

### 2️⃣ Standalone Page
```tsx
// Visit /booking in browser
// Full page dedicated to booking
```

### 3️⃣ Custom Usage
```tsx
import CalBookingWidget from "@/components/ui/CalBookingWidget";

export default function MyPage() {
  return (
    <CalBookingWidget 
      calLink="andrew-girgis/30min"
      layout="month_view"
    />
  );
}
```

## Props Reference

```typescript
interface CalBookingWidgetProps {
  calLink?: string;     
  // Default: "andrew-girgis/30min"
  // Format: "username/event-type"
  
  theme?: "light" | "dark";  
  // Optional - auto-detected if not provided
  // Syncs with document.documentElement class
  
  layout?: "month_view" | "week_view" | "column_view";  
  // Default: "month_view"
  // Changes calendar display format
}
```

## Features Matrix

| Feature | Status | Description |
|---------|--------|-------------|
| 🎨 Theme Sync | ✅ | Auto-syncs with site theme |
| 📱 Responsive | ✅ | Works on all devices |
| ⚡ Loading State | ✅ | Shows calendar loading |
| 🚨 Error Handling | ✅ | Fallback to Cal.com link |
| 🔄 Auto-refresh | ✅ | Updates on theme change |
| 📝 TypeScript | ✅ | Full type safety |
| 🎯 Chatbot | ✅ | AI-triggered booking |
| 📄 Standalone | ✅ | Dedicated page at /booking |

## Testing Guide

### Local Development
```bash
# Start dev server
npm run dev

# Test in browser
open http://localhost:5173
```

### Test Cases

**✅ Chatbot Integration**
1. Open chatbot (bottom right)
2. Type: "I'd like to book a meeting"
3. Widget should appear below response

**✅ Theme Switching**
1. Toggle light/dark mode
2. Calendar should update automatically
3. No page refresh needed

**✅ Standalone Page**
1. Visit `/booking`
2. Should see full booking page
3. Calendar should load

**✅ Error State**
1. Block `app.cal.com` in DevTools
2. Should show error message
3. Should show "Open Calendar" button

## Common Issues & Solutions

### Issue: Widget not loading
**Solution:** Check console for errors, verify Cal.com account

### Issue: Theme not syncing
**Solution:** Verify `document.documentElement.classList` contains 'dark'

### Issue: TypeScript errors
**Solution:** Run `npm install` to ensure all deps are installed

### Issue: Build fails
**Solution:** Check for syntax errors, run `npm run build`

## Quick Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit

# Format code
npm run format
```

## File Locations

**Component:** `src/components/ui/CalBookingWidget.tsx`  
**Demo Page:** `src/pages/BookingDemo.tsx`  
**Chatbot:** `src/components/ui/sierrachatbot.tsx`  
**Styles:** `src/index.css`  
**Routes:** `src/App.tsx`  

**Documentation:**  
- `CAL_INTEGRATION.md` - Full guide  
- `CAL_INTEGRATION_SUMMARY.md` - Summary  
- `CAL_INTEGRATION_QUICKREF.md` - This file  

## Architecture Diagram

```
User Input
    ↓
SierraChatbot Component
    ↓
Detects booking keywords/flags
    ↓
message.hasBookingWidget = true
    ↓
Renders CalBookingWidget
    ↓
CalBookingWidget loads Cal.com script
    ↓
Initializes calendar with theme
    ↓
MutationObserver watches for theme changes
    ↓
Re-initializes on theme change
```

## Key Code Snippets

### Initialize Cal.com
```typescript
window.Cal("init", "30min", { 
  origin: "https://app.cal.com" 
});

window.Cal.ns["30min"]("inline", {
  elementOrSelector: `#${widgetId}`,
  config: { layout, theme },
  calLink: "andrew-girgis/30min",
});
```

### Theme Detection
```typescript
const observer = new MutationObserver(() => {
  const newTheme = document.documentElement
    .classList.contains('dark') ? 'dark' : 'light';
  setCurrentTheme(newTheme);
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});
```

### Show Widget in Chatbot
```tsx
{!message.isUser && message.hasBookingWidget && (
  <div className="mt-4 ml-11">
    <CalBookingWidget calLink="andrew-girgis/30min" />
  </div>
)}
```

## Performance Notes

- ✅ Cal.com script loads asynchronously
- ✅ Component cleanup prevents memory leaks
- ✅ Theme detection uses efficient MutationObserver
- ✅ Loading states prevent layout shift
- ✅ Widget only loads when needed

## Browser Support

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile Safari  
✅ Chrome Mobile  

## Security Notes

- ✅ Uses official Cal.com embed script
- ✅ Target="_blank" with rel="noopener noreferrer"
- ✅ No sensitive data stored locally
- ✅ HTTPS only for Cal.com connections

---

**Quick Start:** Import `CalBookingWidget` and use it anywhere!  
**Best Practice:** Let chatbot handle booking triggers automatically  
**Demo:** Visit `/booking` to see it in action  

**Questions?** Check `CAL_INTEGRATION.md` for full documentation.
