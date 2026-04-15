import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = [
  'https://codedstorefrontend.vercel.app',
  'https://codedstore-v1e2.vercel.app',
  process.env.FRONTEND_URL, // optional env var
].filter(Boolean);

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  const isAllowed = allowedOrigins.includes(origin);

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // For normal requests, add CORS headers too
  const response = NextResponse.next();
  if (isAllowed) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
