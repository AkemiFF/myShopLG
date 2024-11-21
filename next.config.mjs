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
        ],
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
                    { key: "Content-Security-Policy", value: "script-src 'self' 'unsafe-inline' 'unsafe-eval';" },
                ],
            },
        ];
    },
    poweredByHeader: false, // Supprimer l'en-tête X-Powered-By
};

export default nextConfig;
