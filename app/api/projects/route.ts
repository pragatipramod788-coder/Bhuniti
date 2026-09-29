import { NextResponse } from 'next/server';
import { projects } from '../../data/seed';

export async function GET() {
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ ok: true, activity: { ...body, createdAt: new Date().toISOString() } });
}
