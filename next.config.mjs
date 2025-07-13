/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'giphy.com',
            },
            {
                protocol: 'https',
                hostname: 'i.giphy.com',
            },
            {
                protocol: 'https',
                hostname: 'gkjguutd-shop-chjv-ugu.onrender.com',
            },
            {
                protocol: 'https',
                hostname: 'gkjguutd-shop-chjv-ugu-05uj.onrender.com',
            },
        ],
        minimumCacheTTL: 60,
    },

    async headers() {
        return [
            {
            source: "/(.*)",
            headers: [
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "no-referrer" },
                {
                key: "Content-Security-Policy",
                value: `
                    default-src 'self';
                    script-src 'self' 'unsafe-inline' 'unsafe-eval';
                    style-src 'self' 'unsafe-inline';
                    img-src 'self' https://giphy.com https://i.giphy.com https://gkjguutd-shop-chjv-ugu-05uj.onrender.com http://localhost:8000;
                    connect-src 'self' https://gkjguutd-shop-chjv-ugu-05uj.onrender.com http://localhost:8000 http://127.0.0.1:8000;
                    frame-ancestors 'none';
                `.replace(/\n/g, " ")
                },
            ],
            },
        ];
    },
    poweredByHeader: false,
};

export default nextConfig;
