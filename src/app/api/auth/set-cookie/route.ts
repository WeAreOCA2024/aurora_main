import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { idToken } = await request.json();

  // クッキーをセット
  const response = NextResponse.json({ message: 'Token set' });
  response.cookies.set('idToken', idToken, {
    httpOnly: true, // JavaScriptからのアクセスを防ぐ
    // secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // クッキーの有効期限
    path: '/', // クッキーを送信するパス
    sameSite: 'strict',
  });

  return response;
}
