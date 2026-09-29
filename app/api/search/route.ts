import { NextResponse } from 'next/server';
import { repoItems } from '../../data/seed';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = (url.searchParams.get('q') || '').toLowerCase().trim();
  const state = url.searchParams.get('state');
  const results = repoItems
    .map((item) => {
      const haystack = `${item.title} ${item.abstract} ${item.tags.join(' ')}`.toLowerCase();
      const relevance = query ? haystack.split(query).length - 1 : 0;
      return { ...item, relevance: query ? relevance * 30 + item.evidence / 2 : item.evidence };
    })
    .filter((item) => !state || item.state === state)
    .filter((item) => !query || item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);

  return NextResponse.json({ query, results, related: results.slice(0, 3).map((item) => item.id) });
}
