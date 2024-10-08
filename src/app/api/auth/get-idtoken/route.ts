import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const idToken = request.cookies.get('idToken')?.value;

  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ idToken });
}

