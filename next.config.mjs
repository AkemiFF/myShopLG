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
        ],
        minimumCacheTTL: 60,
    },

    async headers() {
        // return [
        //     {
        //         source: "/(.*)",
        //         headers: [
        //             { key: "X-Frame-Options", value: "DENY" },
        //             { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        //             { key: "X-Content-Type-Options", value: "nosniff" },
        //             { key: "Referrer-Policy", value: "no-referrer" },
        //             { key: "Content-Security-Policy", value: "script-src 'self' 'unsafe-inline' 'unsafe-eval';" },
        //         ],
        //     },
        // ];
        return [
            {
                source: "/(.*)",

                headers: [
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Content-Security-Policy",
                        value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.shoplg.online; img-src 'self' https: data: blob:;  font-src 'self' data:;`
                    },
                    { key: "Access-Control-Allow-Origin", value: "https://api.shoplg.online" },
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
                    },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
                ],
            },
        ];
    },
    poweredByHeader: false, // Supprimer l'en-tête X-Powered-By
};

export default nextConfig;
