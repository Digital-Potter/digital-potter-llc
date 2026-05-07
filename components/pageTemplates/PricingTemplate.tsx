import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	PricingHero,
	HowPricingWorks,
	BuildScope,
	BuildYourPlan,
	ComparisonTable,
	PopularCombos,
	PricingFaq,
	DedicatedTierCallout,
} from '@/components/pages/pricing';
import { FinalCta } from '@/components/pages/home';

export async function PricingTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<PricingHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<HowPricingWorks />
			<BuildScope />
			<BuildYourPlan ctaHref={cta.href} ctaLabel="Get a custom proposal" />
			<ComparisonTable />
			<PopularCombos />
			<PricingFaq />
			<DedicatedTierCallout ctaHref={cta.href} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
