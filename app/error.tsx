'use client';

import { useEffect } from 'react';
import { Button, ButtonLink } from '@/components/ui/Button';

/**
 * Route-segment error boundary. Catches render/data errors anywhere below the
 * root layout (e.g. an unexpected CMS shape or a template-registry miss) and
 * shows a branded recovery screen instead of Next's unstyled crash page.
 */
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Surface the error for server logs / monitoring.
		console.error('Route error boundary caught:', error);
	}, [error]);

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-10 py-24">
			<div className="max-w-3xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Something broke
				</p>
				<h1 className="mt-4 text-balance">
					This page hit a snag on the wheel.
				</h1>
				<p className="text-dp-body-soft mt-6 text-balance">
					An unexpected error stopped this page from loading. Try again — and if
					it keeps happening, let us know.
				</p>
				<div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button variant="solid" onClick={reset}>
						Try again
					</Button>
					<ButtonLink href="/" variant="outlined">
						Go back home
					</ButtonLink>
				</div>
			</div>
		</div>
	);
}
