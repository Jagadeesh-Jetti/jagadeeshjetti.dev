// Edit this file to update your portfolio content.
// Everything on the site reads from here.

export const site = {
  name: 'Jagadeesh Jetti',
  shortName: 'Jagadeesh',
  title: 'Jagadeesh Jetti — Full-Stack Developer',
  description:
    'Full-stack developer from Hyderabad with 2+ years building products end-to-end across MERN, TypeScript, and Postgres.',
  url: 'https://jagadeeshjetti.dev',
  location: 'Hyderabad, India',
  email: 'jagadeeshjetti007@gmail.com',
  resumeUrl: '/resume.pdf', // drop your resume PDF in /public/resume.pdf
  available: true,
  availabilityText: 'Open to full-time roles · remote or Hyderabad',
  socials: {
    github: 'https://github.com/Jagadeesh-Jetti',
    linkedin: 'https://www.linkedin.com/in/jagadeeshjetti',
    hashnode: 'https://jagadeeshjetti.hashnode.dev',
    email: 'mailto:jagadeeshjetti007@gmail.com',
  },
  // Hashnode host used to fetch posts via public GraphQL API
  hashnodeHost: 'jagadeeshjetti.hashnode.dev',
};

export const intro = {
  headline: 'Full-stack developer from Hyderabad.',
  // Used inside the terminal `whoami` output
  lines: [
    'Hey, I\'m Jagadeesh Jetti — a full-stack developer with 2+ years building products from Hyderabad.',
    'I build for the web across three angles:',
  ],
  roles: ['frontend', 'full-stack', 'product'],
  tagline: 'Shipping production full-stack apps — most recent: Sportify and FocusFlow.',
};

export const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Redux Toolkit',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'PostgreSQL',
  'Prisma',
  'Socket.io',
  'JWT Auth',
  'REST APIs',
  'Git',
  'GitHub',
  'Postman',
  'Vercel',
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: 'live' | 'wip' | 'archived';
  year: string;
  role: string;
  timeline: string;
  liveUrl?: string;
  codeUrl?: string;
  tech: string[];
  accent: string; // tailwind gradient classes for preview
  problem: string;
  built: string[];
  decisions: string;
  learned: string;
  nextTime: string;
};

