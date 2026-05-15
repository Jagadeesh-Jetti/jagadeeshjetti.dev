import { projects } from '@/data/site';
import { ProjectCard } from '@/components/sections/project-card';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata = { title: 'Projects' };

export default function ProjectsPage() {
  return (
    <div className="pb-20 pt-12">
      <div className="mb-10">
        <div className="mb-2 font-mono text-[11px] tracking-wider text-subtle">
          // all projects
        </div>
        <h1 className="mb-2 text-[32px] font-medium tracking-tight">Projects</h1>
        <p className="max-w-[520px] text-[15px] leading-[1.7] text-muted">
          A full list of things I've built. Each one taught me something I couldn't have
          learned reading tutorials.
        </p>
      </div>

      <SectionHeading title="Main projects" marker={`0${projects.length}`} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
