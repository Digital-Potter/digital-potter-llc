import type { Metadata } from 'next';
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

export const metadata: Metadata = {
	title: 'Pricing — Custom Web & CMS, $50/month + One-Time Build',
	description:
		'Simple Digital Potter pricing: $50/month flat for hosting and CMS, plus a one-time custom frontend build from $3,500. No traffic gates, no per-page fees, no transaction fees, no lock-in. Add modules only if your business needs them.',
};

export default async function PricingPage() {
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