export const projects: Project[] = [
  {
    slug: 'focusflow',
    name: 'FocusFlow',
    tagline: 'AI productivity planner — set goals, break them into milestones, ship them.',
    description:
      'An AI-powered productivity tool that turns long-term goals into actionable milestones, with a clean dashboard for daily tracking and OpenAI-generated suggestions when planning gets stuck.',
    status: 'live',
    year: '2025',
    role: 'Solo developer',
    timeline: '6 weeks',
    liveUrl: 'https://focus-flow-theta-henna.vercel.app',
    codeUrl: 'https://github.com/Jagadeesh-Jetti/FocusFlow',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'OpenAI API'],
    accent: 'from-indigo-100 via-indigo-50 to-violet-100 dark:from-indigo-950 dark:via-indigo-900 dark:to-violet-900',
    problem:
      'Productivity apps either overwhelm you with features or reduce goals to single-line todos. There was no middle ground where a long-term goal could live with its milestones and still feel approachable on a Monday morning.',
    built: [
      'Goal-setting flow with deadlines, descriptions, and auto-generated milestone suggestions',
      'Redux-powered dashboard tracking daily plans, completed tasks, and goal progress',
      'JWT-based auth with signup, login, and protected routes',
      'Responsive mobile-first UI in Tailwind',
    ],
    decisions:
      'Chose Redux Toolkit over Context API because goal/milestone updates needed to sync across several unrelated components (dashboard, sidebar, timeline). Context would have caused re-render storms. For the AI suggestions I used OpenAI\'s completion API server-side so the key never hits the client.',
    learned:
      'Redux Toolkit made state predictable but the real win was separating server state (goals fetched from Mongo) from UI state (which modal is open) — mixing them was my first instinct and it made debugging painful.',
    nextTime:
      'I\'d reach for TanStack Query for server state from day one, and move auth to httpOnly cookies instead of localStorage for the JWT.',
  },
  {
    slug: 'sportify',
    name: 'Sportify',
    tagline: 'Real-time sports event coordinator — live scores, organizer dashboard, instant participant sync.',
    description:
      'A platform for organizing and following local sports events. Live score broadcasts via Socket.io, an organizer dashboard for event setup, and a TypeScript-first backend with Prisma and PostgreSQL.',
    status: 'live',
    year: '2025',
    role: 'Solo developer',
    timeline: '10 weeks',
    // TODO: paste live URL once deployed
    // liveUrl: 'https://...',
    codeUrl: 'https://github.com/Jagadeesh-Jetti/Sportfiy-v1',
    tech: ['TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Socket.io', 'Tailwind CSS', 'React'],
    accent: 'from-slate-200 via-blue-100 to-blue-200 dark:from-slate-900 dark:via-blue-950 dark:to-blue-900',
    problem:
      'Local sports events are coordinated in WhatsApp groups — scores get lost, schedules drift, and new participants can\'t catch up. Organizers needed a single source of truth.',
    built: [
      'Prisma schema modeling events, teams, participants, and score updates',
      'Socket.io layer for live score broadcasts — no polling, no refresh needed',
      'TypeScript-first backend with Zod validation on every route',
      'Organizer dashboard for event setup and participant management',
    ],
    decisions:
      'Picked PostgreSQL over Mongo this time because event relationships (event → teams → players → scores) are inherently relational. Prisma gave me type-safe queries end-to-end with TypeScript, which caught several schema drift bugs at compile time.',
    learned:
      'Moving from JavaScript + Mongoose to TypeScript + Prisma was a much bigger jump than I expected — the types forced me to think through edge cases I\'d been hand-waving over in JS.',
    nextTime:
      'I\'d set up Socket.io rooms per-event from day one instead of broadcasting globally. Also want to explore using Postgres LISTEN/NOTIFY for fanout before reaching for a separate pub/sub.',
  },
  {
    slug: 'justyle',
    name: 'Justyle',
    tagline: 'Fashion e-commerce app — cart, wishlist, filters, auth, checkout.',
    description:
      'A fully responsive lifestyle and fashion e-commerce frontend with product listings, filters, wishlist, cart, and a basic checkout flow.',
    status: 'live',
    year: '2024',
    role: 'Solo developer',
    timeline: '4 weeks',
    liveUrl: 'https://justyle.netlify.app',
    codeUrl: 'https://github.com/Jagadeesh-Jetti/justyle',
    tech: ['React', 'React Router', 'Context API', 'CSS Modules', 'MockBee'],
    accent: 'from-amber-100 via-amber-50 to-orange-100 dark:from-amber-950 dark:via-amber-900 dark:to-orange-900',
    problem:
      'Wanted to learn real e-commerce architecture without getting stuck on backend plumbing — cart state, filtering logic, and checkout flow are where the interesting product work lives.',
    built: [
      'Product listing with multi-filter (price, category, rating) and sort',
      'Product detail pages with image gallery and variant selection',
      'Wishlist and cart powered by Context + Reducer',
      'Checkout flow with address management and order summary',
      'Auth integration against MockBee\'s mock API service',
    ],
    decisions:
      'Stuck with Context + useReducer instead of Redux for this one — the state is cleanly split (cart, wishlist, auth) and the reducer pattern is enough when actions don\'t cross domains.',
    learned:
      'Filtering and sorting shouldn\'t live on every list component — I refactored halfway through into a single `useProductFilters` hook and the code got way cleaner.',
    nextTime:
      'Replace MockBee with a real Node + Mongo backend so the auth flow is actually meaningful, and add URL-synced filter state so shared links preserve what the user was looking at.',
  },
  {
    slug: 'bondify',
    name: 'Bondify',
    tagline: 'Social feed app — posts, likes, comments, profiles.',
    description:
      'An Instagram-style social media frontend with a global feed, post creation, engagement, and profile management.',
    status: 'live',
    year: '2024',
    role: 'Solo developer',
    timeline: '3 weeks',
    liveUrl: 'https://bondify-u.netlify.app',
    codeUrl: 'https://github.com/Jagadeesh-Jetti/Bondify',
    tech: ['React', 'React Router', 'Context API', 'Tailwind CSS', 'MockBee'],
    accent: 'from-teal-100 via-teal-50 to-cyan-100 dark:from-teal-950 dark:via-teal-900 dark:to-cyan-900',
    problem:
      'Wanted to tackle the social media pattern end-to-end — feed composition, optimistic updates on likes, comment threading — which is more nuanced than a typical CRUD app.',
    built: [
      'Global feed with post creation (image + caption)',
      'Likes and comments with optimistic UI updates',
      'User profiles with follow/unfollow and profile editing',
      'Authentication and protected routes',
      'Responsive mobile-first layout',
    ],
    decisions:
      'Optimistic UI for likes was the key UX call — the spinner-and-wait pattern made the app feel broken. I update the like state locally, fire the request, and roll back only on failure.',
    learned:
      'Building "engagement" features like likes and comments taught me how much of app feel is about latency perception, not actual speed. Optimistic updates made a mock API feel like a real product.',
    nextTime:
      'Add image upload to a real CDN (Cloudinary or S3), and swap Context for Zustand — the prop drilling for feed state got ugly.',
  },
];

export const miniProjects = [
  {
    name: 'Inventoma',
    description: 'Full-stack inventory dashboard with stock CRUD, categories, and low-stock alerts.',
    tech: ['MERN', 'JWT'],
    url: 'https://inventoma.vercel.app',
    codeUrl: 'https://github.com/Jagadeesh-Jetti/Inventoma',
  },
  {
    name: 'Fit Tracker',
    description: 'Backend API for workout tracking with JWT auth and user-scoped logs.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    codeUrl: 'https://github.com/Jagadeesh-Jetti/Fit_Tracker',
  },
];

export const now = {
  // Appears in the /about page "currently" section
  items: [
    'Shipping iterations on FocusFlow and Sportify',
    'Studying system design, distributed systems, and scalable backend patterns',
    'Going deeper on TypeScript, Prisma, and PostgreSQL',
    'Writing on Hashnode about full-stack patterns I learn the hard way',
    'Open to full-time mid-level full-stack roles — remote or Hyderabad-based',
  ],
};
