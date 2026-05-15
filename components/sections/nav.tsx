'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { site } from '@/data/site';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const links = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
  { href: '/about', label: 'about' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-tint/[0.06] bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[640px] items-center justify-between px-6 py-3.5 text-[13px]">
        <Link
          href="/"
          data-nav-brand
          className="flex items-center gap-2 font-mono text-muted"
        >
          <span className="text-subtle">~/</span>
          <span className="text-text">{site.shortName.toLowerCase()}</span>
          <span className="animate-blink text-green-700 dark:text-green-500">_</span>
        </Link>
        <div className="flex items-center gap-4 text-muted">
          {links.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-text-bright',
                  isActive && 'text-text'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <kbd className="hidden items-center rounded-md border border-tint/15 px-2 py-0.5 font-mono text-[11px] text-muted sm:inline-flex">
            ⌘K
          </kbd>
        </div>
      </div>
    </nav>
  );
}
