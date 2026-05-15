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

const QUERY = `
  query Publication($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            slug
            title
            brief
            publishedAt
            readTimeInMinutes
            url
            coverImage { url }
            tags { name }
          }
        }
      }
    }
  }
`;

export async function getBlogPosts(first = 20): Promise<Post[]> {
  try {
    const res = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, variables: { host: site.hashnodeHost, first } }),
      // Revalidate every hour so new posts show up automatically
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const json = await res.json();
    const edges = json?.data?.publication?.posts?.edges ?? [];

    return edges.map((e: any) => ({
      slug: e.node.slug,
      title: e.node.title,
      brief: e.node.brief ?? '',
      publishedAt: e.node.publishedAt,
      readTimeInMinutes: e.node.readTimeInMinutes ?? 5,
      url: e.node.url,
      coverImage: e.node.coverImage?.url,
      tags: (e.node.tags ?? []).map((t: any) => t.name),
    }));
  } catch (err) {
    console.error('Hashnode fetch failed:', err);
    return [];
  }
}
