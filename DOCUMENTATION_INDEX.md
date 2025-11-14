# Pages Magazine - Documentation Index

This index helps you navigate all documentation for the Pages magazine application.

## Start Here

**New to this codebase?** Start with these three files in order:

1. **ARCHITECTURE_SUMMARY.txt** - Quick 2-minute overview (this folder)
   - What the app is
   - Tech stack
   - Key architectural insights
   - File locations
   - Critical tips for future developers

2. **CLAUDE.md** - Comprehensive 30-minute deep dive (this folder)
   - Complete technical architecture
   - All data types and structures
   - Theme system details
   - Component breakdown
   - Step-by-step edition creation
   - Troubleshooting guide

3. **README.md** - User-facing documentation (root)
   - Feature overview
   - Quick start instructions
   - Current edition details
   - Author connections

## Detailed Guides

### Adding Content

**ADD_NEW_EDITION.md** - How to create a new monthly edition
- Step-by-step walkthrough
- Directory structure
- JSON templates
- Important requirements

**VERSES_COLUMN_GUIDE.md** - Standards for the recurring poetry column
- Exact specifications
- Why it's special
- Theme requirements
- Content guidelines

### Code References

**Key Source Files** (when you need to modify code):

- `src/utils/contentLoader.ts` - Content discovery and loading
  - UPDATE THIS when adding new months
  - `getAvailableMonths()` - hardcoded list of available editions

- `src/types/index.ts` - TypeScript type definitions
  - MonthConfig, Column, ColumnTheme, Theme
  - All data structures used throughout app

- `src/navigation/RootNavigator.tsx` - Navigation and URL routing
  - Screen definitions
  - Query parameter handling
  - URL generation logic

- `src/context/ThemeContext.tsx` - Light/dark mode management
  - How to use useThemeMode() hook
  - Theme provider setup

- `src/context/PenFriendContext.tsx` - Favorite authors list
  - usePenFriends() hook
  - Current implementation

- `webpack.config.js` - Web build configuration
  - Hot reload setup
  - Webpack plugins
  - Public path configuration

- `package.json` - NPM scripts and dependencies
  - Available commands
  - Required packages

## Content Structure

**Magazine Configuration Files:**

- `global/config.json` - Magazine name, tagline, about text
- `global/styles.json` - Default UI colors and typography
- `content/YYYY-MM/config.json` - Edition metadata and columns array
- `content/YYYY-MM/theme.json` - Edition-wide colors
- `content/YYYY-MM/columns/*.json` - Individual article content

## Quick Commands

```bash
# Development
npm install --legacy-peer-deps
npm run web                    # Start dev server on port 3000

# Production
npm run build:web              # Build for web
npm run deploy                 # Deploy to GitHub Pages

# Mobile
npm start                      # Metro bundler
npm run android               # Android
npm run ios                   # iOS
```

## Navigation Map

The app has 5 screens, all accessible via URLs:

```
Home (/)
├── Cover (?edition=2025-11)
│   └── Index (?edition=2025-11&view=contents)
│       └── Column (?edition=2025-11&article=verses)
├── Archive (?view=archive)
└── Theme Toggle (light/dark)
```

## November 2025 Edition

**Current edition:** "The Beginnings" - 9 columns by different authors
- Located in: `/content/2025-11/`
- Uses sage green color scheme
- Read ADD_NEW_EDITION.md to understand the structure

## Critical Architecture Insights

1. **Content-Driven Design**
   - All content is JSON in `/content` directory
   - App automatically renders without code changes
   - No database - just file structure

2. **Three-Layer Theming**
   - Global defaults (global/styles.json)
   - Edition theme (content/YYYY-MM/theme.json)
   - Column theme (in config.json)
   - Most specific wins

3. **Query Parameter Navigation**
   - All URLs use query params: `?edition=...&article=...&view=...`
   - Preserves browser history
   - Shareable links
   - See RootNavigator.tsx for implementation

