import { getBlogPosts } from 'app/db/blog';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `https://estebanchirinos.xyz/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/ai-lab', '/blog', '/goggles', '/projects', '/resume', '/work', '/contact'].map((route) => ({
    url: `https://estebanchirinos.xyz${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
