import { NextResponse } from 'next/server';
import { quoteSchema, type QuoteFormData } from '@/lib/quoteSchema';

/**
 * Forwards validated quote-form payloads to the CMS storefront message
 * endpoint at `${NEXT_PUBLIC_CMS}/api/storefront/messages`. The CMS:
 *  - persists the message to the tenant inbox (visible at /messages in admin),
 *  - sends a notification email to `tenant.contactEmail`,
 *  - sends an autoreply to the submitter.
 *
 * This route does the local zod validation, builds a structured plaintext
 * `body` from the rich quote payload, picks a concise `subject`, then forwards
 * with the storefront `x-tenant-id` header. Required env:
 *   NEXT_PUBLIC_CMS         CMS API base URL
 *   NEXT_PUBLIC_CMS_TENANT  Tenant slug or ObjectId
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

	const data = parsed.data;

	// Honeypot tripped — pretend success, never persist or forward.
	if (data.honeypot_url && data.honeypot_url.length > 0) {
		return NextResponse.json({ success: true });
	}

	const apiUrl = process.env.NEXT_PUBLIC_CMS;
	const tenantId = process.env.NEXT_PUBLIC_CMS_TENANT;
	if (!apiUrl || !tenantId) {
		console.warn('[quote] NEXT_PUBLIC_CMS / NEXT_PUBLIC_CMS_TENANT not set');
		return NextResponse.json(
			{ success: false, error: 'Server is not configured to send messages.' },
			{ status: 500 },
		);
	}

	const subject = buildSubject(data);
	const messageBody = buildBody(data);

	try {
		const res = await fetch(
			`${apiUrl.replace(/\/$/, '')}/api/storefront/messages`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-tenant-id': tenantId,
				},
				body: JSON.stringify({
					name: data.yourName,
					email: data.email,
					phone: data.phone,
					subject,
					body: messageBody,
					honeypot_url: '',
				}),
			},
		);

		if (!res.ok) {
			const text = await res.text();
			console.warn('[quote] CMS rejected message:', res.status, text);
			return NextResponse.json(
				{
					success: false,
					error:
						res.status === 429
							? 'Too many requests. Please try again in a minute.'
							: 'We could not deliver your message right now.',
				},
				{ status: res.status === 429 ? 429 : 502 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (err) {
		console.warn('[quote] forward failed:', err);
		return NextResponse.json(
			{
				success: false,
				error: 'We could not reach the message service. Please try again.',
			},
			{ status: 502 },
		);
	}
}

function buildSubject(d: QuoteFormData): string {
	return `New project inquiry — ${d.businessName} (${d.yourName})`;
}

/**
 * Assembles the rich quote payload into a structured plaintext block. The
 * CMS stores it verbatim in the inbox and the notification email renders it
 * inside a `<pre>`, so a stable, readable layout matters more than line
 * breaks on every option.
 */
function buildBody(d: QuoteFormData): string {
	const sections: string[] = [];

	sections.push(line('CONTACT'));
	sections.push(kv('Name', d.yourName));
	sections.push(kv('Email', d.email));
	sections.push(kv('Phone', d.phone));
	sections.push(kv('Best contact', d.bestContact));

	sections.push('');
	sections.push(line('BUSINESS'));
	sections.push(kv('Business', d.businessName));
	sections.push(kv('Industry', d.industry));
	sections.push(kv('Location', d.location));
	sections.push(kv('Company size', d.companySize));

	sections.push('');
	sections.push(line('PROJECT'));
	sections.push(kv('Need type', d.needType));

	if (d.websiteType || (d.websiteFeatures && d.websiteFeatures.length > 0)) {
		sections.push('');
		sections.push(line('WEBSITE DETAILS'));
		if (d.websiteType) sections.push(kv('Type', d.websiteType));
		if (d.websiteFeatures && d.websiteFeatures.length > 0) {
			sections.push(kv('Features', d.websiteFeatures.join(', ')));
		}
		if (d.replacingSite) sections.push(kv('Existing site', d.replacingSite));
		if (d.domain) sections.push(kv('Domain', d.domain));
		if (d.websiteBudget) sections.push(kv('Build budget', d.websiteBudget));
		if (d.hostingBudget) sections.push(kv('Hosting budget', d.hostingBudget));
		if (d.hostingModel) sections.push(kv('Hosting model', d.hostingModel));
		if (d.expectedTraffic) {
			sections.push(kv('Expected traffic', d.expectedTraffic));
		}
	}

	if (d.appType || (d.mobileFeatures && d.mobileFeatures.length > 0)) {
		sections.push('');
		sections.push(line('MOBILE APP DETAILS'));
		if (d.appType) sections.push(kv('App type', d.appType));
		if (d.mobileFeatures && d.mobileFeatures.length > 0) {
			sections.push(kv('Features', d.mobileFeatures.join(', ')));
		}
		if (d.appStoreAccounts) {
			sections.push(kv('Developer accounts', d.appStoreAccounts));
		}
		if (d.mobileBudget) sections.push(kv('Mobile budget', d.mobileBudget));
	}

	sections.push('');
	sections.push(line('BUDGET & TIMELINE'));
	sections.push(kv('Payment preference', d.paymentPreference));
	sections.push(kv('Maintenance', d.maintenance));
	sections.push(kv('Payments needed', d.paymentsNeeded));
	sections.push(kv('Target launch', d.targetLaunch));

	return sections.join('\n');
}

function line(label: string): string {
	return `── ${label} ──`;
}

function kv(label: string, value: string): string {
	return `${label}: ${value}`;
}
