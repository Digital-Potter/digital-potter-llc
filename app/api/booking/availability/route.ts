import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const date = searchParams.get('date');
	const durationMinutes = searchParams.get('durationMinutes') ?? '45';

	if (!date) {
		return NextResponse.json({ error: 'date is required' }, { status: 400 });
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
			`${apiUrl.replace(/\/$/, '')}/api/storefront/bookings/availability?date=${date}&durationMinutes=${durationMinutes}`,
			{ headers: { 'x-tenant-id': tenantId } },
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
