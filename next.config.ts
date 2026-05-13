import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Type-checking and linting run as separate CI steps (tsc --noEmit + eslint)
	// before the server ever receives the build. Skipping them here prevents
	// double work and avoids OOM hangs on small EC2 instances.
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
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
};

export default nextConfig;
