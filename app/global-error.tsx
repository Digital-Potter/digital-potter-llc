'use client';

import { useEffect } from 'react';
import './globals.css';

/**
 * Last-resort boundary for errors thrown in the ROOT layout itself. It
 * replaces the entire document, so it must render its own <html>/<body>.
 * next/font variables aren't available here (they live on the layout's
 * <html>), so type degrades gracefully to the system sans stack.
 */
export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error('Global error boundary caught:', error);
	}, [error]);

	return (
		<html lang="en">
			<body className="bg-dp-yellowish text-dp-body antialiased">
				<div className="flex min-h-screen flex-col items-center justify-center px-10 py-24 text-center">
					<p className="text-dp-dark-green text-xs font-bold tracking-widest uppercase">
						Something broke
					</p>
					<h1 className="mt-4 max-w-2xl text-4xl font-bold text-balance">
						We hit an unexpected error.
					</h1>
					<p className="text-dp-body-soft mt-6 max-w-xl text-balance">
						The page couldn&apos;t load. Please try again.
					</p>
					<button
						type="button"
						onClick={reset}
						className="bg-dp-green text-dp-dark hover:bg-dp-dark hover:text-dp-green mt-10 rounded-full border-2 border-white px-8 py-3.5 text-sm font-bold uppercase shadow-2xl transition-colors"
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
}
