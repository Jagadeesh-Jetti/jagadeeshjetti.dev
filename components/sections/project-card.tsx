import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/site';
import { cn } from '@/lib/utils';
import { TechIcon } from '@/lib/tech-icons';

const STATUS_STYLES = {
  live: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
  wip: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400',
  archived: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-700 dark:text-zinc-400',
};

const STATUS_LABEL = { live: '● Live', wip: '● WIP', archived: '○ Archived' };

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-tint/[0.08] bg-surface transition-all hover:border-tint/[0.15]"
    >
      <div
        className={cn(
          'relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br',
          project.accent
        )}
      >
        <span className="font-mono text-xl font-medium text-zinc-900/70 dark:text-white/80">
          {project.name}
        </span>
        <span
          className={cn(
            'absolute right-2.5 top-2.5 rounded-full border px-2 py-0.5 text-[10px]',
            STATUS_STYLES[project.status]
          )}
        >
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-[14px] font-medium text-text-bright">{project.name}</h3>
          <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
        </div>
        <p className="mb-2.5 text-[12px] leading-[1.5] text-muted">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] text-muted bg-tint/[0.04]"
            >
              <TechIcon name={t} className="h-2.5 w-2.5" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
