import {NextResponse} from 'next/server'; export async function GET(){return NextResponse.json({ok:true,service:'bhuniti',time:new Date().toISOString()})}
