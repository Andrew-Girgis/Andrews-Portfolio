# Google Analytics Setup

## Configuration

**Measurement ID:** `G-4644ELZJWP`

## Implementation

Google Analytics tracking is implemented in `index.html` via Google Tag Manager script.

**Critical:** The GA script MUST remain in the `<head>` section of `index.html` for visitor tracking to work properly.

## Location

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4644ELZJWP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4644ELZJWP');
</script>
```

## Dashboard Access

View analytics at: https://analytics.google.com/

## Notes

- Do NOT remove or modify the GA script from `index.html`
- The measurement ID is public and safe to commit to GitHub
- Any changes to `index.html` structure should preserve the GA implementation
