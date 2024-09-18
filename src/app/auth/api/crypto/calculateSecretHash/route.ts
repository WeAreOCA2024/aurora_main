import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET_KEY!;


export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const msg = email + clientId;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(msg);
  return NextResponse.json({ secretHash: hmac.digest("base64") });
}