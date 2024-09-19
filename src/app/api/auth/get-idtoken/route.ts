import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const idToken = request.cookies.get('idToken')?.value;

  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // IDトークンを使って、必要な処理を実行
  // 例えば、Chime SDKなどの認証リクエストにトークンを使う
  return NextResponse.json({ idToken });
}
