import { NextResponse } from 'next/server';

// Middleware pour vérifier la présence du cookie `refresh_token_main`
export function middleware(request) {
    const admin_token = request.cookies.get('refresh_token_main');
    const url = request.nextUrl.clone();

    console.log("hey");

    if (url.pathname.startsWith('/users/login/unforgot')) {
        if (admin_token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }


    if (url.pathname.startsWith('/admin')) {
        if (!admin_token) {
            return NextResponse.redirect(new URL('/404', request.url));
        }
        return NextResponse.next();
    }
    // if (request.nextUrl.pathname.startsWith('/admin')) {
    //     const refreshToken = request.cookies.get('refresh_token_main');
    //     if (!refreshToken) {
    //         return NextResponse.redirect(new URL('/users', request.url));
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'], // Appliquer à toutes les routes sous /admin
};
