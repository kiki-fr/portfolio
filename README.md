# Karen Iredy — Creative Studio

The website of Karen Iredy: creative direction for brands, at the intersection of
**brand intelligence + creative direction + AI-assisted visual creation**.

Built with **React + TypeScript + Vite**, **Framer Motion** for motion and **Lucide** icons.
Styling is plain CSS with design tokens. Tailwind was left out on purpose, because the
editorial, asymmetric layouts are easier to art-direct in hand-written CSS.

---

## 1. Run the project

Requirements: [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # once
npm run dev      # local dev server → http://localhost:5173
npm run build    # type-check + production build into /dist
npm run preview  # preview the production build
```

---

## 2. Project structure

```
index.html              SEO, Open Graph, fonts, structured data
public/                 static files served as-is (favicon, images, og-image)
src/
  main.tsx              entry point
  App.tsx               page order (sections are assembled here)
  styles/
    tokens.css          ← colours, fonts, type scale, spacing, motion (design tokens)
    global.css          base styles, buttons, glitch, reduced-motion rules
  data/                 ← ALL CONTENT LIVES HERE
    site.ts             name, email, socials, nav, budgets, project types
    art.ts              image slots for hero, pillars, direction, about, contact
    services.ts         Think/Direct/Create, Intelligence, Direction, Studio, Method, Offers
    projects.ts         portfolio (Selected Work)
    lab.ts              Creative Lab items
  components/           reusable pieces (ArtSlot, Header, Footer, Cursor, Reveal, Marquee…)
  sections/             one file (+ .css) per section of the page
  hooks/                media queries, active-section tracking
  lib/events.ts         "Enquire" buttons → pre-fill the contact form
```

Page order: Hero → Intro → Think/Direct/Create → Intelligence → Creative Direction →
AI Creative Studio → Selected Work → Creative Lab → About → Method → Services → Contact → Footer.

---

## 3. Replace images

Every image is an **image slot**. While a slot has no `src`, it renders an art-directed
generative placeholder (chrome, holographic foil, mirror shards…). These are clearly
placeholders, not finished imagery.

1. Put your image in `public/images/`, e.g. `public/images/hero-chrome.jpg`.
2. Find the slot in `src/data/` and add `src`:

```ts
// src/data/art.ts
chrome: { variant: 'chrome', alt: 'Liquid silver bag, campaign still', src: 'images/hero-chrome.jpg' },
```

- Always write a meaningful `alt` text.
- Export JPG/WebP at about 2000px on the long side, under 400 KB if possible.
- Images are lazy-loaded automatically (except the hero).

Where the slots are:

| Section             | File                                   |
| ------------------- | -------------------------------------- |
| Hero, pillars, Direction, About, Contact | `src/data/art.ts` |
| AI Studio gallery   | `studioGallery` in `src/data/services.ts` |
| Portfolio           | `hero` / `gallery` in `src/data/projects.ts` |
| Lab                 | `src/data/lab.ts`                      |

---

## 4. Add a portfolio project

All current entries in `src/data/projects.ts` are **placeholders** (`status: 'placeholder'`).
They are not real projects. Replace them, or add a new object to the `projects` array:

```ts
{
  slug: 'maison-x-launch',              // used in the URL: #work/maison-x-launch
  title: 'Maison X — Launch',
  category: 'Campaign',                 // one of the `categories`
  year: '2025',
  status: 'client',                     // 'client' | 'concept' | 'placeholder'
  description: 'One line that makes people want to open it.',
  hero: { variant: 'holo', alt: '…', src: 'images/work/maison-x/hero.jpg' },
  gallery: [
    { variant: 'mono', alt: '…', src: 'images/work/maison-x/01.jpg' },
    { variant: 'mono', alt: '…', src: 'images/work/maison-x/02.jpg' },
  ],
  context: '…',
  challenge: '…',
  solution: '…',
  result: '…',                          // ONLY real, verified outcomes — otherwise omit
},
```

- `status: 'concept'` labels the project as *self-initiated*, so it is never confused with client work.
- Leave `result` out unless it is real and verified. The site then says so honestly.

---

## 5. Edit text (5 languages)

The site opens with a **language portal** (English, Español, Nederlands, Deutsch, Français).
The choice is remembered in the visitor's browser, and the header's language button reopens the portal.
To link straight to one language, add `?lang=es` (or `en`, `nl`, `de`, `fr`) to the URL.

**All visible text lives in `src/i18n/`**, one file per language: `en.ts`, `es.ts`, `nl.ts`, `de.ts`, `fr.ts`.
Every file has exactly the same structure. To change a sentence, edit it in each language file.
TypeScript reports an error if a language is missing a key.

- **Email, socials, form endpoint:** `src/data/site.ts`
- **Images and layout data:** `src/data/` (`art.ts`, `services.ts`, `projects.ts`, `lab.ts`)
- **Page order and section numbers:** `src/data/sections.ts`
- **SEO title / description:** `meta` in each language file, with the defaults in `index.html`
- **Colours, fonts, sizes:** `src/styles/tokens.css`

### Still to fill in (TODO)

- [ ] `site.email` in `src/data/site.ts`. It is empty, so no email is shown.
- [ ] `site.socials` links.
- [ ] Real portfolio projects and images.
- [ ] `public/og-image.png` (1200×630) for social sharing previews.
- [ ] Real domain in `index.html` (`canonical` and `og:url`, currently `example.com`).

---

## 6. Connect the contact form

The form is fully built, with validation, a bot honeypot, a loading state, a success state
and an error state. **It does not send anything until an endpoint is configured.** Until then
it says clearly that it is in preview mode, and it never pretends a message was sent.

Recommended: **[Formspree](https://formspree.io)** (free tier, no backend needed).

1. Create a form on Formspree and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
3. Restart `npm run dev`, or set the same variable in your hosting provider's settings and rebuild.

The form POSTs JSON (`name, email, company, type, budget, message, _subject`) with
`Accept: application/json`. Any service with the same contract also works, such as Getform,
Basin or your own serverless function.

**Email fallback:** once `site.email` is set, a direct email link appears, and if sending
fails the user can open their email app with the message pre-filled.

---

## 7. Deploy

The build is a static site in `/dist`, with relative asset paths (`base: './'`).

- **Netlify / Vercel:** import the GitHub repo. Build command `npm run build`, output `dist`.
  Add `VITE_FORM_ENDPOINT` in the environment variables.
- **GitHub Pages:** the repo must be public, or you need a paid plan. Build, then publish `dist`
  (for example with the `peaceiris/actions-gh-pages` action, or Settings → Pages → GitHub Actions).
- **Custom domain:** point it at the host, then update the URLs in `index.html`.

---

## Accessibility and motion

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus states.
- All motion respects `prefers-reduced-motion`. The custom cursor, parallax, glitch and
  horizontal scroll switch off and fall back to static or native behaviour.
- The custom cursor only appears on devices with a fine pointer (never on touch).
- Mobile has its own layouts: full-screen menu, stacked collages, a native swipe gallery
  and a simplified Method section.
