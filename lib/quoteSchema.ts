import { z } from 'zod';

// ---- Top-level: what are they building? ----

export const needTypeOptions = [
	'Website only',
	'Mobile app only',
	'Website AND mobile app',
] as const;

export type NeedType = (typeof needTypeOptions)[number];

const needsWebsite = (n: NeedType | undefined) =>
	n === 'Website only' || n === 'Website AND mobile app';
const needsMobile = (n: NeedType | undefined) =>
	n === 'Mobile app only' || n === 'Website AND mobile app';

// ---- Step 1 — Website branch ----

export const websiteTypeOptions = [
	'Marketing / brochure site',
	'Ecommerce',
	'Restaurant',
	'Booking & Events',
	'Membership / Subscription',
	'Custom web application',
	'Not sure yet',
] as const;

export const websiteFeatureOptions = [
	'Online store',
	'Online booking',
	'Reservations',
	'Event calendar',
	'Customer portal',
	'Memberships',
	'Subscriptions',
	'Blog',
	'Portfolio / gallery',
	'Multi-language',
] as const;

export const replacingSiteOptions = [
	'Yes (redesign)',
	'No (brand new)',
] as const;

export const domainOptions = [
	'Have a domain',
	'Need to register',
	'Not sure yet',
] as const;

// ---- Step 1 — Mobile branch ----

export const appTypeOptions = [
	'Customer-facing app (loyalty, ordering, content)',
	'Internal / staff app (back-of-house, dispatch)',
	'Events / on-site app (check-in, programs)',
	'Subscription / member app',
	'Other / Not sure yet',
] as const;

export const mobileFeatureOptions = [
	'Push notifications',
	'Offline mode',
	'Geolocation / maps',
	'Camera or QR scanning',
	'In-app purchases',
	'Biometric authentication',
	'Background sync',
	'Apple Pay / Google Pay',
] as const;

export const appStoreAccountsOptions = [
	'We already have Apple / Google developer accounts',
	"We don't — we'll need to set them up",
	'Not sure yet',
] as const;

// ---- Step 2 — Budget and timelines ----

export const websiteBudgetOptions = [
	'$1,900 – $3,500 (marketing site)',
	'$4,000 – $7,500 (ecommerce / booking)',
	'$8,500+ (custom web application)',
	'Not sure — help me scope it',
] as const;

export const hostingBudgetOptions = [
	'$25 – $75 / month (hosting + CMS, maybe a module)',
	'$100 – $500 / month (platform + Care or Studio retainer)',
	'$500 – $2,500+ / month (Studio / Fractional CTO)',
	'Enterprise (self-host)',
] as const;

export const mobileBudgetOptions = [
	'$12,500 – $20K (focused MVP)',
	'$20K – $40K (standard production app)',
	'$40K – $75K (feature-rich app)',
	'$75K+ (enterprise / multi-platform)',
	'Open to discuss',
] as const;

export const paymentPreferenceOptions = [
	'One-time upfront',
	'Monthly installments',
	'Open to options',
] as const;

export const maintenanceOptions = [
	'We have an in-house team',
	'Need monthly maintenance',
	'Project-by-project',
] as const;

export const hostingModelOptions = [
	'Host & manage for us',
	'Self-host (one-time license + maintenance)',
	'Tell me more',
] as const;

export const expectedTrafficOptions = [
	'< 10K visits / month',
	'10K – 100K',
	'100K – 500K',
	'500K+',
	'Not sure (seasonal)',
] as const;

export const paymentsNeededOptions = [
	'Yes — we already have Stripe',
	'Yes — need to set up Stripe',
	'No',
	'Not sure',
] as const;

export const targetLaunchOptions = [
	'ASAP (< 1 month)',
	'1 – 3 months',
	'3 – 6 months',
	'Just exploring',
] as const;

// ---- Step 3 — Personal and business info ----

export const companySizeOptions = [
	'Solo',
	'2 – 10',
	'11 – 50',
	'51 – 200',
	'200+',
] as const;

export const bestContactOptions = ['Email', 'Phone', 'Either'] as const;

// ---- Schema ----

