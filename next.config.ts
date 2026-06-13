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
	// Long-lived caching for immutable static assets under /public (fonts,
	// favicons, the /cms screenshots). Next already sends immutable headers for
	// /_next/static; this covers the rest.
	async headers() {
		return [
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
