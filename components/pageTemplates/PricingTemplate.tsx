import dynamic from 'next/dynamic';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	PricingHero,
	HowPricingWorks,
	BuildScope,
	ComparisonTable,
	PopularCombos,
	PricingFaq,
	DedicatedTierCallout,
} from '@/components/pages/pricing';

// Interactive plan builder — heavy client component, below the fold.
const BuildYourPlan = dynamic(
	() => import('@/components/pages/pricing/BuildYourPlan'),
);
import { PRICING_FAQS } from '@/components/pages/pricing/pricingFaqs';
import { FinalCta } from '@/components/pages/home';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	faqPageSchema,
	webPageSchema,
} from '@/helpers/seo/structuredData';

export async function PricingTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;

	return (
		<>
			{tenant ? (
				<JsonLd
					data={webPageSchema({
						name: `${tenant.settings.storeName} Pricing`,
						description:
							'Transparent pricing for custom websites and mobile apps — one-time build fee plus monthly hosting and CMS.',
						url: '/pricing',
						tenant,
					})}
				/>
			) : null}
			<JsonLd
				data={faqPageSchema(
					PRICING_FAQS.map((f) => ({ question: f.question, answer: f.answer })),
				)}
			/>
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
