import dynamic from 'next/dynamic';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	HomeHero,
	TrustBar,
	TripleUsp,
	DavidShowcase,
	HowItWorks,
	WhoWeHelp,
	BlogTeaser,
	PricingTeaser,
	HomeFaq,
	FinalCta,
} from '@/components/pages/home';

// Below-the-fold interactive widgets — split into their own chunks so the
// initial homepage payload stays small. They still SSR for SEO.
const TabbedServices = dynamic(
	() => import('@/components/pages/home/TabbedServices'),
);
const SocialProof = dynamic(
	() => import('@/components/pages/home/SocialProof'),
);

/**
 * Templates intentionally ignore CMS page content for now — the user wants
 * to keep the static layout and only let the CMS drive URL/SEO. Templates
 * render their own static body and resolve their own CTA from settings.
 *
 * Section order follows a product-led narrative: show theDavid early
 * (hero + tour), prove it (trust bar, testimonials), explain the path
 * (how it works, services), then close (pricing, FAQ, CTA).
 */
export async function HomepageTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<HomeHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<TrustBar />
			<TripleUsp />
			<DavidShowcase />
			<HowItWorks />
			<TabbedServices />
			<WhoWeHelp />
			<SocialProof />
			<PricingTeaser />
			<HomeFaq />
			<BlogTeaser />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
