import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Don't advertise the framework.
	poweredByHeader: false,
	// Type-checking and linting run as separate CI steps (tsc --noEmit + eslint)
	// before the server ever receives the build. Skipping them here prevents
	// double work and avoids OOM hangs on small EC2 instances.
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		// Optimized image responses are immutable per upload — cache them for a
		// year (fixes the "inefficient cache lifetimes" Lighthouse insight for
		// /_next/image responses).
		minimumCacheTTL: 60 * 60 * 24 * 365,
		// Trimmed to our real breakpoints so the optimizer stops generating
		// 2048/3840px variants nothing requests.
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: '*.cloudfront.net',
			},
			{
				protocol: 'https',
				hostname: '*.digitalpotter.io',
			},
		],
	},
	async headers() {
		const isProd = process.env.NODE_ENV === 'production';

		// Content-Security-Policy. Permissive enough for Next's inline hydration
		// scripts + Tailwind inline styles + GTM/GA + Cloudflare Insights, while
		// still locking down framing (clickjacking), base-uri, plugins, and form
		// targets. Enforced only in production — `next dev` needs 'unsafe-eval'
		// for HMR. A nonce-based policy that drops 'unsafe-inline' is the
		// stricter follow-up. (Could also live as a Cloudflare Transform Rule.)
		const csp = [
			"default-src 'self'",
			"base-uri 'self'",
			"object-src 'none'",
			"frame-ancestors 'self'",
			"form-action 'self'",
			"script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: blob: https:",
			"font-src 'self' data:",
			"connect-src 'self' https://*.digitalpotter.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
			"frame-src 'self' https://www.googletagmanager.com",
			"worker-src 'self' blob:",
			'upgrade-insecure-requests',
		].join('; ');

		const securityHeaders = [
			{
				key: 'Strict-Transport-Security',
				value: 'max-age=63072000; includeSubDomains; preload',
			},
			{ key: 'X-Content-Type-Options', value: 'nosniff' },
			{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
			{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
			{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
			{
				key: 'Permissions-Policy',
				value: 'camera=(), microphone=(), geolocation=()',
			},
			...(isProd ? [{ key: 'Content-Security-Policy', value: csp }] : []),
		];

		return [
			// Security headers on every route.
			{ source: '/:path*', headers: securityHeaders },
			// Long-lived caching for immutable static assets under /public (fonts,
			// favicons, the /cms screenshots). Next already sends immutable headers
			// for /_next/static; this covers the rest.
			{
				source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
};

export default nextConfig;
