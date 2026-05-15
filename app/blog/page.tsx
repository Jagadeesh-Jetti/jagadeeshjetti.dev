import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/hashnode';
import { formatDate } from '@/lib/utils';
import { site } from '@/data/site';

export const metadata = { title: 'Blog' };

// Revalidate hourly so new Hashnode posts appear automatically
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts(50);

  return (
    <div className="pb-20 pt-12">
      <div className="mb-10">
        <div className="mb-2 font-mono text-[11px] tracking-wider text-subtle">
          // writing
        </div>
        <h1 className="mb-2 text-[32px] font-medium tracking-tight">Blog</h1>
        <p className="max-w-[520px] text-[15px] leading-[1.7] text-muted">
          Notes on building, debugging, and getting better. Posts are published on
          Hashnode and auto-sync here.
        </p>
      </div>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="border-t border-tint/[0.06]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={post.url}
              target="_blank"
              className="group flex items-baseline justify-between gap-5 border-b border-tint/[0.06] py-4 transition-colors hover:bg-tint/[0.02]"
            >
              <div className="flex-1">
                <h3 className="flex items-center gap-1.5 text-[14px] font-medium text-text-bright transition-colors group-hover:text-white">
                  {post.title}
                  <ArrowUpRight className="h-3 w-3 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                {post.brief && (
                  <p className="mt-1 line-clamp-1 text-[13px] text-muted">
                    {post.brief}
                  </p>
                )}
                <p className="mt-1.5 font-mono text-[11px] text-subtle">
                  {post.readTimeInMinutes} min read
                  {post.tags.length > 0 && (
                    <> · {post.tags.slice(0, 3).join(' · ')}</>
                  )}
                </p>
              </div>
              <span className="whitespace-nowrap font-mono text-[11px] text-subtle">
                {formatDate(post.publishedAt)}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href={site.socials.hashnode}
          target="_blank"
          className="inline-block border-b border-dashed border-tint/20 pb-0.5 font-mono text-[12px] text-muted transition-colors hover:border-tint/40 hover:text-text"
        >
          view on hashnode →
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-tint/[0.08] bg-surface p-8 text-center">
      <p className="text-[14px] text-muted">
        No posts yet — or the Hashnode feed couldn't be reached.
      </p>
      <Link
        href={site.socials.hashnode}
        target="_blank"
        className="mt-3 inline-block font-mono text-[12px] text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        visit hashnode →
      </Link>
    </div>
  );
}
