# Pages - Digital Magazine Platform

**Your words, our pages**

A beautiful, content-driven digital magazine platform built with React Native and Material-UI.

## ✨ Features

- **Beautiful Design**: Artistic, literary aesthetic with handwritten fonts and elegant typography
- **Dark & Light Mode**: Full theme support with custom sage green color scheme
- **Editor's Notes**: Personal touches from the editor for each edition
- **Poetry Corner**: "Verses" by Pearl in every edition
- **Pen Friend Feature**: Save your favorite authors
- **Responsive**: Works beautifully on mobile, tablet, and desktop
- **Easy Content Management**: Add new editions without changing code

## 🚀 Quick Start

### Run in Web Browser

```bash
npm install --legacy-peer-deps
npm run web
```

The app will open at `http://localhost:3000`

### Run on Mobile

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Metro bundler
npm start

# In another terminal:
# For Android
npm run android

# For iOS
npm run ios
```

## 📖 Current Edition

**November 2025 - "The Beginnings"** (Full Magazine Edition)

Featured columns:
1. **Fusion** by A. - Spiritual journey in Hindi *(Peach theme, Satisfy script font)*
2. **The Agnostic Perspective** by P_eace - Life through an open, questioning lens *(Metallic purple gradient, Georgia font)*
3. **Ctrl+Alt+Think** by Anonymous - Everyday life and the small things *(Teal & cyan minimal theme, system font)*
4. **Eureka** by Apollo - Mystery and uncertainty *(Black & green horror theme, Courier New)*
5. **Verses** by Pearl - Poetry on Beginnings *(Light blue & pink theme, Calibri italic font)*
6. **शुरू से शुरुआत** by Lakshay - The Beginnings in Hindi *(Purple & yellow artistic theme, Satisfy font)*
7. **anámnisi** by anonymous - Remembrance, memories, recollection *(Soft burgundy theme, Crimson Text italic)*
8. **Life, death and everything in between** by Vipasha - Life experiences, emotions, poetry *(Cyan & teal artistic theme, Crimson Text italic)*
9. **Papaya Rules** by Arpit - McLaren F1 racing philosophy *(McLaren orange theme, system font)*

## ✉️ Author Connections

Most authors can be contacted via email by clicking "Add Pen Pal" on their column:
- A. (Fusion): anshu.jaiswal52@gmail.com
- P_eace (The Agnostic Perspective): askforpiyush@gmail.com
- Anonymous (Ctrl+Alt+Think): anna.atl.usa@gmail.com
- Apollo (Eureka): aviral.9.17@gmail.com
- Pearl (Verses): pearlpavni14@gmail.com
- Lakshay (शुरू से शुरुआत): nagpallakshay414@gmail.com
- Vipasha (Life, death and everything in between): vipashamittal@gmail.com

*Note: anámnisi and Papaya Rules authors have chosen to remain anonymous and do not accept direct connections.*

## 🎨 Design

- **Fonts**: Great Vibes (script), Satisfy, Libre Baskerville, Crimson Text
- **Color Scheme**: Sage green (#D8E3C5 light, #2C3428 dark)
- **UI Framework**: Material-UI with custom theme
- **Typography**: Literary serif fonts with elegant handwritten titles

## 📁 Project Structure

```
content/
  2025-11/              ← Current edition
    config.json         ← Edition configuration
    theme.json          ← Color theme
    columns/            ← Article JSON files (10 columns)
      
global/
  config.json           ← Magazine name, tagline
  styles.json           ← Default colors
  
src/
  components/           ← React components (6 screens)
  context/              ← Theme & PenFriend contexts
  navigation/           ← Screen navigation setup
  utils/                ← Content & style loaders

web/
  index.html            ← Web entry point
  webpack.config.js     ← Web bundler config
```

## 🆕 Adding New Editions

See **ADD_NEW_EDITION.md** for a complete guide.

Quick steps:
1. Create folder: `content/2025-12/`
2. Add `config.json`, `theme.json`, and column files
3. Update `src/utils/contentLoader.ts` to include new month
4. Restart the app

**Important**: Always include the "Verses" column by Pearl as the first article. See **VERSES_COLUMN_GUIDE.md** for details.

## 🎯 Key Files

- **`global/config.json`** - Magazine name and tagline
- **`global/styles.json`** - Default colors and typography
- **`content/2025-11/config.json`** - November edition configuration
- **`src/utils/contentLoader.ts`** - Available months list
- **`src/components/`** - All UI screens

## 🛠️ Technologies

- React Native (with Web support)
- Material-UI (MUI)
- React Navigation
- TypeScript
- Webpack (for web)
- Context API (state management)

## 📱 Screens

1. **Home** - Landing page with introduction
2. **Cover** - Beautiful edition cover with theme
3. **Table of Contents** - Editor's note and article list
4. **Column Reader** - Full article view
5. **Archive** - Browse all editions

## 🎨 Customization

### Change Magazine Name
Edit `global/config.json`:
```json
{
  "magazineName": "Your Name",
  "tagline": "Your Tagline",
  "about": "Your description"
}
```

### Change Colors
Edit edition's `theme.json`:
```json
{
  "colors": {
    "primary": "#YourColor",
    "secondary": "#AccentColor",
    "accent": "#AnotherColor"
  }
}
```

### Add New Article
Create `content/2025-11/columns/your-article.json`:
```json
{
  "content": "# Your Title\n\n**By Author**\n\nYour content here..."
}
```

Add to `config.json` columns array.

## 📚 Documentation

- **README.md** - This file (overview & quick start)
- **ADD_NEW_EDITION.md** - Complete guide for adding monthly editions
- **VERSES_COLUMN_GUIDE.md** - Standards for the recurring Verses poetry column

## 🔗 URL Routing

All screens have unique URLs:
- Home: `/`
- Archive: `/archive`
- Edition Cover: `/edition/2025-11`
- Table of Contents: `/edition/2025-11/contents`
- Article: `/edition/2025-11/article/verses`

## 📄 License

This project is open source and available for use.

---

**Pages** - Where stories come alive, one page at a time. 📖✨
