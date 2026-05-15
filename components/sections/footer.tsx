import Link from 'next/link';
import { site } from '@/data/site';
import { Github, Linkedin, Mail, PenSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-tint/[0.06]">
      <div className="mx-auto max-w-[640px] px-6 py-8">
        <div className="flex flex-col items-start justify-between gap-4 text-[12px] text-subtle sm:flex-row sm:items-center">
          <div className="font-mono">
            © {new Date().getFullYear()} {site.name} · {site.location}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={site.socials.github}
              target="_blank"
              className="flex items-center gap-1.5 transition-colors hover:text-text"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
              <span>github</span>
            </Link>
            <Link
              href={site.socials.linkedin}
              target="_blank"
              className="flex items-center gap-1.5 transition-colors hover:text-text"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>linkedin</span>
            </Link>
            <Link
              href={site.socials.hashnode}
              target="_blank"
              className="flex items-center gap-1.5 transition-colors hover:text-text"
              aria-label="Hashnode"
            >
              <PenSquare className="h-3.5 w-3.5" />
              <span>hashnode</span>
            </Link>
            <Link
              href={site.socials.email}
              className="flex items-center gap-1.5 transition-colors hover:text-text"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
