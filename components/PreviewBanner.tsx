'use client';

/**
 * Sticky banner shown while Next.js Draft Mode is active. "Exit preview" clears
 * the draft cookies (via the disable route) and closes the preview tab — which
 * was opened by the admin via `window.open`, so `window.close()` is allowed.
 * If the browser refuses to close it, we fall back to navigating to live `/`.
 */
export default function PreviewBanner({ label }: { label?: string }) {
	const exit = async () => {
		try {
			await fetch('/api/preview/disable', { cache: 'no-store' });
		} catch {
			// ignore — still attempt to close / navigate away
		}
		window.close();
		// Fallback for tabs the browser won't script-close (e.g. opened manually).
		setTimeout(() => {
			window.location.href = '/';
		}, 150);
	};

	return (
		<div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-yellow-400 px-4 py-2 text-sm text-black">
			<span>
				<strong>Preview mode</strong> — showing draft content
				{label ? (
					<>
						{' '}
						for <code>{label}</code>
					</>
				) : null}
			</span>
			<button
				type="button"
				onClick={exit}
				className="underline hover:opacity-80"
			>
				Exit preview
			</button>
		</div>
	);
}
