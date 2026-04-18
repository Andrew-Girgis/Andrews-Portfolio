# Handwriting Font

Place your custom handwriting font as `handwriting.woff2` in this directory.

This font is used for the hero typing animation.

## Steps

1. Convert your font to .woff2 format (use cloudconvert.com or fonttools)
2. Save it here as `handwriting.woff2`
3. The `@font-face` declaration in `src/styles/global.css` will pick it up automatically

Until you add the real font, the hero will fall back to a cursive system font.