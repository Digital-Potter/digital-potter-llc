import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	ServicesHero,
	ServiceSection,
	CraftingProcess,
	CodeIcon,
	MobileIcon,
	WrenchIcon,
	ServerIcon,
} from '@/components/pages/services';
import { FinalCta } from '@/components/pages/home';

export async function ServicesTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<ServicesHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />

			<ServiceSection
				id="web"
				tag="Service · Web Development"
				badge="Most popular"
				headline="Custom Next.js websites that grow with your business."
				body="Marketing sites, ecommerce, booking-first sites, and multi-region storefronts. Every site is hand-crafted Next.js — fast, SEO-ready from the first commit, and yours to keep when our engagement ends. UI/UX research and design are built into every project."
				bullets={[
					'User research, journey mapping, and custom visual design — no themes',
					'Marketing sites, ecommerce, booking flows, multi-region storefronts',
					'Performance budgets enforced — every page under 2 seconds',
					'SEO architecture (schema, sitemaps, OG, canonical) from day one',
					'WCAG 2.1 AA accessibility on every device size',
					'Headless CMS integration for content team self-service',
					'Analytics and conversion tracking on every meaningful event',
				]}
				icon={CodeIcon}
				ctaHref="/web-services"
				ctaLabel="Explore web development"
			/>

			<ServiceSection
				id="mobile"
				tag="Service · Mobile App Development"
				headline="Native-quality apps shipped in half the time."
				body="Cross-platform mobile apps built with React Native and Expo — one codebase that runs on iOS and Android with native performance, App Store-quality UX, and a release cadence that doesn't burn out your team."
				bullets={[
					'Customer-facing apps, internal tools, events, membership apps',
					'Native iOS and Android UI rendered with platform components',
					'Stripe payments, Apple Pay, Google Pay, biometric auth',
					'Push notifications, secure storage, offline-tolerant data',
					'Over-the-air updates via Expo — same-day fixes without store review',
					'App Store and Google Play submission handled for you',
					'Crash reporting and product analytics wired in by default',
				]}
				icon={MobileIcon}
				reverse
				ctaHref="/mobile-development"
				ctaLabel="Explore mobile development"
			/>

			<ServiceSection
				id="maintenance"
				tag="Service · Maintenance & Support"
				headline="We don't disappear after launch."
				body="Most agencies build and bounce. We build and stay. Three retainer tiers (Care, Studio, Fractional CTO) plus hourly when you need it — pick the cadence that fits how often you actually ship."
				bullets={[
					'99.9% uptime monitoring with on-call response and incident postmortems',
					'Monthly security patches and dependency updates',
					'Technical SEO audits, schema work, and rank monitoring',
					'Daily backups, disaster recovery, and full ownership of your codebase',
					'Quarterly performance reviews and optimization passes',
					'Strategic advisory available as a Fractional CTO engagement',
					'Hourly fallback for one-off changes when a retainer doesn’t fit',
				]}
				icon={WrenchIcon}
				ctaHref="/maintenance"
				ctaLabel="See retainer plans"
			/>

			<ServiceSection
				id="self-hosted"
				tag="Service · Self-Hosted CMS"
				headline="Run theDavid CMS in your own cloud."
				body="For organizations with data sovereignty, compliance (HIPAA / SOC 2), or scale needs that go beyond the managed plan. We deploy theDavid into your AWS, GCP, Azure, or on-prem environment, license the source, and train your team."
				bullets={[
					'Deployed into your AWS, GCP, Azure, or on-prem environment',
					'You hold the data, the keys, and the audit trail',
					'Compliance-ready (HIPAA, SOC 2, FedRAMP-friendly architecture)',
					'Source license — fork it, audit it, modify it as your team grows',
					'Optional ongoing engineering support on a separate retainer',
					'Migration assistance from the managed plan when you outgrow it',
				]}
				icon={ServerIcon}
				reverse
				ctaHref="/self-hosted"
				ctaLabel="Explore self-hosting"
			/>

			<CraftingProcess />

			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
