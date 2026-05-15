import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { site, skills, now } from '@/data/site';
import { SectionHeading } from '@/components/ui/section-heading';
import { TechIcon } from '@/lib/tech-icons';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="pb-20 pt-12">
      <div className="mb-10">
        <div className="mb-2 font-mono text-[11px] tracking-wider text-subtle">
          // about
        </div>
        <h1
          data-splash-target
          className="mb-4 text-[32px] font-medium tracking-tight"
        >
          Hey, I'm Jagadeesh.
        </h1>
        <div className="space-y-4 text-[15px] leading-[1.75] text-muted">
          <p>
            I'm a full-stack web developer from Hyderabad with 2+ years of building
            products end-to-end. Comfortable across the MERN stack and lately spending
            more of my time in TypeScript, Prisma, and PostgreSQL. I care about clean
            code, scalable architecture, and shipping things people actually use.
          </p>
          <p>
            My favorite kind of work sits at the seam between frontend, backend, and
            product — where the right answer isn't "more features" or "cleaner code" but
            a specific small decision that makes the whole thing click. I'm aiming to
            land a role where I can do that every day.
          </p>
          <p>
            Outside of shipping code, I write on{' '}
            <Link
              href={site.socials.hashnode}
              target="_blank"
              className="text-text-bright underline-offset-4 hover:underline"
            >
              Hashnode
            </Link>{' '}
            about patterns I learn the hard way, and I'm always down to talk about
            system design, product decisions, or debugging war stories.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {site.location}
          </span>
          <Link
            href={site.socials.email}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-text-bright"
          >
            <Mail className="h-3.5 w-3.5" /> {site.email}
          </Link>
        </div>
      </div>

      {/* Currently */}
      <section className="mt-12">
        <SectionHeading title="Currently" marker="what i'm up to" />
        <ul className="space-y-3 border-t border-tint/[0.06] pt-4">
          {now.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[14px] leading-[1.6] text-muted"
            >
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mt-12">
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

      {/* Contact CTA */}
      <section className="mt-16 rounded-xl border border-tint/[0.08] bg-surface p-7 text-center">
        <h2 className="mb-2 text-[20px] font-medium">Let's talk.</h2>
        <p className="mx-auto mb-4 max-w-[420px] text-[13px] leading-[1.6] text-muted">
          I'm open to full-time full-stack roles, remote or Hyderabad-based.
        </p>
        <Link
          href={site.socials.email}
          className="inline-flex items-center gap-1.5 rounded-lg bg-text-bright px-5 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
        >
          <Mail className="h-3.5 w-3.5" /> Email me
        </Link>
      </section>
    </div>
  );
}
