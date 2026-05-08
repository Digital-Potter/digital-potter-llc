'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SESSION_KEY = 'dp_session_id';

/**
 * Read or mint a per-tab session id stored in `sessionStorage`. The same id
 * is sent with every visit beacon for the lifetime of this browser tab so
 * the dashboard can group pageviews into sessions.
 */
function getSessionId(): string {
	if (typeof window === 'undefined') return '';
	let id = window.sessionStorage.getItem(SESSION_KEY);
	if (!id) {
		id =
			typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
				? crypto.randomUUID()
				: Math.random().toString(36).slice(2) + Date.now().toString(36);
		try {
			window.sessionStorage.setItem(SESSION_KEY, id);
		} catch {
			// sessionStorage may be unavailable (private mode, blocked) — id stays in-memory.
		}
	}
	return id;
}

/**
 * Fires `POST /api/track/visit` on every client-side navigation. Lives in
 * the root layout. Uses `fetch keepalive` so the request survives the
 * window unload that follows a link click. Failures are swallowed — analytics
 * must never break the page.
 *
 * Tenant + API base come from `NEXT_PUBLIC_CMS_TENANT` and `NEXT_PUBLIC_CMS`
 * (same env vars `helpers/cms/client.ts` already uses).
 */
export default function TrackPageVisit() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lastPath = useRef<string | null>(null);

	useEffect(() => {
		const apiUrl = process.env.NEXT_PUBLIC_CMS;
		const tenantId = process.env.NEXT_PUBLIC_CMS_TENANT;
		if (!apiUrl || !tenantId) return;
		if (typeof window === 'undefined') return;

		const qs = searchParams.toString();
		const fullPath = pathname + (qs ? `?${qs}` : '');
		// Guard against React-StrictMode double-invocation in dev and against
		// SearchParams hooks firing for cosmetic state changes.
		if (lastPath.current === fullPath) return;
		lastPath.current = fullPath;

		const pageUrl = window.location.origin + fullPath;
		const referrer = document.referrer || undefined;
		const sessionId = getSessionId();

		fetch(`${apiUrl.replace(/\/$/, '')}/api/track/visit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-tenant-id': tenantId,
			},
			body: JSON.stringify({ pageUrl, referrer, sessionId }),
			keepalive: true,
		}).catch(() => {
			// Silently ignore — analytics must never break the site.
		});
	}, [pathname, searchParams]);

	return null;
}
