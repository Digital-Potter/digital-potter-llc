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

export default async function Home() {
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
