import dynamic from 'next/dynamic';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	HomeHero,
	TripleUsp,
	ArtOfPottery,
	ValueCallouts,
	BlogTeaser,
	PricingTeaser,
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
 */
export async function HomepageTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<HomeHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<TripleUsp />
			<ArtOfPottery />
			<TabbedServices />
			<ValueCallouts />
			<SocialProof />
			<BlogTeaser />
			<PricingTeaser />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
