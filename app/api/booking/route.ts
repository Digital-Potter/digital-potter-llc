import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
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
		const res = await fetch(
			`${apiUrl.replace(/\/$/, '')}/api/storefront/bookings`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-tenant-id': tenantId,
				},
				body: JSON.stringify(body),
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
