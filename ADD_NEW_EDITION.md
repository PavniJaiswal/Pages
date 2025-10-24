# How to Add a New Edition

This guide explains how to add a new monthly edition to Pages magazine while maintaining uniform design and avoiding code duplication.

---

## 📖 Important: Verses Column (Recurring Feature)

**"Verses" is a recurring poetry column by Pearl that MUST appear first in EVERY edition.**

### Required Configuration:

```json
{
  "id": "verses",
  "title": "Verses",
  "author": {
    "name": "Pearl",
    "bio": "A jumbled me in these lines"
  },
  "excerpt": "A jumbled me in these lines",
  "order": 1,
  "theme": {
    "primaryColor": "#7DD3FC",
    "secondaryColor": "#FED7E2",
    "headerStyle": "artistic",
    "textColor": "#0C4A6E",
    "fontFamily": "Calibri",
    "fontStyle": "italic",
    "headerFont": "Dancing Script",
    "categoryLabel": "Poetry",
    "backgroundColor": {
      "light": "#F0F9FF",
      "dark": "#082f49"
    },
    "contentTextColor": {
      "light": "#0C4A6E",
      "dark": "#BAE6FD"
    }
  }
}
```

**Key Points:**
- 🎨 **Colors**: Sky blue/pink gradient header, deep blue text (#0C4A6E) - **DO NOT CHANGE**
- 🌓 **Backgrounds**: Ultra light blue (#F0F9FF) in light mode, dark blue (#082f49) in dark mode
- ✍️ **Content Font**: `Calibri` with `italic` style - **DO NOT CHANGE**
- 🎨 **Header Font**: `Dancing Script` (artistic script) - **DO NOT CHANGE**
- 📍 **Position**: Always `"order": 1` (first column) - **DO NOT CHANGE**
- 🎭 **Style**: `"artistic"` header with animated gradient, dark text for contrast

📚 **See `VERSES_COLUMN_GUIDE.md` for complete details on this recurring column.**

---

## 📋 Quick Steps

1. Create new folder: `content/YYYY-MM/`
2. Add 3 files: `config.json`, `theme.json`, and column files
3. Update `src/utils/contentLoader.ts`
4. Restart the app

---

## 📁 Step 1: Create Folder Structure

```
content/
  └── 2025-12/              ← New edition folder
      ├── config.json       ← Edition configuration
      ├── theme.json        ← Colors and styling
      └── columns/          ← Article files
          ├── article1.json
          ├── article2.json
          └── verses.json   ← Always include this
```

---

## 📝 Step 2: Create `config.json`

This file defines your edition's content and structure.

### Template:

```json
{
  "year": 2025,
  "month": 12,
  "title": "December 2025 Edition",
  "themeTitleLine1": "Word1",
  "themeTitleLine2": "Word2",
  "coverDescription": "Your description here!",
  "coverColor": "#HEXCOLOR",
  "editorNote": "Your editor's note here...",
  "columns": [
    {
      "id": "article-id",
      "title": "Article Title",
      "author": {
        "name": "Author Name",
        "bio": "Brief bio"
      },
      "excerpt": "Short description",
      "order": 1,
      "theme": {
        "primaryColor": "#HEXCOLOR",
        "secondaryColor": "#HEXCOLOR",
        "headerStyle": "gradient",
        "textColor": "#FFFFFF"
      }
    }
  ]
}
```

### Key Fields Explained:

#### **Title Structure:**
- **`themeTitleLine1`**: Small text on first line (e.g., "The")
- **`themeTitleLine2`**: Large text on second line (e.g., "Beginnings")
- Both are **center-aligned** and use the font from `theme.json`

#### **Cover Text:**
- **`coverDescription`**: Subtext shown on cover below the title
  - Example: "November ushers in a special theme: Every journey starts somewhere!"

#### **Editor's Note:**
- **`editorNote`**: Displayed on Table of Contents page
- Should be a full paragraph about the edition's theme

#### **Columns:**
- Always include "Verses" by Pearl as the 5th article (or last)
- Each column can have its own `theme` for individual styling

---

## 🎨 Step 3: Create `theme.json`

This file defines colors and fonts for your edition.

### Template:

```json
{
  "colors": {
    "primary": "#HEXCOLOR",
    "secondary": "#HEXCOLOR",
    "accent": "#HEXCOLOR",
    "text": "#HEXCOLOR"
  },
  "darkMode": {
    "primary": "#HEXCOLOR",
    "secondary": "#HEXCOLOR",
    "text": "#HEXCOLOR"
  },
  "font": {
    "title": "Font Name"
  }
}
```

### Available Fonts:
- `Great Vibes` (elegant script)
- `Satisfy` (casual handwritten)
- `Dancing Script` (flowing script)
- `Pacifico` (rounded script)

### Color Guidelines:

#### **Light Mode:**
- `primary`: Main background color (lighter shade)
- `secondary`: Accent color for decorations
- `text`: Dark text for good contrast
- `accent`: Optional highlight color

#### **Dark Mode:**
- `primary`: Dark background color
- `secondary`: Brighter accent (for visibility)
- `text`: Light text color

**Tip**: Use a color palette generator to ensure good contrast ratios.

---

## 📄 Step 4: Create Column Files

Each article needs its own JSON file in the `columns/` folder.

### Template: `columns/your-article.json`

```json
{
  "content": "# Article Title\n\n**By Author Name**\n\n*Author bio here*\n\n---\n\nYour article content here...\n\nUse **bold** for emphasis.\n\nUse *italics* for quotes.\n\n## Subheadings\n\nMore content..."
}
```

### Poetry by Pearl

Include `columns/verses.json` for Pearl's poetry:

```json
{
  "content": "# Verses\n\n**By Pearl**\n\n*Poet and observer of life's quiet moments*\n\n---\n\nYour poetry here...\n\n*A jumbled me in these lines*"
}
```

> **Note**: The November 2025 edition features only Pearl's poetry as a showcase of minimalist content presentation.

---

## 🔧 Step 5: Update Content Loader

Edit `src/utils/contentLoader.ts`:

```typescript
export const getAvailableMonths = (): string[] => {
  const months = [
    '2025-12',  // ← Add your new month here
    '2025-11',
  ];
  
  return months.sort().reverse(); // Most recent first
};
```

---

## 🚀 Step 6: Test Your Edition

```bash
npm run web
```

Visit `http://localhost:8080` and check:
- ✅ Home page shows new edition
- ✅ Cover page displays correctly with split title
- ✅ Colors work in both light and dark mode
- ✅ Table of Contents shows editor's note
- ✅ All articles load properly
- ✅ "Verses" appears in the list

---

## 📐 Design Rules for Uniformity

### Cover Page Structure (Always the Same):
1. **Theme Toggle** - Top right corner
2. **Book Icon** - Decorative element
3. **Magazine Name** - Small, uppercase
4. **Month/Year** - Subtle, italic
5. **Title Line 1** - Small, center-aligned
6. **Title Line 2** - Large, center-aligned
7. **Decorative Lines** - Above and below title
8. **Cover Description** - Italic subtext
9. **Tagline** - Magazine tagline
10. **Flourish** - ❦ symbol
11. **Read Now Button** - First line (outlined)
12. **Other Editions + Home** - Second line (text buttons)

### What Changes Per Edition:
- ✅ Title text (themeTitleLine1, themeTitleLine2)
- ✅ Cover description
- ✅ Colors (primary, secondary, text)
- ✅ Font (title font family)
- ✅ Articles and content

### What Stays the Same:
- ✅ Layout and structure
- ✅ Button arrangement
- ✅ Typography hierarchy
- ✅ Decorative elements
- ✅ Animation timing

---

## 💡 Example: December 2025 Edition

```json
// config.json
{
  "year": 2025,
  "month": 12,
  "themeTitleLine1": "Winter",
  "themeTitleLine2": "Reflections",
  "coverDescription": "December brings a time for reflection and gratitude!",
  "coverColor": "#E3F2FD",
  "editorNote": "As the year draws to a close..."
}

// theme.json
{
  "colors": {
    "primary": "#E3F2FD",
    "secondary": "#90CAF9",
    "text": "#1565C0"
  },
  "darkMode": {
    "primary": "#1A237E",
    "secondary": "#5C6BC0",
    "text": "#E3F2FD"
  },
  "font": {
    "title": "Dancing Script"
  }
}
```

---

## 🎯 Best Practices

1. **Test Both Themes**: Always check light and dark mode
2. **High Contrast**: Ensure text is readable on backgrounds
3. **Consistent Theme**: Match editor's note to cover description
4. **Include Verses**: Pearl's poetry in every edition
5. **Use Semantic Colors**: Choose colors that match the theme/season
6. **Preview on Mobile**: Test responsive design

---

## 📚 More Help

- **Types**: See `src/types/index.ts` for TypeScript interfaces
- **Example**: Check `content/2025-11/` for reference
- **README**: Main documentation in `README.md`
- **Status**: Current state in `PROJECT_STATUS.md`

---

**Happy Publishing!** 📖✨

