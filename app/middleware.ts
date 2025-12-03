import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const protectedRoutes = ['/profile', '/dashboard', '/settings'];
const publicRoutes = ['/login', '/signup', '/'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // لو المستخدم عنده توكن وحاول يدخل login/signup/home، حوّله للبروفايل
  if (token && publicRoutes.includes(path)) {
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/profile', request.url));
    } catch {}
  }

  // حماية الصفحات المحمية
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
