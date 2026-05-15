import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { site, skills, projects, miniProjects } from '@/data/site';
import { TerminalHero } from '@/components/sections/terminal-hero';
import { ProjectCard } from '@/components/sections/project-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { getBlogPosts } from '@/lib/hashnode';
import { formatDate } from '@/lib/utils';
import { TechIcon } from '@/lib/tech-icons';

export default async function HomePage() {
  const posts = await getBlogPosts(4);

  return (
    <div className="pb-20 pt-12">
      {/* Availability pill */}
      {site.available && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1 text-[12px] text-emerald-700 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {site.availabilityText}
        </div>
      )}

      <TerminalHero />

      {/* CTAs */}
      <div className="mt-7 flex flex-wrap gap-2.5">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-lg bg-text-bright px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
        >
          View projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href={site.resumeUrl}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-tint/15 px-4 py-2 text-[13px] transition-colors hover:border-tint/30 hover:text-text-bright"
        >
          Resume
        </Link>
        <Link
          href={site.socials.email}
          className="inline-flex items-center gap-1.5 rounded-lg border border-tint/15 px-4 py-2 text-[13px] transition-colors hover:border-tint/30 hover:text-text-bright"
        >
          <Mail className="h-3.5 w-3.5" /> Email
        </Link>
      </div>

      {/* Skills */}
      <section className="mt-16">
        <SectionHeading
          title="Skills & technologies"
          marker="toolkit"
          description="The stack I reach for when building things."
        />
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-tint/[0.08] bg-tint/[0.03] px-3 py-1.5 text-[12px] text-text transition-all hover:-translate-y-0.5 hover:border-tint/20 hover:bg-tint/[0.08] hover:text-text-bright"
            >
              <TechIcon name={skill} className="h-3 w-3" />
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Selected projects */}
      <section className="mt-16">
        <SectionHeading
          title="Selected projects"
          marker={`0${projects.length}`}
          description="Things I've built, shipped, and learned from."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Small things */}
      <section className="mt-12 border-t border-tint/[0.08] pt-10">
        <SectionHeading
          title="Small things"
          marker="more builds"
          description="Tools and utilities — bonus work along the way."
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {miniProjects.map((m) => (
            <Link
              key={m.name}
              href={m.url || m.codeUrl || '#'}
              target="_blank"
              className="group rounded-[10px] border border-tint/[0.08] bg-surface p-4 transition-colors hover:border-tint/[0.15] hover:bg-stone-200 dark:hover:bg-[#161616]"
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-[13px] font-medium text-text-bright">
                  {m.name}
                </h3>
                <ArrowUpRight className="h-3 w-3 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
              </div>
              <p className="mb-2 text-[11px] leading-[1.5] text-muted">
                {m.description}
              </p>
              <div className="flex gap-1.5 font-mono text-[9px] text-subtle">
                {m.tech.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < m.tech.length - 1 && (
                      <span className="ml-1.5 text-stone-400 dark:text-[#333]">·</span>
                    )}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Writing */}
      {posts.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            title="Writing"
            marker="recent"
            description="Notes on building and getting better."
          />
          <div className="border-t border-tint/[0.06]">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={post.url}
                target="_blank"
                className="group flex items-baseline justify-between gap-5 border-b border-tint/[0.06] py-4 transition-colors hover:bg-tint/[0.02]"
              >
                <div className="flex-1">
                  <h3 className="text-[14px] font-medium text-text-bright transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-subtle">
                    {post.readTimeInMinutes} min · {post.tags.slice(0, 2).join(' · ') || 'post'}
                  </p>
                </div>
                <span className="whitespace-nowrap font-mono text-[11px] text-subtle">
                  {formatDate(post.publishedAt)}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/blog"
              className="inline-block border-b border-dashed border-tint/20 pb-0.5 font-mono text-[12px] text-muted transition-colors hover:border-tint/40 hover:text-text"
            >
              all posts →
            </Link>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mt-20 rounded-xl border border-tint/[0.08] bg-surface p-8 text-center">
        <div className="mb-2 font-mono text-[11px] tracking-wider text-emerald-700 dark:text-emerald-500">
          // let's build something
        </div>
        <h2 className="mb-2 text-[24px] font-medium tracking-tight">
          Get in touch
        </h2>
        <p className="mx-auto mb-5 max-w-[420px] text-[14px] leading-[1.6] text-muted">
          I'm open to full-time full-stack roles, remote or Hyderabad-based. The
          fastest way to reach me is email.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Link
            href={site.socials.email}
            className="inline-flex items-center gap-1.5 rounded-lg bg-text-bright px-5 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            Email me <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={site.socials.linkedin}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-tint/15 px-5 py-2 text-[13px] transition-colors hover:border-tint/30 hover:text-text-bright"
          >
            Connect on LinkedIn
          </Link>
        </div>
      </section>
    </div>
  );
}