4. **Dynamic Content Loading**
   - Months list in contentLoader.ts
   - Config loaded from YYYY-MM/config.json
   - Column content loaded separately
   - Async pattern for future API support

## When You Need To...

### Add a new edition
1. Read: ADD_NEW_EDITION.md
2. Create: content/YYYY-MM/ folder structure
3. Modify: src/utils/contentLoader.ts (add month)
4. Test: npm run web

### Change magazine branding
1. Edit: global/config.json (name, tagline, about)
2. Edit: global/styles.json (colors, typography)

### Change theme colors
1. For all editions: global/styles.json
2. For one edition: content/YYYY-MM/theme.json
3. For one column: config.json columns[].theme

### Debug navigation issues
1. Check: src/navigation/RootNavigator.tsx getStateFromPath() and getPathFromState()
2. Verify: RootStackParamList types match component props
3. Test: URLs in browser address bar

### Debug content not loading
1. Check: Month in getAvailableMonths() in contentLoader.ts
2. Verify: config.json exists at content/YYYY-MM/
3. Ensure: Column id matches filename (no .json extension)

## File Locations Summary

```
/                           Root of repository
├── CLAUDE.md               <- READ THIS (comprehensive guide)
├── ARCHITECTURE_SUMMARY.txt <- Quick reference
├── DOCUMENTATION_INDEX.md  <- This file
├── README.md               <- User-facing docs
├── ADD_NEW_EDITION.md      <- How to add editions
├── VERSES_COLUMN_GUIDE.md  <- Poetry column specs
│
├── src/
│   ├── components/         5 screens + toggle button
│   ├── context/           ThemeContext, PenFriendContext
│   ├── navigation/        RootNavigator, types
│   ├── utils/             contentLoader, styleLoader
│   ├── types/             TypeScript definitions
│   └── theme/             MUI theme config
│
├── content/               Content editions (add new YYYY-MM folders here)
│   └── 2025-11/
│       ├── config.json    Edition structure
│       ├── theme.json     Edition colors
│       └── columns/       Article JSON files
│
├── global/                Magazine-level config
│   ├── config.json
│   └── styles.json
│
├── web/                   Web entry point
│   ├── index.html
│   ├── index.js
│   └── webpack config
│
├── package.json          Scripts and dependencies
├── webpack.config.js     Web bundler configuration
├── babel.config.js       Babel configuration
├── tsconfig.json         TypeScript configuration
├── jest.config.js        Test configuration
│
├── __tests__/            Test files
├── ios/                  iOS project
├── android/              Android project
└── build/                Built output (generated)
```

## Tech Stack Details

- **React 19** - UI framework
- **React Native Web** - Cross-platform support
- **React Navigation 7** - Native stack navigation
- **Material-UI 7** - Components and theming
- **TypeScript** - Type safety
- **Webpack 5** - Web bundler
- **Babel 7** - JavaScript transpilation
- **Jest** - Testing
- **ESLint** - Code quality

## Deployment

- **Hosted on:** GitHub Pages
- **URL:** https://pavnijaiswal.github.io/Pages
- **Repository:** pavnijaiswal/Pages
- **Deployment method:** gh-pages npm package

## Quick Facts

- No backend required (static content)
- Zero-code content management
- Responsive design (mobile, tablet, desktop)
- Light and dark mode support
- 5 main screens
- 1 required recurring column (Verses)
- URL routing with query parameters
- ~14 dependencies + dev tools

## Next Steps

1. Read **ARCHITECTURE_SUMMARY.txt** (5 min)
2. Read **CLAUDE.md** sections as needed
3. Review **ADD_NEW_EDITION.md** to understand content format
4. Try adding a test edition to `/content/2025-12/`
5. Run `npm run web` and test the flow
6. Read individual source files when you need to modify code

---

**Created:** November 2025
**For:** Future Claude Code instances and developers
**Purpose:** Rapid onboarding to Pages codebase architecture
