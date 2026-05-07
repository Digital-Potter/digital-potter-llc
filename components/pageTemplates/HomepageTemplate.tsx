import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	HomeHero,
	TripleUsp,
	ArtOfPottery,
	TabbedServices,
	ValueCallouts,
	SocialProof,
	BlogTeaser,
	PricingTeaser,
	FinalCta,
} from '@/components/pages/home';

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