export const quoteSchema = z
	.object({
		// Top-level branch
		needType: z.enum(needTypeOptions, {
			message: 'Tell us what you want to build.',
		}),

		// Website branch (optional in raw shape; required by superRefine when applicable)
		websiteType: z.enum(websiteTypeOptions).optional(),
		websiteFeatures: z.array(z.enum(websiteFeatureOptions)).optional(),
		replacingSite: z.enum(replacingSiteOptions).optional(),
		domain: z.enum(domainOptions).optional(),

		// Mobile branch
		appType: z.enum(appTypeOptions).optional(),
		mobileFeatures: z.array(z.enum(mobileFeatureOptions)).optional(),
		appStoreAccounts: z.enum(appStoreAccountsOptions).optional(),

		// Budget — partly conditional
		websiteBudget: z.enum(websiteBudgetOptions).optional(),
		hostingBudget: z.enum(hostingBudgetOptions).optional(),
		mobileBudget: z.enum(mobileBudgetOptions).optional(),
		paymentPreference: z.enum(paymentPreferenceOptions, {
			message: 'How would you like to pay for the build?',
		}),
		maintenance: z.enum(maintenanceOptions, {
			message: 'Pick a maintenance preference.',
		}),
		hostingModel: z.enum(hostingModelOptions).optional(),
		expectedTraffic: z.enum(expectedTrafficOptions).optional(),
		paymentsNeeded: z.enum(paymentsNeededOptions, {
			message: 'Will you need payment processing?',
		}),
		targetLaunch: z.enum(targetLaunchOptions, {
			message: 'Pick a target launch window.',
		}),

		// Business info
		businessName: z.string().min(1, 'Business name is required.').max(200),
		industry: z
			.string()
			.min(1, 'Industry / business type is required.')
			.max(200),
		location: z.string().min(1, 'City and country are required.').max(200),
		companySize: z.enum(companySizeOptions, {
			message: 'Pick a company size.',
		}),
		yourName: z.string().min(1, 'Your name is required.').max(200),
		email: z.string().email('Enter a valid email.').max(320),
		phone: z.string().min(5, 'Enter a valid phone number.').max(50),
		bestContact: z.enum(bestContactOptions, {
			message: 'Pick the best way to reach you.',
		}),
		consentSMS: z.boolean().optional(),

		// Honeypot — must be empty. Field name matches the API spec
		// (`POST /api/storefront/messages`) so the marketing-site handler
		// can forward the payload without renaming.
		honeypot_url: z.string().max(0).optional(),
	})
	.superRefine((data, ctx) => {
		const needsWeb = needsWebsite(data.needType);
		const needsApp = needsMobile(data.needType);

		if (needsWeb) {
			if (!data.websiteType) {
				ctx.addIssue({
					code: 'custom',
					path: ['websiteType'],
					message: 'Pick the kind of website that fits.',
				});
			}
			if (!data.websiteFeatures || data.websiteFeatures.length === 0) {
				ctx.addIssue({
					code: 'custom',
					path: ['websiteFeatures'],
					message: 'Pick at least one website feature.',
				});
			}
			if (!data.replacingSite) {
				ctx.addIssue({
					code: 'custom',
					path: ['replacingSite'],
					message: 'Let us know if this is a redesign.',
				});
			}
			if (!data.domain) {
				ctx.addIssue({
					code: 'custom',
					path: ['domain'],
					message: 'Tell us about your domain.',
				});
			}
			if (!data.websiteBudget) {
				ctx.addIssue({
					code: 'custom',
					path: ['websiteBudget'],
					message: 'Pick a build budget range.',
				});
			}
			if (!data.hostingBudget) {
				ctx.addIssue({
					code: 'custom',
					path: ['hostingBudget'],
					message: 'Pick a monthly hosting range.',
				});
			}
			if (!data.hostingModel) {
				ctx.addIssue({
					code: 'custom',
					path: ['hostingModel'],
					message: 'Pick a hosting model.',
				});
			}
			if (!data.expectedTraffic) {
				ctx.addIssue({
					code: 'custom',
					path: ['expectedTraffic'],
					message: 'Estimate your monthly traffic.',
				});
			}
		}

		if (needsApp) {
			if (!data.appType) {
				ctx.addIssue({
					code: 'custom',
					path: ['appType'],
					message: 'Pick the kind of app that fits.',
				});
			}
			if (!data.mobileFeatures || data.mobileFeatures.length === 0) {
				ctx.addIssue({
					code: 'custom',
					path: ['mobileFeatures'],
					message: 'Pick at least one mobile feature.',
				});
			}
			if (!data.appStoreAccounts) {
				ctx.addIssue({
					code: 'custom',
					path: ['appStoreAccounts'],
					message: 'Tell us about your developer-account status.',
				});
			}
			if (!data.mobileBudget) {
				ctx.addIssue({
					code: 'custom',
					path: ['mobileBudget'],
					message: 'Pick a mobile-app budget range.',
				});
			}
		}
	});

export type QuoteFormData = z.infer<typeof quoteSchema>;

/**
 * Returns the field names that are active for `step` given the current
 * needType. Used by per-step validation (methods.trigger()) so we don't
 * fail on fields the visitor will never see.
 */
export function getStepFields(
	step: 1 | 2 | 3,
	needType: NeedType | undefined,
): (keyof QuoteFormData)[] {
	const needsWeb = needsWebsite(needType);
	const needsApp = needsMobile(needType);

	if (step === 1) {
		const fields: (keyof QuoteFormData)[] = ['needType'];
		if (needsWeb) {
			fields.push('websiteType', 'websiteFeatures', 'replacingSite', 'domain');
		}
		if (needsApp) {
			fields.push('appType', 'mobileFeatures', 'appStoreAccounts');
		}
		return fields;
	}

	if (step === 2) {
		const fields: (keyof QuoteFormData)[] = [
			'paymentPreference',
			'maintenance',
			'paymentsNeeded',
			'targetLaunch',
		];
		if (needsWeb) {
			fields.push(
				'websiteBudget',
				'hostingBudget',
				'hostingModel',
				'expectedTraffic',
			);
		}
		if (needsApp) {
			fields.push('mobileBudget');
		}
		return fields;
	}

	return [
		'businessName',
		'industry',
		'location',
		'companySize',
		'yourName',
		'email',
		'phone',
		'bestContact',
		'consentSMS',
	];
}
