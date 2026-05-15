import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/site';
import { cn } from '@/lib/utils';
import { TechIcon } from '@/lib/tech-icons';

const STATUS_STYLES = {
  live: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
  wip: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400',
  archived: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-700 dark:text-zinc-400',
};
const STATUS_LABEL = { live: '● Live', wip: '● WIP', archived: '○ Archived' };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="pb-20 pt-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-3 w-3" />
        back to projects
      </Link>

      <div className="mt-6 flex items-center gap-2.5">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[11px]',
            STATUS_STYLES[project.status]
          )}
        >
          {STATUS_LABEL[project.status]}
        </span>
        <span className="font-mono text-[11px] text-subtle">
          {project.year} · {project.role}
        </span>
      </div>

      <h1 className="mt-3 text-[34px] font-medium tracking-tight text-text-bright">
        {project.name}
      </h1>
      <p className="mt-2.5 max-w-[580px] text-[15px] leading-[1.7] text-muted">
        {project.tagline}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-text-bright px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Visit live
          </Link>
        )}
        {project.codeUrl && (
          <Link
            href={project.codeUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-tint/15 px-4 py-2 text-[13px] transition-colors hover:border-tint/30 hover:text-text-bright"
          >
            <Github className="h-3.5 w-3.5" /> View source
          </Link>
        )}
      </div>

      {/* Hero banner */}
      <div
        className={cn(
          'mt-8 flex aspect-[16/9] items-center justify-center rounded-xl border border-tint/[0.08] bg-gradient-to-br',
          project.accent
        )}
      >
        <span className="font-mono text-3xl font-medium text-zinc-900/70 dark:text-white/80">
          {project.name}
        </span>
      </div>

      {/* Meta grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-tint/[0.06] bg-surface p-5 sm:grid-cols-4">
        <MetaItem label="Role" value={project.role} />
        <MetaItem label="Timeline" value={project.timeline} />
        <MetaItem label="Year" value={project.year} />
        <MetaItem
          label="Status"
          value={STATUS_LABEL[project.status].replace('●', '').replace('○', '').trim()}
          valueClassName={STATUS_STYLES[project.status].split(' ').find((c) => c.startsWith('text-'))}
        />
      </div>

      {/* Body sections */}
      <section className="mt-10">
        <h2 className="mb-3 text-[18px] font-medium text-text-bright">The problem</h2>
        <p className="text-[14px] leading-[1.75] text-muted">{project.problem}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-[18px] font-medium text-text-bright">What I built</h2>
        <p className="mb-3 text-[14px] leading-[1.75] text-muted">{project.description}</p>
        <ul className="space-y-2 pl-5 text-[14px] leading-[1.75] text-muted [list-style-type:disc] marker:text-subtle">
          {project.built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-[18px] font-medium text-text-bright">
          Tech decisions worth mentioning
        </h2>
        <p className="text-[14px] leading-[1.75] text-muted">{project.decisions}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-[18px] font-medium text-text-bright">What I learned</h2>
        <p className="text-[14px] leading-[1.75] text-muted">{project.learned}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-[18px] font-medium text-text-bright">
          What I'd do differently
        </h2>
        <p className="text-[14px] leading-[1.75] text-muted">{project.nextTime}</p>
      </section>

      {/* Tech stack */}
      <section className="mt-10 border-t border-tint/[0.08] pt-6">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-subtle">
          // stack
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[11px] text-muted bg-tint/[0.04]"
            >
              <TechIcon name={t} className="h-3 w-3" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Next / prev */}
      <ProjectNav currentSlug={project.slug} />
    </article>
  );
}

function MetaItem({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
        {label}
      </div>
      <div className={cn('text-[13px] text-text', valueClassName)}>{value}</div>
    </div>
  );
}

function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const currentIdx = projects.findIndex((p) => p.slug === currentSlug);
  const prev = projects[currentIdx - 1];
  const next = projects[currentIdx + 1];

  return (
    <div className="mt-16 grid grid-cols-1 gap-3 border-t border-tint/[0.08] pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="group rounded-xl border border-tint/[0.08] p-4 transition-colors hover:border-tint/[0.15] hover:bg-tint/[0.02]"
        >
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-subtle">
            ← Previous
          </div>
          <div className="text-[14px] font-medium text-text-bright">{prev.name}</div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="group rounded-xl border border-tint/[0.08] p-4 text-right transition-colors hover:border-tint/[0.15] hover:bg-tint/[0.02]"
        >
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-subtle">
            Next →
          </div>
          <div className="text-[14px] font-medium text-text-bright">{next.name}</div>
        </Link>
      )}
    </div>
  );
}
