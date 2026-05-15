# jagadeeshjetti.dev

Personal portfolio site. Built with Next.js 15, TypeScript, Tailwind CSS, and a Hashnode GraphQL integration for the blog.

Live → [jagadeeshjetti.dev](https://jagadeeshjetti.dev)

---

## Quick start

You need Node.js 20+ and pnpm. If you don't have pnpm: `npm install -g pnpm`

```bash
# 1. Install dependencies
pnpm install

# 2. Run the dev server
pnpm dev

# 3. Open http://localhost:3000
```

That's it. The site is running.

---

## What's in the box

```
app/
  page.tsx                    # Home
  layout.tsx                  # Global shell (nav + footer + fonts)
  globals.css                 # Theme, scrollbar, cmdk styles
  projects/
    page.tsx                  # Projects index
    [slug]/page.tsx           # Per-project case study
  blog/page.tsx               # Hashnode-synced blog list
  about/page.tsx              # About page
  sitemap.ts                  # Auto-generated sitemap
  robots.ts                   # Auto-generated robots.txt

components/
  sections/
    nav.tsx                   # Top nav with terminal-style brand
    footer.tsx                # Site footer with socials
    terminal-hero.tsx         # Animated `whoami` hero
    project-card.tsx          # Project card used in grids
  ui/
    section-heading.tsx       # Reusable "// marker" heading
    command-menu.tsx          # ⌘K command palette

data/
  site.ts                     # ⭐ ALL content lives here ⭐

lib/
  utils.ts                    # cn() helper + date formatter
  hashnode.ts                 # Hashnode GraphQL fetcher
```

---

## How to edit content

**99% of your edits happen in `data/site.ts`.** This file is the single source of truth for:

- Your name, email, socials, tagline
- The availability badge
- The terminal hero lines (whoami output)
- Skills list
- All projects (main + mini)
- The "Currently" list on the About page

Open `data/site.ts`, change what you need, save, and the dev server hot-reloads.

### To add a new project

Open `data/site.ts`, scroll to the `projects` array, and add a new object:

```ts
{
  slug: 'my-new-thing',                     // URL: /projects/my-new-thing
  name: 'My New Thing',
  tagline: 'One-line pitch for cards.',
  description: 'Longer description for the detail page.',
  status: 'live',                           // 'live' | 'wip' | 'archived'
  year: '2026',
  role: 'Solo developer',
  timeline: '3 weeks',
  liveUrl: 'https://...',                   // optional
  codeUrl: 'https://github.com/...',        // optional
  tech: ['React', 'Postgres', 'Prisma'],
  accent: 'from-purple-950 to-pink-900',    // tailwind gradient for the card banner
  problem: 'What needed solving.',
  built: ['Feature 1', 'Feature 2', 'Feature 3'],
  decisions: 'A hard call you made and why.',
  learned: 'What the project taught you.',
  nextTime: 'What you would do differently.',
}
```

That's the whole flow — save, and the project appears on the homepage, in the projects list, and at its own URL.

### To update the blog

Nothing to do. Posts are auto-fetched from `jagadeeshjetti.hashnode.dev` every hour. Publish on Hashnode, and it appears here.

If you change your Hashnode URL, update `hashnodeHost` in `data/site.ts`.

### To add your resume

Drop your resume as `public/resume.pdf`. The "Resume" button picks it up automatically. Delete `public/RESUME_PLACEHOLDER.txt` once done.

---

## Deploying

### One-time setup

1. Push this to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   gh repo create jagadeeshjetti.dev --public --push --source=.
   ```
   (If you don't have GitHub CLI, create the repo on github.com first, then `git remote add origin <url> && git push -u origin main`.)

2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Next.js. Click deploy. Done.

3. Your site is live at `jagadeeshjetti-dev.vercel.app`.

### Custom domain (optional)

1. Buy `jagadeeshjetti.dev` at [Porkbun](https://porkbun.com) or [Namecheap](https://namecheap.com) (~$12/yr).
2. In Vercel → your project → Settings → Domains → Add `jagadeeshjetti.dev`.
3. Vercel shows you DNS records. Paste them at your domain registrar.
4. Wait 5–30 minutes. Done.

### Ongoing

Every `git push` to `main` auto-deploys. Editing content:

```bash
# edit data/site.ts
git add data/site.ts
git commit -m "add new project"
git push
# → 60 seconds later, live on jagadeeshjetti.dev
```

---

## Tech stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript** — strict mode
- **Tailwind CSS** — custom theme in `tailwind.config.ts`
- **Framer Motion** — not used much yet; pre-installed for future scroll animations
- **lucide-react** — icons
- **cmdk** — ⌘K command menu
- **Hashnode GraphQL API** — blog sync (no API key needed, public endpoint)

---

## FAQ

**How do I change the accent color on project cards?**
Each project has an `accent` field — a Tailwind gradient like `'from-indigo-950 via-indigo-900 to-violet-900'`. Try any combination.

**Dark/light mode toggle?**
Yes — there's a sun/moon toggle in the nav. Theme is persisted to `localStorage` and falls back to the OS preference (`prefers-color-scheme`) on first visit. Colors are driven by CSS variables in `app/globals.css` under `:root` (light) and `:root.dark`, and every semantic color in `tailwind.config.ts` references them via `rgb(var(...) / <alpha-value>)`. Overlays use the `tint` token which is black in light mode and white in dark, so hover tints and dividers auto-invert. The terminal bubble in the hero stays dark in both themes by design.

**How do I customize the terminal command?**
Open `components/sections/terminal-hero.tsx`. The `COMMAND` constant is `'whoami'`. Change it to anything.

**The blog is empty?**
Check `data/site.ts` → `hashnodeHost` matches your actual Hashnode subdomain. If the Hashnode API is slow on first load, posts appear within a minute (revalidate interval is 1 hour).

**⌘K not working?**
Make sure you're on the page (click once anywhere), then press ⌘K on Mac or Ctrl+K on Windows/Linux.

---

## Credits

Design inspired by [siddz.com](https://siddz.com), [rinkitadhana.com](https://rinkitadhana.com), [nischal.site](https://nischal.site), and [jayvaidya.site](https://jayvaidya.site). All code original.

Built with Claude.
