import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOTES_LENGTH = 1200;
const SOLICITOR_PATTERNS = [
	/guest\s*post/i,
	/back\s*links?/i,
	/link\s*building/i,
	/sponsored\s*post/i,
	/paid\s*link/i,
	/pbn\b/i,
	/casino\b/i,
	/forex\b/i,
	/cbd\b/i,
];

type BookingPayload = {
	type: string;
	startsAt: string;
	durationMinutes: number;
	timezone?: string;
	service?: { name?: string };
	guest: { name: string; email: string; phone: string };
	customerNotes?: string;
	consentSMS?: boolean;
	honeypot_url?: string;
};

function toBookingPayload(input: unknown): BookingPayload | null {
	if (!input || typeof input !== 'object') return null;
	const data = input as Record<string, unknown>;
	const guest = data.guest as Record<string, unknown> | undefined;

	if (!guest || typeof guest !== 'object') return null;

	if (
		typeof data.type !== 'string' ||
		typeof data.startsAt !== 'string' ||
		typeof data.durationMinutes !== 'number' ||
		typeof guest.name !== 'string' ||
		typeof guest.email !== 'string' ||
		typeof guest.phone !== 'string'
	) {
		return null;
	}

	return {
		type: data.type,
		startsAt: data.startsAt,
		durationMinutes: data.durationMinutes,
		timezone: typeof data.timezone === 'string' ? data.timezone : undefined,
		service:
			data.service && typeof data.service === 'object'
				? {
						name: (data.service as { name?: unknown }).name as
							| string
							| undefined,
					}
				: undefined,
		guest: {
			name: guest.name,
			email: guest.email,
			phone: guest.phone,
		},
		customerNotes:
			typeof data.customerNotes === 'string' ? data.customerNotes : undefined,
		consentSMS: typeof data.consentSMS === 'boolean' ? data.consentSMS : false,
		honeypot_url:
			typeof data.honeypot_url === 'string' ? data.honeypot_url : undefined,
	};
}

function isSolicitorLikeNotes(notes: string): boolean {
	const value = notes.toLowerCase();
	const hasUrl = /(https?:\/\/|www\.|\.com\b)/i.test(value);
	const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(value);
	const matchedPatterns = SOLICITOR_PATTERNS.filter((re) =>
		re.test(value),
	).length;

	if (matchedPatterns >= 2) return true;
	if (matchedPatterns >= 1 && (hasUrl || hasEmail)) return true;
	if ((value.match(/https?:\/\//gi) ?? []).length >= 2) return true;

	return false;
}

function matchedSolicitorPatterns(notes: string): string[] {
	return SOLICITOR_PATTERNS.filter((re) => re.test(notes)).map(
		(re) => re.source,
	);
}

function emailDomain(email: string): string {
	return email.split('@')[1] ?? 'unknown';
}

function withConsentNote(
	notes: string | undefined,
	consentSMS: boolean,
): string | undefined {
	const cleanNotes = notes?.trim();
	const consentLine = `[Consent] SMS: ${consentSMS ? 'Yes' : 'No'}`;

	if (!cleanNotes) return consentLine;
	return `${cleanNotes}\n\n${consentLine}`;
}

export async function POST(req: Request) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const data = toBookingPayload(body);
	if (!data) {
		return NextResponse.json(
			{ error: 'Invalid booking payload' },
			{ status: 400 },
		);
	}

	if (data.honeypot_url && data.honeypot_url.length > 0) {
		console.warn('[booking] blocked honeypot submission', {
			honeypotLength: data.honeypot_url.length,
			guestEmailDomain: emailDomain(data.guest.email),
		});
		return NextResponse.json({ success: true });
	}

	if (!EMAIL_RE.test(data.guest.email.trim())) {
		return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
	}

	const notes = data.customerNotes?.trim();
	if (notes && notes.length > MAX_NOTES_LENGTH) {
		return NextResponse.json(
			{ error: 'Notes are too long. Please keep them under 1200 characters.' },
			{ status: 400 },
		);
	}

	if (notes && isSolicitorLikeNotes(notes)) {
		console.warn('[booking] blocked solicitor-like notes', {
			guestEmailDomain: emailDomain(data.guest.email),
			notesLength: notes.length,
			matchedPatterns: matchedSolicitorPatterns(notes.toLowerCase()),
		});
		return NextResponse.json(
			{
				error:
					'Please keep notes focused on your project needs and avoid promotional outreach.',
			},
			{ status: 400 },
		);
	}

	const apiUrl = process.env.NEXT_PUBLIC_CMS;
	const tenantId = process.env.NEXT_PUBLIC_CMS_TENANT;
	if (!apiUrl || !tenantId) {
		return NextResponse.json(
			{ error: 'Server not configured' },
			{ status: 500 },
		);
	}

	try {
		const forwardPayload = {
			type: data.type,
			startsAt: data.startsAt,
			durationMinutes: data.durationMinutes,
			timezone: data.timezone,
			service: data.service,
			guest: {
				name: data.guest.name.trim(),
				email: data.guest.email.trim(),
				phone: data.guest.phone.trim(),
			},
			customerNotes: withConsentNote(notes, data.consentSMS ?? false),
		};

		const res = await fetch(
			`${apiUrl.replace(/\/$/, '')}/api/storefront/bookings`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-tenant-id': tenantId,
				},
				body: JSON.stringify(forwardPayload),
			},
		);
		const data = await res.json();
		return NextResponse.json(data, { status: res.status });
	} catch {
		return NextResponse.json(
			{ error: 'Could not reach booking service' },
			{ status: 502 },
		);
	}
}
