import { getAllPosts, postUrl, formatDate } from '../lib/posts';
import { SITE } from '../data/site';

export async function GET() {
  const posts = await getAllPosts();
  const body = {
    title: SITE.name,
    home: SITE.url,
    updated: new Date().toISOString(),
    items: posts.map((p) => ({
      title: p.data.title,
      url: SITE.url + postUrl(p.collection, p.id),
      date: formatDate(p.data.date),
      description: p.data.description,
      tags: p.data.tags,
      collection: p.collection,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
