# 📸 Photo Customization & Replacement Guide

All photos across the CSDS Welcome & Farewell website are centralized in:
`src/config/event.ts`

You can easily replace any photo with your own pictures using either of these two ways:

---

### Method 1: Drop Files into this folder (`public/images/`) (Recommended)

1. Copy your photos directly into `public/images/`.
2. Name them as suggested below (or keep your own names).
3. Update the matching path in `src/config/event.ts` (e.g., `hero: "/images/hero.jpg"`).

---

### Photo Slots & Recommended Dimensions

| Section | Slot Name in `src/config/event.ts` | Recommended Filename | Ideal Aspect Ratio / Size | What to Put Here |
|---|---|---|---|---|
| **Hero Background** | `EVENT_CONFIG.images.hero` | `/images/hero.jpg` | 1920x1080 (Landscape) | Stage, concert lights, crowd, or university venue |
| **About Section** | `EVENT_CONFIG.images.about` | `/images/about.jpg` | 900x700 (Landscape) | Department students, batch group photo, or celebration |
| **Registration Fee** | `EVENT_CONFIG.images.feeCard` | `/images/fee-group.jpg` | 1000x900 (Portrait/Square) | Senior & fresher group smiling together |
| **Highlights [01]** | `highlights[0].image` (Food) | `/images/highlight-food.jpg` | 800x600 (Landscape) | Chapli kebab, karahi, or dinner buffet |
| **Highlights [02]** | `highlights[1].image` (Music) | `/images/highlight-music.jpg` | 800x600 (Landscape) | Live concert band, rubab player, singers |
| **Highlights [03]** | `highlights[2].image` (Culture) | `/images/highlight-culture.jpg` | 800x600 (Landscape) | Attan dance circle, traditional turbans |
| **Highlights [04]** | `highlights[3].image` (Games) | `/images/highlight-games.jpg` | 800x600 (Landscape) | Stage games, laughing students, hosts |
| **Highlights [05]** | `highlights[4].image` (Awards) | `/images/highlight-awards.jpg` | 800x600 (Landscape) | Shield distribution, senior farewell trophies |
| **Highlights [06]** | `highlights[5].image` (Photo Booth) | `/images/highlight-booth.jpg` | 800x600 (Landscape) | Red carpet / 360 photo booth setup |
| **Detail Tabs: Feast** | `detailTabs.food[0..2].image` | `/images/dawat-1.jpg`, etc. | 600x400 (Landscape) | Namak Mandi Karahi, Chapli Kabab, Kahwa |
| **Detail Tabs: Music** | `detailTabs.music[0..2].image` | `/images/music-1.jpg`, etc. | 600x400 (Landscape) | Rubab strings, Indie rock, Acoustic |
| **Detail Tabs: Activities**| `detailTabs.activities[0..2].image` | `/images/act-1.jpg`, etc. | 600x400 (Landscape) | Department roast, Titles, Attan |
| **Schedule Posters** | `schedulePosters[0..2].image` | `/images/poster-1.jpg`, etc. | 800x1200 (Tall / 3:4) | Poster art or vertical celebration pictures |

---

### Method 2: Use Direct Web URLs or Google Drive / Cloudinary Links
You can also paste any public image URL directly into `src/config/event.ts`:
```ts
hero: "https://your-domain.com/my-photo.jpg",
```
Next.js is configured in `next.config.ts` to allow local images and remote images from trusted hosts.
