import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const digitisation = Number(body.digitisation ?? 68);
  const boundary = Number(body.boundary ?? 42);
  return NextResponse.json({
    disputePressure: Math.round(100 - digitisation * 0.42 + boundary * 0.14),
    revenueIndex: Math.round(74 + digitisation * 0.32 - boundary * 0.08),
    conversionRisk: Math.round(66 - boundary * 0.18),
    resilience: Math.round(58 + digitisation * 0.2),
    confidence: 8.4,
  });
}
