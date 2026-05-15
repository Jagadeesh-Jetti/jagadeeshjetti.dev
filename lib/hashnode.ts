import { site } from '@/data/site';

export type Post = {
  slug: string;
  title: string;
  brief: string;
  publishedAt: string;
  readTimeInMinutes: number;
  url: string;
  coverImage?: string;
  tags: string[];
};

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function pickFirst(itemXml: string, tag: string): string {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)</${escaped}>`, 'i');
  const m = itemXml.match(re);
  return m ? decode(m[1].trim()) : '';
}

function pickAll(itemXml: string, tag: string): string[] {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)</${escaped}>`, 'gi');
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(itemXml)) !== null) {
    out.push(decode(m[1].trim()));
  }
  return out;
}

function slugFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? url;
  } catch {
    return url;
  }
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getBlogPosts(first = 20): Promise<Post[]> {
  try {
    const res = await fetch(`https://${site.hashnodeHost}/rss.xml`, {
      headers: {
        Accept: 'application/rss+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('xml') && !contentType.includes('rss')) {
      // Cloudflare challenge / HTML error page / wrong endpoint — degrade silently
      return [];
    }

    const xml = await res.text();
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const posts: Post[] = [];
    let m: RegExpExecArray | null;
    while ((m = itemRegex.exec(xml)) !== null && posts.length < first) {
      const itemXml = m[1];
      const title = pickFirst(itemXml, 'title');
      const url = pickFirst(itemXml, 'link');
      const pubDate = pickFirst(itemXml, 'pubDate');
      const description = pickFirst(itemXml, 'description');
      const contentEncoded = pickFirst(itemXml, 'content:encoded');
      const tags = pickAll(itemXml, 'category');

      const brief = description.replace(/<[^>]+>/g, '').trim().slice(0, 200);
      const readSource = contentEncoded || description;
      const readTimeInMinutes = estimateReadTime(readSource);
      const imgMatch = (contentEncoded || description).match(
        /<img[^>]+src="([^"]+)"/,
      );
      const coverImage = imgMatch?.[1];

      posts.push({
        slug: slugFromUrl(url),
        title,
        brief,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : '',
        readTimeInMinutes,
        url,
        coverImage,
        tags,
      });
    }

    return posts;
  } catch {
    return [];
  }
}
