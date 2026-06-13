import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	ServicesHero,
	ServiceSection,
	CraftingProcess,
	NotSureChooser,
	CodeIcon,
	MobileIcon,
	WrenchIcon,
	ServerIcon,
} from '@/components/pages/services';
import ClosingCta from '@/components/shared/ClosingCta';
import TestimonialQuote from '@/components/shared/TestimonialQuote';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function ServicesTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.general,
				url: '/services',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<ServicesHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />

			<ServiceSection
				id="web"
				tag="Service · Web Development"
				badge="Most popular"
				headline="Websites that earn their keep."
				body="Marketing sites, ecommerce, booking-first sites, and multi-region storefronts — hand-crafted Next.js, fast and SEO-ready from the first commit, and yours to keep when our engagement ends."
				bullets={[
					'Custom design from a blank canvas — research, journeys, no themes',
					'SEO architecture and sub-2-second pages from day one',
					'theDavid CMS included — your team runs content without us',
					'Analytics on every meaningful event, so you see what converts',
				]}
				icon={CodeIcon}
				bestFor="Getting found locally and turning visitors into customers"
				startsAt="$1,900"
				ctaHref="/web-services-by-digital-potter"
				ctaLabel="Explore web development"
			/>

			<ServiceSection
				id="mobile"
				tag="Service · Mobile App Development"
				headline="Apps your customers actually keep."
				body="Cross-platform apps built with React Native and Expo — one codebase running on iOS and Android with native performance, App Store-quality UX, and same-day fixes that skip store review."
				bullets={[
					'One codebase, both stores — native look and feel on each',
					'Payments, push notifications, offline mode, biometric auth',
					'Over-the-air updates — ship fixes without waiting on Apple',
					'Store submission, crash reporting, and analytics handled for you',
				]}
				icon={MobileIcon}
				reverse
				bestFor="Bookings, ordering, loyalty, and member experiences on the phone"
				startsAt="$12,500"
				ctaHref="/mobile-development-services"
				ctaLabel="Explore mobile development"
			/>

			<ServiceSection
				id="maintenance"
				tag="Service · Maintenance & Support"
				headline="We build it. We also keep it alive."
				body="Most agencies build and bounce. We build and stay. Three retainer tiers — Care, Studio, Fractional CTO — plus an hourly fallback, so you pick the cadence that matches how often you actually ship."
				bullets={[
					'Uptime monitoring, security patches, and daily backups',
					'Real dev hours every month — changes actually ship',
					'Technical SEO audits and quarterly performance reviews',
					'Fractional CTO advisory when you need a tech partner, not a vendor',
				]}
				icon={WrenchIcon}
				bestFor="Any site or app that makes you money while you sleep"
				startsAt="$399/mo"
				ctaHref="/web-and-mobile-apps-maintenance-services"
				ctaLabel="See retainer plans"
			/>

			<ServiceSection
				id="self-hosted"
				tag="Service · Self-Hosted CMS"
				headline="theDavid CMS, in your cloud."
				body="For organizations with data sovereignty, compliance (HIPAA / SOC 2), or scale needs beyond the managed plan. We deploy theDavid into your AWS, GCP, Azure, or on-prem environment, license the source, and train your team."
				bullets={[
					'You hold the data, the keys, and the audit trail',
					'Compliance-ready architecture — HIPAA, SOC 2, FedRAMP-friendly',
					'Source license — fork it, audit it, extend it',
					'Migration path from the managed plan when you outgrow it',
				]}
				icon={ServerIcon}
				reverse
				bestFor="Regulated industries and platform-scale operations"
				startsAt="Custom-quoted"
				ctaHref="/self-hosted-edition"
				ctaLabel="Explore self-hosting"
			/>

			<NotSureChooser />

			<TestimonialQuote id="ll-hair" />

			<CraftingProcess />

			<ClosingCta
				heading="Stop guessing which service you need."
				body="Bring us the business problem on a free 45-minute call. We'll tell you what to build, what to skip, and what it costs — in plain English."
				secondaryHref="/digital-potter-pricing"
				secondaryLabel="See transparent pricing"
			/>
		</>
	);
}
