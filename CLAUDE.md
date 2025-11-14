# CLAUDE.md - Pages Magazine App Architecture Guide

## Project Overview

**Pages** is a React Native Web digital magazine platform that publishes monthly editions with multiple themed columns. The architecture is designed for **zero-code content management** - new editions are added by creating JSON files in the `/content` directory without modifying application code.

**Key Philosophy**: Content drives the app, not vice versa. All content is declarative JSON that the app renders dynamically.

---

## Tech Stack & Dependencies

### Core Framework
- **React 19** - UI framework
- **React Native Web 0.21** - Cross-platform rendering (web, iOS, Android)
- **React Navigation 7** - Navigation with native stack and URL linking
- **Material-UI (MUI) 7.3** - Component library with theming
- **TypeScript** - Type safety

### Build & Deployment
- **Webpack 5** - Web bundler with hot module reloading
- **Babel 7** - JavaScript transpilation
- **gh-pages** - GitHub Pages deployment
- **Metro** - React Native bundler for mobile

### Development
- **ESLint** - Code linting
- **Jest** - Testing
- **Prettier** - Code formatting

---

## Architecture Overview

### 5-Screen Navigation Structure

The app uses React Navigation with a stack navigator. All screens are accessible via query parameter URLs for web compatibility.

```
Home Screen (/)
├── Cover Screen (?edition=2025-11)
│   └── Index Screen (?edition=2025-11&view=contents)
│       └── Column Screen (?edition=2025-11&article=verses)
├── Archive Screen (?view=archive)
└── Theme Toggle
```

**Key Files**:
- `/src/navigation/RootNavigator.tsx` - Navigation container, URL linking, screen definitions
- `/src/navigation/types.ts` - Navigation type definitions (RootStackParamList)

**URL Routing** (in `RootNavigator.tsx`):
- Converts React Navigation state to/from query parameters
- Preserves browser history and back button functionality
- Shareable URLs: `/Pages/?edition=2025-11&article=verses`

---

## Content Management System Pattern

### Directory Structure

```
content/
  2025-11/                      ← Month folder (YYYY-MM format)
    config.json                 ← Edition metadata & column definitions
    theme.json                  ← Edition colors, fonts, dark mode
    columns/
      verses.json               ← Column 1: Poetry (REQUIRED)
      fusion.json               ← Column 2: Author content
      agnostic-perspective.json ← Column 3: Author content
      ... more columns

global/
  config.json                   ← Magazine name, tagline, about
  styles.json                   ← Default global colors & typography
```

### Content Loading Flow

**1. Month Discovery** (`src/utils/contentLoader.ts` → `getAvailableMonths()`)
- Hardcoded list: `['2025-11']`
- Sorted newest first
- When adding new month: Update this list

**2. Config Loading** (`loadMonthConfig(monthId)`)
- Reads `content/YYYY-MM/config.json`
- Returns `MonthConfig` with columns array
- **Critical**: `columns` array must be ordered by `order` field

**3. Theme Loading** (`loadMonthTheme(monthId)`)
- Reads `content/YYYY-MM/theme.json`
- Optional - returns null if missing
- Contains edition-wide color palette and typography

**4. Column Content Loading** (`loadColumnContent(monthId, columnId)`)
- Reads `content/YYYY-MM/columns/{columnId}.json`
- Extracts `content` or `text` field
- Rendered as markdown in ColumnScreen

### Data Types

See `/src/types/index.ts` for complete definitions:

```typescript
// Edition configuration
MonthConfig {
  year: number;
  month: number;
  title: string;                // "November 2025 Edition"
  themeTitleLine1?: string;     // "The"
  themeTitleLine2?: string;     // "Beginnings"
  coverDescription?: string;
  coverColor?: string;
  editorNote?: string;
  columns: Column[];
}

// Individual column
Column {
  id: string;                   // "verses", "fusion" (used in URLs)
  title: string;                // Display title
  author: Author;               // name, email, bio
  content: string;              // Loaded separately
  excerpt?: string;
  order: number;                // Display order (1-based)
  theme?: ColumnTheme;          // Per-column styling override
}

// Column-specific styling
ColumnTheme {
  primaryColor: string;
  secondaryColor: string;
  headerStyle: 'gradient' | 'solid' | 'minimal' | 'artistic';
  fontFamily: string;           // Content font
  headerFont: string;           // Title font
  backgroundColor: { light: string; dark: string };
  contentTextColor: { light: string; dark: string };
}

// Edition-wide theme
Theme {
  colors: {
    primary: string;            // Header color
    secondary: string;
    background?: string;
    text?: string;
  };
  darkMode?: {
    primary?: string;
    secondary?: string;
    text?: string;
  };
}
```

