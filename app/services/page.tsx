import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	ServicesHero,
	ServiceSection,
	CraftingProcess,
	PenIcon,
	MobileIcon,
	CodeIcon,
	LayersIcon,
} from '@/components/pages/services';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Services — Custom Web, Mobile, and CMS Development',
	description:
		'Four services from Digital Potter LLC: UI/UX design, native and cross-platform mobile apps, custom Next.js websites, and managed CMS + SEO + maintenance. Every engagement starts with research, not a template.',
};

export default async function ServicesPage() {
	const cta = await resolveCtaHref();

	return (
		<>
			<ServicesHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />

			<ServiceSection
				id="design"
				tag="Service · UI/UX Design"
				badge="Most popular"
				headline="Designs built around how your customers actually behave."
				body="We start with research, not Pinterest. We map your real users' journeys, audit how competitors fail them, and design every screen to move people toward the action that matters: contact, purchase, sign-up. The result is a brand experience that looks like it was built for you — because it was."
				bullets={[
					'User research and journey mapping for your specific audience',
					'Competitor analysis that surfaces unmet needs',
					'Custom visual design systems — no themes, no templates',
					'WCAG 2.1 AA accessibility from day one, on every device size',
					'Conversion-focused layouts that move visitors through your funnel',
					'Logo and brand exploration if you don’t have one yet',
					'Content creation guidance using the materials you already have',
				]}
				icon={PenIcon}
				ctaHref={cta.href}
				ctaLabel="Start a UI/UX project"
			/>

			<ServiceSection
				id="mobile"
				tag="Service · Mobile Apps"
				headline="Cross-platform apps that earn home-screen space."
				body="Your customers spend their day on their phone. We build the apps they keep coming back to using React Native and Expo — one codebase, both stores, native-quality performance. Same engineering hours that competitors spend on iOS alone, you get iOS and Android. Read the deep dive on our stack and process for the full picture."
				bullets={[
					'React Native + Expo for one codebase across iOS and Android',
					'EAS Build and Submit for cloud signing and store automation',
					'Over-the-air updates for same-day fixes after launch',
					'App Store and Google Play submission, review, and release management',
					'Push notifications, deep links, biometric auth, and in-app purchases',
					'Stripe-powered payments through your own Stripe account',
					'Crash reporting and analytics from launch day',
				]}
				icon={MobileIcon}
				reverse
				ctaHref="/mobile-development"
				ctaLabel="Read about mobile development"
			/>

			<ServiceSection
				id="web"
				tag="Service · All-Size Websites"
				headline="From a one-page launch to a multi-region storefront."
				body="Whether you need a marketing site to land your first ten customers or a high-traffic ecommerce engine to scale a brand, we build sites that hold up under load and search. Every site is custom Next.js — fast, SEO-ready from the first commit, and entirely yours to keep when our engagement ends."
				bullets={[
					'Marketing sites, landing pages, and product launches',
					'Ecommerce with Stripe, inventory, and order management',
					'Multi-language and multi-region support when you grow internationally',
					'Performance budgets enforced — every page under 2-second load time',
					'SEO architecture (schema, sitemaps, OG, canonical) baked in from day one',
					'Headless CMS integration for content team self-service',
					'Analytics and conversion tracking on every meaningful event',
				]}
				icon={CodeIcon}
				ctaHref={cta.href}
				ctaLabel="Build a website"
			/>

			<ServiceSection
				id="ops"
				tag="Service · SEO, CMS & Maintenance"
				headline="We don’t disappear after launch."
				body="Most agencies build and bounce. We build and stay. Our managed CMS lets your team update content without engineers, our DevOps team keeps the lights on around the clock, and our SEO work keeps you findable as Google's rules — and AI-search engines — keep changing."
				bullets={[
					'Our managed CMS — your team owns content, no developer in the loop',
					'99.9% uptime monitoring with on-call response and incident postmortems',
					'Monthly security patches and dependency updates',
					'Technical SEO audits, schema work, and rank monitoring',
					'Daily backups, disaster recovery, and full ownership of your codebase',
					'Quarterly performance reviews and optimization passes',
					'Hosting + CMS from $50/mo — flat fee, no traffic gates',
				]}
				icon={LayersIcon}
				reverse
				ctaHref={cta.href}
				ctaLabel="Talk to us about ongoing support"
			/>

			<CraftingProcess />

			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
