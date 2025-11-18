# Workspace Section Setup Guide

## ✅ What's Been Implemented

The interactive "Andrew's Setup" section has been fully implemented with:

1. **WorkspaceSection Component** (`src/components/WorkspaceSection.tsx`)
   - Inline SVG with interactive hotspots
   - Dynamic tooltip system
   - Full keyboard navigation support
   - Touch device support
   - Accessibility features (ARIA labels, focus management)

2. **Navigation Updated** 
   - Added "Workspace" link that scrolls to `#workspace`

3. **Page Integration**
   - Section placed between Projects and Footer in `src/pages/index.tsx`

## 🎯 Interactive Elements Included

Each hotspot has:
- **Visual feedback**: White outline glow on hover/focus
- **Tooltip**: Context-aware description of the tool
- **Keyboard accessible**: Tab through elements with Tab key
- **Touch support**: Tap to show tooltip on mobile

### Hotspots Implemented:
1. Left Monitor (Dashboards)
2. Center Monitor (VS Code)
3. Right Vertical Monitor (Twitter/X)
4. MacBook on Stand
5. Custom PC
6. Keyboard (60%)
7. Mouse
8. Microphone
9. Camera
10. KVM Switch

## 🔄 How to Replace with Your Actual SVG

The current implementation uses a **placeholder SVG**. To use your actual desk setup SVG:

### Step 1: Prepare Your SVG
1. Open your SVG file in a text editor
2. Identify the paths/groups for each interactive element (monitors, MacBook, PC, keyboard, etc.)

### Step 2: Update the Component
Open `src/components/WorkspaceSection.tsx` and replace the SVG content:

```tsx
<svg
  ref={svgRef}
  viewBox="0 0 YOUR_WIDTH YOUR_HEIGHT"  // Update viewBox from your SVG
  className="w-full h-auto"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Interactive desk setup illustration"
>
  {/* PASTE YOUR ACTUAL SVG CONTENT HERE */}
  {/* Keep the existing background/base paths */}
  
  {/* Then wrap each interactive element in a hotspot group */}
</svg>
```

### Step 3: Structure Each Hotspot
For each interactive element in your SVG, wrap it like this:

```tsx
<g
  className="hotspot"
  id="hotspot-YOUR-ID"
  data-label="Your tooltip description here"
  tabIndex={0}
  role="button"
  aria-label="Descriptive label for screen readers"
>
  {/* Your original SVG paths/shapes for this object */}
  <rect x="..." y="..." ... />
  
  {/* Add an outline path that traces the object's border */}
  <path
    className="hotspot-outline"
    d="M ... L ... Z"  // Trace the outline of your object
    fill="none"
    stroke="white"
    strokeWidth="8"
  />
</g>
```

### Step 4: Customize Tooltip Text
Update the `data-label` attributes with your personalized descriptions:

- **Custom PC**: "Custom RGB PC — used for heavier workloads, experiments, and local development."
- **MacBook**: "MacBook Air — my daily driver for writing, research, and light development."
- **Center Monitor**: "Central monitor — where I write code in VS Code for data pipelines, dashboards, and AI experiments."
- etc.

## 🎨 Customization Options

### Change Section Title
In `WorkspaceSection.tsx`, line ~85:
```tsx
<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
  Your Custom Title Here
</h2>
```

### Adjust Outline Style
In the `<style>` block at the bottom of the component:
```css
.hotspot .hotspot-outline {
  stroke-width: 8px;  /* Adjust thickness */
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));  /* Adjust glow */
}
```

### Change Tooltip Styling
In the tooltip `<div>` (line ~310):
```tsx
className="... bg-black/90 text-white ..."  // Customize colors
```

## 🧪 Testing Checklist

- [ ] **Desktop hover**: Hover over each element shows outline + tooltip
- [ ] **Keyboard navigation**: Tab through elements, see outlines
- [ ] **Screen reader**: ARIA labels announce element names
- [ ] **Mobile touch**: Tap elements to show/hide tooltips
- [ ] **Responsive**: SVG scales properly on all screen sizes
- [ ] **Performance**: No lag when hovering/focusing elements

## 🐛 Troubleshooting

### Outline doesn't show on hover
- Check that the `.hotspot-outline` path correctly traces your element
- Verify the `className="hotspot-outline"` is on the outline path
- Ensure `stroke="white"` and `fill="none"` are set

### Tooltip positioned incorrectly
- Make sure the SVG has `ref={svgRef}` attribute
- Check that `viewBox` dimensions match your SVG's actual size
- The tooltip calculates position relative to SVG's bounding box

### Element not keyboard accessible
- Verify `tabIndex={0}` is on the `<g className="hotspot">` element
- Check that focus/blur event listeners are working

### Touch doesn't work on mobile
- The CSS includes `@media (hover: none) and (pointer: coarse)` for touch
- Test on actual device, not just browser dev tools

## 📱 Mobile Considerations

On mobile devices (touch):
- Tapping a hotspot shows the tooltip
- Tapping elsewhere hides it
- No hover state (uses `:active` instead)

The component automatically handles this with media queries.

## ♿ Accessibility Features

✅ **Keyboard Navigation**
- All hotspots are focusable with Tab key
- Visual focus indicator (white outline)
- Enter/Space can be added to trigger actions

✅ **Screen Readers**
- Each hotspot has `role="button"` and `aria-label`
- Tooltip has `role="tooltip"`
- SVG has descriptive `aria-label`

✅ **Focus Management**
- Focus shows same outline as hover
- Tooltip appears on focus
- Focus indicator clearly visible

## 🚀 Next Steps

1. **Add your actual SVG** to replace the placeholder
2. **Customize tooltip descriptions** to match your workflow
3. **Test on all devices** (desktop, mobile, tablet)
4. **Optional**: Add click actions to hotspots (e.g., open product links)
5. **Optional**: Add animations (e.g., pulse effect on load)

## 💡 Enhancement Ideas

- **Click to open links**: Add `onClick` handlers to navigate to product pages
- **Stats/specs popup**: Show detailed specs in a modal on click
- **Dark mode variations**: Different outline colors for light/dark themes
- **Animated intro**: Fade in hotspots one by one on section scroll
- **Sound effects**: Optional hover sound for interactive feel

---

**Status**: ✅ Fully implemented and ready for your actual SVG content!
