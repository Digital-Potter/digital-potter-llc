import { z } from 'zod';

// ---- Step 1: Type of project needed ----

export const projectTypeOptions = [
	'New marketing site',
	'Ecommerce',
	'Restaurant',
	'Booking & Events',
	'Membership / Subscription',
	'Custom web app',
	'Not sure yet',
] as const;

export const functionalityOptions = [
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

// ---- Step 2: Budget and timelines ----

export const hostingBudgetOptions = [
	'$100 – $300 / month',
	'$300 – $600 / month',
	'$600 – $1500 / month',
	'$1500+ / month',
	'Enterprise (self-host)',
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

export const stripeOptions = ['Yes', 'No', 'Not sure'] as const;

export const targetLaunchOptions = [
	'ASAP (< 1 month)',
	'1 – 3 months',
	'3 – 6 months',
	'Just exploring',
] as const;

// ---- Step 3: Personal and business info ----

export const companySizeOptions = [
	'Solo',
	'2 – 10',
	'11 – 50',
	'51 – 200',
	'200+',
] as const;

export const bestContactOptions = ['Email', 'Phone', 'Either'] as const;

// ---- Schemas ----

export const stepProjectSchema = z.object({
	projectType: z.enum(projectTypeOptions, {
		message: 'Pick the type of project that fits best.',
	}),
	functionalities: z
		.array(z.enum(functionalityOptions))
		.min(1, 'Select at least one functionality.'),
	replacingSite: z.enum(replacingSiteOptions, {
		message: 'Let us know if this is a redesign.',
	}),
	domain: z.enum(domainOptions, {
		message: 'Tell us about your domain.',
	}),
});

export const stepBudgetSchema = z.object({
	hostingBudget: z.enum(hostingBudgetOptions, {
		message: 'Pick a monthly hosting range.',
	}),
	paymentPreference: z.enum(paymentPreferenceOptions, {
		message: 'How would you like to pay for the build?',
	}),
	maintenance: z.enum(maintenanceOptions, {
		message: 'Pick a maintenance preference.',
	}),
	hostingModel: z.enum(hostingModelOptions, {
		message: 'Pick a hosting model.',
	}),
	expectedTraffic: z.enum(expectedTrafficOptions, {
		message: 'Estimate your monthly traffic.',
	}),
	needsStripe: z.enum(stripeOptions, {
		message: 'Will you need payments?',
	}),
	targetLaunch: z.enum(targetLaunchOptions, {
		message: 'Pick a target launch window.',
	}),
});

export const stepBusinessSchema = z.object({
	businessName: z.string().min(1, 'Business name is required.').max(200),
	industry: z.string().min(1, 'Industry / business type is required.').max(200),
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
});

export const quoteSchema = stepProjectSchema
	.merge(stepBudgetSchema)
	.merge(stepBusinessSchema)
	.extend({
		// Honeypot — must be empty. Bots tend to fill every field.
		website: z.string().max(0).optional(),
	});

export type QuoteFormData = z.infer<typeof quoteSchema>;

export const stepFieldNames = {
	1: [
		'projectType',
		'functionalities',
		'replacingSite',
		'domain',
	] satisfies (keyof QuoteFormData)[],
	2: [
		'hostingBudget',
		'paymentPreference',
		'maintenance',
		'hostingModel',
		'expectedTraffic',
		'needsStripe',
		'targetLaunch',
	] satisfies (keyof QuoteFormData)[],
	3: [
		'businessName',
		'industry',
		'location',
		'companySize',
		'yourName',
		'email',
		'phone',
		'bestContact',
	] satisfies (keyof QuoteFormData)[],
} as const;
