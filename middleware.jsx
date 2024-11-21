import { NextResponse } from 'next/server';

// Middleware pour vérifier la présence du cookie `refresh_token_main`
export function middleware(request) {
    const response = NextResponse.next();
    const admin_token = request.cookies.get('refresh_token_main');
    const manager_token = request.cookies.get('refresh_token_manager');
    const client_token = request.cookies.get('refresh_token');
    const url = request.nextUrl.clone();

    response.headers.delete("x-nextjs-cache");
    response.headers.delete("x-nextjs-prerender");
    response.headers.delete("x-nextjs-stale-time");

    if (url.pathname.startsWith('/users/login/unforgot')) {
        if (admin_token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    if (url.pathname.startsWith('/users/login/unforgot')) {
        if (manager_token) {
            return NextResponse.redirect(new URL('/manager', request.url));
        }
        return NextResponse.next();
    }

    if (url.pathname.startsWith('/users/login') && !url.pathname.startsWith('/users/login/unforgot') && !url.pathname.startsWith('/users/login/forgot-password')) {
        if (client_token) {
            return NextResponse.redirect(new URL('/users', request.url));
        }
        return NextResponse.next();
    }


    if (url.pathname.startsWith('/admin')) {
        if (!admin_token) {
            return NextResponse.redirect(new URL('/404', request.url));
        }
        return NextResponse.next();
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*', '/users/:path*'],
};
