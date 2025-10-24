# 📝 Verses Column - Recurring Monthly Feature

## Overview

"Verses" is a special recurring column by **Pearl** that appears in every edition of Pages magazine. It features original poetry and maintains consistent styling across all editions.

---

## 🎨 Standard Verses Styling

### **Always Use These Settings:**

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

### **Color Palette:**
- **Primary Color**: `#7DD3FC` (Sky Blue - for gradient background)
- **Secondary Color**: `#FED7E2` (Light Pink - for gradient background)
- **Header Text**: `#0C4A6E` (Deep Blue - strong contrast on light gradient)
- **Background (Light)**: `#F0F9FF` (Ultra Light Blue - almost white with blue tint)
- **Background (Dark)**: `#082f49` (Very Dark Blue - deep night sky)
- **Content Text (Light)**: `#0C4A6E` (Deep Blue)
- **Content Text (Dark)**: `#BAE6FD` (Light Sky Blue - enhanced brightness)

### **Typography:**
- **Content Font**: `Calibri` (clean, readable sans-serif)
- **Content Style**: `italic` (elegant, flowing, poetic feel)
- **Header Font**: `Dancing Script` (artistic script font for the title)
- **Header Style**: `artistic` (animated gradient background)
- **Text Shadow**: Enhanced for visibility on gradient backgrounds

---

## 📍 Positioning

**Verses should always be the FIRST column** in every edition:
- `"order": 1` - This ensures poetry opens each issue
- Creates a contemplative start to the reading experience
- Establishes the literary tone of the magazine

---

## 📋 Implementation Checklist

When adding a new edition with Verses:

- [ ] Set `"order": 1` in config.json
- [ ] Use exact color values (#E0F2FE, #FED7E2, #0C4A6E)
- [ ] Set `"headerStyle": "artistic"`
- [ ] Set `"fontFamily": "Crimson Text"`
- [ ] Author is always "Pearl"
- [ ] Excerpt is always "A jumbled me in these lines"
- [ ] Create content file: `content/YYYY-MM/columns/verses.json`

---

## 🎯 Why These Choices?

### **Light Blue & Pink:**
- Soft, poetic, dreamy aesthetic
- Light blue background in light mode, deep blue in dark mode
- High contrast between background and text
- Represents the delicate nature of poetry

### **Calibri Italic Font:**
- Clean, modern sans-serif font
- Italic style adds elegance and flow
- Highly readable while maintaining poetic feel
- Perfect for poetry - not too decorative, not too plain
- Professional yet artistic appearance

### **Artistic Header Style:**
- Animated gradient creates visual interest
- Sets Verses apart from other columns
- Reflects the creative, flowing nature of poetry

### **Always First:**
- Poetry sets the emotional tone
- Encourages slower, more mindful reading
- Honors the literary heritage of the magazine

---

## 📄 Content Format

Verses content follows this structure:

```markdown
# Verses

**By Pearl**

*Poet and observer of life's quiet moments*

---

## [Poem Title 1]

[Poem content]

---

## [Poem Title 2]

[Poem content]

---

*A jumbled me in these lines*
```

---

## 🔄 Consistency Across Editions

**DO:**
✅ Keep colors exactly the same  
✅ Always use "Calibri" font with "italic" style  
✅ Position as first column (order: 1)  
✅ Use "artistic" header style  
✅ Keep author as "Pearl"  
✅ Maintain excerpt: "A jumbled me in these lines"
✅ Include both light and dark mode background colors
✅ Include both light and dark mode text colors

**DON'T:**
❌ Change the color palette  
❌ Move Verses to a different position  
❌ Use a different font  
❌ Change the header style  
❌ Modify the author information
❌ Remove the themed backgrounds

---

## 🆕 Adding Verses to a New Edition

### **Step 1: Add to config.json**
```json
{
  "columns": [
    {
      "id": "verses",
      "title": "Verses",
      "author": {
        "name": "Pearl",
        "bio": "Poet and observer of life's quiet moments"
      },
      "excerpt": "A jumbled me in these lines",
      "order": 1,
      "theme": {
        "primaryColor": "#E0F2FE",
        "secondaryColor": "#FED7E2",
        "headerStyle": "artistic",
        "textColor": "#0C4A6E",
        "fontFamily": "Crimson Text"
      }
    }
    // ... other columns with order: 2, 3, 4, etc.
  ]
}
```

### **Step 2: Create content file**
`content/YYYY-MM/columns/verses.json`
```json
{
  "content": "# Verses\n\n**By Pearl**\n\n*Poet and observer of life's quiet moments*\n\n---\n\n## [Your poem titles and content here]"
}
```

### **Step 3: Write poetry**
- Keep to the theme of the edition
- Multiple short poems work well
- Include section breaks (---) between poems
- End with signature: "*A jumbled me in these lines*"

---

## 💡 Example Themes by Month

- **January**: New Year, resolutions, fresh starts
- **February**: Love, connections, warmth
- **March**: Growth, spring, renewal
- **April**: Rain, creativity, possibility
- **May**: Blossoming, joy, light
- **June**: Summer, freedom, adventure
- **July**: Heat, passion, intensity
- **August**: Reflection, late summer, transition
- **September**: Back to school, routine, autumn
- **October**: Change, harvest, transformation
- **November**: Beginnings, gratitude, darkness
- **December**: Endings, winter, reflection

---

## 🎨 Visual Identity

The Verses column creates a unique visual experience:

1. **Soft color scheme** - Calming, inviting
2. **Poetic typography** - Elegant serif font
3. **Animated header** - Subtle movement, artistic
4. **First position** - Sets contemplative tone
5. **Consistent branding** - Instantly recognizable

---

## ✅ Final Notes

**Verses is the soul of Pages magazine.** By maintaining consistent styling and positioning, we honor the poetic tradition while giving readers a reliable, beautiful reading experience each month.

The light blue and pink palette, combined with Crimson Text font, creates a signature look that readers will come to expect and appreciate. This consistency builds brand recognition and trust.

**When in doubt, copy the November 2025 Verses configuration exactly.**

---

*"A jumbled me in these lines" - Pearl's signature reminds us that poetry is personal, vulnerable, and always evolving.*

