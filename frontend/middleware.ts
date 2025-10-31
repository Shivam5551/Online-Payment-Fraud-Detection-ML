import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/api/auth/') && !isValidAuthRoute(pathname)) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

function isValidAuthRoute(pathname: string): boolean {
    const validAuthRoutes = [
        '/api/auth/signin',
        '/api/auth/signout',
        '/api/auth/callback',
        '/api/auth/session',
        '/api/auth/providers',
        '/api/auth/csrf',
        '/api/auth/error',
    ];

    return (
        validAuthRoutes.some(route => pathname.startsWith(route)) ||
        Boolean(pathname.match(/^\/api\/auth\/callback\/[^\/]+$/))
    );
}

export const config = {
    matcher: ['/api/auth/:path*'],
};
