import { NextResponse } from 'next/server';

// Middleware pour vérifier la présence du cookie `refresh_token_main`
export function middleware(request) {
    const admin_token = request.cookies.get('refresh_token_main');
    const client_token = request.cookies.get('refresh_token');
    const url = request.nextUrl.clone();

    if (url.pathname.startsWith('/users/login/unforgot')) {
        if (admin_token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // if (url.pathname.startsWith('/users/profil')) {
    //     if (!client_token) {
    //         return NextResponse.redirect(new URL('/404', request.url));
    //     }
    //     return NextResponse.next();
    // }
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

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/users/:path*'],
};
