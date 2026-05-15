const TECH_ICON_SLUGS: Record<string, string> = {
  React: 'react',
  'Next.js': 'nextdotjs',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  'Redux Toolkit': 'redux',
  Redux: 'redux',
  'Tailwind CSS': 'tailwindcss',
  'Node.js': 'nodedotjs',
  'Express.js': 'express',
  Express: 'express',
  MongoDB: 'mongodb',
  PostgreSQL: 'postgresql',
  Postgres: 'postgresql',
  Prisma: 'prisma',
  'Socket.io': 'socketdotio',
  JWT: 'jsonwebtokens',
  'JWT Auth': 'jsonwebtokens',
  'OpenAI API': 'openai',
  OpenAI: 'openai',
  Zod: 'zod',
  'React Router': 'reactrouter',
  Vercel: 'vercel',
  Git: 'git',
  GitHub: 'github',
  Postman: 'postman',
};

// Brands whose official logo is near-black — invisible on dark-mode cream.
// Inverted in dark mode so they render white.
const DARK_BRAND_SLUGS = new Set([
  'nextdotjs',
  'express',
  'jsonwebtokens',
  'socketdotio',
  'vercel',
  'github',
  'openai',
]);

export function TechIcon({
  name,
  className = 'h-3 w-3',
}: {
  name: string;
  className?: string;
}) {
  const slug = TECH_ICON_SLUGS[name];
  if (!slug) return null;
  const darkInvert = DARK_BRAND_SLUGS.has(slug) ? 'dark:invert' : '';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      className={`inline-block shrink-0 ${className} ${darkInvert}`}
      loading="lazy"
    />
  );
}