---

## Theme System Architecture

### Three-Layer Theme Structure

**1. Global Theme** (`global/styles.json`)
- Applies to UI chrome (headers, buttons, navigation)
- Default colors when edition theme doesn't override
- Colors: Primary (#2C3E50), Secondary (#3498DB), Text (#333333)

**2. Edition Theme** (`content/2025-11/theme.json`)
- Edition-wide color palette (primary, secondary, background, text)
- Separate dark mode colors
- Typography hints
- Merges with global styles in `src/utils/styleLoader.ts` → `mergeStyles()`

**3. Column Theme** (`config.json` → `columns[].theme`)
- Per-column styling (most specific)
- Overrides edition theme for individual articles
- Controls: colors, fonts, header style, text colors for light/dark mode
- Example: "Verses" column uses light blue (#7DD3FC) with dark text (#0C4A6E)

### Theme Provider Pattern

```typescript
// src/context/ThemeContext.tsx
export const useThemeMode = () => {
  return { mode: 'light' | 'dark', toggleTheme: () => void };
}

// MUI Theme
const theme = useMemo(() => 
  createTheme({
    palette: { mode, primary, secondary, background },
    typography: { fontFamily },
    components: { /* style overrides */ }
  }),
  [mode]
);
```

**Key Points**:
- Light/dark mode toggled via `ThemeToggleButton` component
- Mode persisted in local state (not localStorage)
- All screens check `useThemeMode()` hook to apply mode-specific colors
- MUI components use `useTheme()` and `useMediaQuery()` for responsive design

---

## Component Architecture

### Screen Components

**HomeScreen** (`src/components/HomeScreen.tsx`)
- Landing page with magazine name and introduction
- Loads all available editions dynamically
- Shows issue cards in grid
- Click navigates to CoverScreen

**CoverScreen** (`src/components/CoverScreen.tsx`)
- Magazine cover with theme colors
- Displays split title (themeTitleLine1/Line2) or subtitle
- Cover description
- Buttons: "Read This Issue" → IndexScreen, "Browse All" → ArchiveScreen
- Animated entrance with Animated API

**IndexScreen** (`src/components/IndexScreen.tsx`)
- Table of contents / columns list
- Shows editor note
- List of clickable column cards (ordered by `column.order`)
- Click navigates to ColumnScreen

**ColumnScreen** (`src/components/ColumnScreen.tsx`)
- Full article view
- Markdown rendering (headings, bold, italic, lists)
- Column theme styling (background, fonts, text color)
- Author info card
- "Add Pen Friend" button (uses PenFriendContext)
- Back navigation

**ArchiveScreen** (`src/components/ArchiveScreen.tsx`)
- Browse all available editions
- Month-based navigation

**ThemeToggleButton** (`src/components/ThemeToggleButton.tsx`)
- Light/dark mode toggle icon
- Uses `useThemeMode()` context

### Context Providers

**ThemeContext** (`src/context/ThemeContext.tsx`)
- Manages light/dark mode state globally
- Exports `useThemeMode()` hook
- Wraps entire app in MUI ThemeProvider

**PenFriendContext** (`src/context/PenFriendContext.tsx`)
- Simple state management for favorite authors
- `usePenFriends()` hook: `{ penFriends, addPenFriend, removePenFriend, isPenFriend }`
- Note: Not persisted to localStorage currently

### Root Setup

**App.tsx** - Wraps RootNavigator in SafeAreaProvider (React Native Web)

**index.js** - Entry point for React DOM in web environment

**RootNavigator.tsx** - Wraps entire app in:
1. ThemeProvider (MUI + light/dark mode)
2. PenFriendProvider (favorite authors)
3. NavigationContainer (React Navigation)

---

## Key Files Quick Reference

| File | Purpose |
|------|---------|
| `/src/utils/contentLoader.ts` | Dynamically loads content JSON, month list |
| `/src/utils/styleLoader.ts` | Global styles, theme merging |
| `/src/types/index.ts` | Type definitions (MonthConfig, Column, Theme, etc.) |
| `/src/context/ThemeContext.tsx` | Light/dark mode state |
| `/src/context/PenFriendContext.tsx` | Favorite authors list |
| `/src/navigation/RootNavigator.tsx` | Screen definitions, URL routing |
| `/src/theme/mui-theme.ts` | MUI theme configuration (if exists) |
| `/content/YYYY-MM/config.json` | Edition content & column definitions |
| `/content/YYYY-MM/theme.json` | Edition colors & fonts |
| `/global/config.json` | Magazine name, tagline |
| `/global/styles.json` | Default UI colors & typography |
| `/webpack.config.js` | Web bundler config (port 3000, hot reload) |

---

## Build & Deployment

### Development (Web)

```bash
npm install --legacy-peer-deps
npm run web                    # Starts Webpack dev server on port 3000
                               # Watches content/**/*.json for hot reload
```

Hot reload watches:
- `/content/**/*.json` - Add new months/columns without restart
- `/src/**/*.ts(x)` - Code changes

### Production Build

```bash
npm run build:web              # Outputs to /build directory
npm run deploy                 # Deploys to GitHub Pages
```

**Webpack Config** (`webpack.config.js`):
- Entry: `./web/polyfills.js`, `./web/index.js`
- Output: `/web-build` directory
- Public path: `/Pages/` (GitHub Pages subdirectory)
- Dev server: Port 3000, hot reload enabled, history API fallback
- Babel loaders for JS/TS/TSX
- Asset handling for images
- React Native Web aliases configured

### Mobile Builds

```bash
npm start                      # Metro bundler
npm run android               # Android simulator/device
npm run ios                   # iOS simulator/device
```

---

## November 2025 Edition Structure

Current edition at `/content/2025-11/` contains:

**config.json**:
- Theme: "The Beginnings" (split title)
- 9 columns (ordered by `order` field):
  1. Verses (Pearl) - Poetry, light blue theme
  2. Fusion (Anshu) - Spiritual, peach theme
  3. The Agnostic Perspective (P_eace) - Philosophy, purple theme
  4. Ctrl+Alt+Think (Anonymous) - Observations, teal theme
  5. Eureka (Apollo) - Mystery, black & green theme
  6. शुरू से शुरुआत (Lakshay) - Hindi, purple & yellow theme
  7. anámnisi (anonymous) - Memories, burgundy theme
  8. Life, death and everything (Vipasha) - Poetry, cyan theme
  9. Papaya Rules (Arpit) - F1 Racing, orange theme

**theme.json**:
- Edition colors: Sage green palette (#D8E3C5 light, #2C3428 dark)
- Typography: Great Vibes font for titles

---

## Adding a New Edition (Step-by-Step)

### 1. Create Directory
```bash
mkdir -p content/2025-12/columns
```

### 2. Create `config.json`
```json
{
  "year": 2025,
  "month": 12,
  "title": "December 2025 Edition",
  "themeTitleLine1": "Word1",
  "themeTitleLine2": "Word2",
  "coverDescription": "Your description",
  "coverColor": "#HEXCOLOR",
  "editorNote": "Your editor note...",
  "columns": [
    {
      "id": "verses",
      "title": "Verses",
      "author": {
        "name": "Pearl",
        "bio": "A jumbled me in these lines",
        "email": "pearlpavni14@gmail.com"
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
        "backgroundColor": {"light": "#F0F9FF", "dark": "#082f49"},
        "contentTextColor": {"light": "#0C4A6E", "dark": "#BAE6FD"}
      }
    },
    {
      "id": "your-column",
      "title": "Your Column",
      "author": {"name": "Author Name", "bio": "Bio", "email": "email@example.com"},
      "excerpt": "Excerpt",
      "order": 2,
      "theme": { /* custom theme */ }
    }
  ]
}
```

### 3. Create `theme.json`
```json
{
  "colors": {
    "primary": "#YourColor",
    "secondary": "#AccentColor",
    "text": "#TextColor"
  },
  "darkMode": {
    "primary": "#DarkPrimary",
    "secondary": "#DarkSecondary",
    "text": "#DarkText"
  }
}
```

### 4. Create Column Files
```bash
echo '{"content": "# Column Title\n\nYour markdown content here..."}' > content/2025-12/columns/verses.json
echo '{"content": "# Another Column\n\nContent..."}' > content/2025-12/columns/your-column.json
```

### 5. Update `src/utils/contentLoader.ts`
```typescript
export const getAvailableMonths = (): string[] => {
  const months = [
    '2025-12',  // Add new month
    '2025-11',
  ];
  return months.sort().reverse();
};
```

### 6. Restart App
```bash
npm run web
```

**CRITICAL**: Always include "Verses" column with order 1. See `VERSES_COLUMN_GUIDE.md` for exact specifications.

---

## Important Patterns & Best Practices

### 1. Content Loading Strategy
- **Async/await pattern**: All loaders are async for future remote content support
- **Fallback handling**: Missing columns return empty strings, themes default to null
- **Dynamic requires**: `require(`../../content/${monthId}/...`)` for bundler compatibility

### 2. Responsive Design
```typescript
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const isTablet = useMediaQuery(theme.breakpoints.down('md'));

// Use in JSX:
sx={{ 
  flexDirection: isMobile ? 'column' : 'row',
  fontSize: isMobile ? 14 : 16,
}}
```

### 3. Theme Application
```typescript
// In any screen component:
const { mode } = useThemeMode();  // 'light' or 'dark'

// Color selection:
const bgColor = mode === 'dark' 
  ? columnTheme.backgroundColor.dark 
  : columnTheme.backgroundColor.light;
```

### 4. Column Rendering
- Markdown-like content in text fields (not full markdown processor)
- Headings: `# Title` format
- Bold/Italic: `**bold**` and `*italic*` patterns
- Custom renderer in ColumnScreen applies theme fonts and colors

### 5. Navigation Pattern
```typescript
// All navigation is typed via RootStackParamList
navigation.navigate('Cover', { monthId: '2025-11' });
navigation.navigate('Column', { monthId: '2025-11', columnId: 'verses', columnTitle: 'Verses' });
```

---

## Common Modifications

### Change Magazine Name
Edit `/global/config.json`:
```json
{
  "magazineName": "Your Magazine",
  "tagline": "Your Tagline",
  "about": "Your description"
}
```

### Change Global Colors
Edit `/global/styles.json` - affects UI chrome (headers, buttons)

### Change Edition Colors
Edit `/content/2025-11/theme.json` - affects cover and content areas

### Change Column Colors
Edit column `theme` in `/content/2025-11/config.json` - affects individual articles

### Add New Font
- Fonts are defined in column theme: `fontFamily`, `headerFont`
- Common fonts: "Calibri", "Georgia", "Courier New", "Dancing Script", "Satisfy", "Crimson Text"
- Ensure fonts are available in web environment (system fonts or Google Fonts)

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Month not found" | Month not in `getAvailableMonths()` | Update `/src/utils/contentLoader.ts` |
| Blank cover | Missing `config.json` | Create `content/YYYY-MM/config.json` |
| Column not visible | Not in columns array or wrong `id` | Check `config.json` columns match file names |
| Theme not applying | Dark mode colors missing | Add `darkMode` object to `theme.json` |
| Font not loading | Custom font not available | Use system fonts: Georgia, Calibri, etc. |
| Navigation broken | Query parameters wrong | Check RootNavigator `getPathFromState` |

---

## Development Workflow

1. **Create content**: Add JSON files to `/content/YYYY-MM/`
2. **Update contentLoader**: Add month to `getAvailableMonths()`
3. **Start dev server**: `npm run web`
4. **Hot reload**: Changes to JSON auto-reload in browser
5. **Test all screens**: Home → Cover → Index → Column → Back
6. **Check theme**: Toggle light/dark mode on each screen
7. **Deploy**: `npm run build:web && npm run deploy`

---

## Related Documentation

- **README.md** - User-facing overview and quick start
- **ADD_NEW_EDITION.md** - Detailed edition creation guide
- **VERSES_COLUMN_GUIDE.md** - Standards for recurring poetry column
- **package.json** - Scripts and dependencies
- **webpack.config.js** - Web build configuration

---

## Contact & Deployment

- **GitHub**: pavnijaiswal/Pages
- **Homepage**: https://pavnijaiswal.github.io/Pages
- **Current Edition**: November 2025 - "The Beginnings"

---

**Last Updated**: November 2025
**Maintainer**: Pavni Jaiswal
