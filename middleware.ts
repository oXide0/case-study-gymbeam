import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const authToken = request.cookies.get('authToken')?.value;

    const isProtectedRoute = path.startsWith('/products');

    const isAuthRoute = ['/login'].includes(path);

    if (isProtectedRoute && authToken == null) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthRoute && authToken != null) {
        return NextResponse.redirect(new URL('/products', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/products/:path*', '/login']
};
