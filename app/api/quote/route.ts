import { NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/quoteSchema';

/**
 * Placeholder quote-form handler.
 *
 * For now this validates the payload server-side and logs it. Once the
 * `POST /api/storefront/messages` endpoint exists in thedavid-api (per
 * the May-04 spec §6.2) this handler will forward the body there with
 * the storefront tenant header. Until then, the form looks "live" to
 * the visitor but no record is persisted.
 */
export async function POST(req: Request) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json(
			{ success: false, error: 'Invalid JSON body.' },
			{ status: 400 },
		);
	}

	const parsed = quoteSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{
				success: false,
				error: 'Validation failed.',
				details: parsed.error.flatten(),
			},
			{ status: 400 },
		);
	}

	// Honeypot tripped — pretend success, never persist.
	if (parsed.data.website && parsed.data.website.length > 0) {
		return NextResponse.json({ success: true });
	}

	if (process.env.NODE_ENV !== 'production') {
		console.warn('[quote] received:', JSON.stringify(parsed.data, null, 2));
	}

	// TODO: forward to thedavid-api POST /api/storefront/messages once the
	// endpoint exists. Body shape per spec §5.8:
	//   { name, email, phone, subject, body }
	// where subject is auto-built and body is a formatted plaintext block.

	return NextResponse.json({ success: true });
}
