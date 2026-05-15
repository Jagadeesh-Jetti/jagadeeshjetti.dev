'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Mail,
  Github,
  Linkedin,
  Home,
  FolderGit2,
  User,
  PenSquare,
} from 'lucide-react';
import { site, projects } from '@/data/site';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const go = (href: string, external = false) => {
    setOpen(false);
    if (external) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[560px]">
        <Command label="Command menu" shouldFilter>
          <Command.Input placeholder="Search pages, projects, socials..." autoFocus />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Pages">
              <Command.Item onSelect={() => go('/')}>
                <Home className="h-3.5 w-3.5" /> Home
              </Command.Item>
              <Command.Item onSelect={() => go('/projects')}>
                <FolderGit2 className="h-3.5 w-3.5" /> Projects
              </Command.Item>
              <Command.Item onSelect={() => go('/blog')}>
                <PenSquare className="h-3.5 w-3.5" /> Blog
              </Command.Item>
              <Command.Item onSelect={() => go('/about')}>
                <User className="h-3.5 w-3.5" /> About
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects">
              {projects.map((p) => (
                <Command.Item
                  key={p.slug}
                  onSelect={() => go(`/projects/${p.slug}`)}
                >
                  <FolderGit2 className="h-3.5 w-3.5" /> {p.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Links">
              <Command.Item onSelect={() => go(site.resumeUrl, true)}>
                <FileText className="h-3.5 w-3.5" /> Resume
              </Command.Item>
              <Command.Item onSelect={() => go(site.socials.email)}>
                <Mail className="h-3.5 w-3.5" /> Email
              </Command.Item>
              <Command.Item onSelect={() => go(site.socials.github, true)}>
                <Github className="h-3.5 w-3.5" /> GitHub
              </Command.Item>
              <Command.Item onSelect={() => go(site.socials.linkedin, true)}>
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </Command.Item>
              <Command.Item onSelect={() => go(site.socials.hashnode, true)}>
                <PenSquare className="h-3.5 w-3.5" /> Hashnode
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
