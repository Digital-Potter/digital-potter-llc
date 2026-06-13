import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	CmsHero,
	WhyWeBuiltIt,
	CmsFeatures,
	UnderTheHood,
	CmsComparison,
} from '@/components/pages/cms';
import ClosingCta from '@/components/shared/ClosingCta';
import TestimonialQuote from '@/components/shared/TestimonialQuote';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function CmsMarketingTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.cms,
				url: '/the-cms-we-built-for-our-own-clients',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<CmsHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<WhyWeBuiltIt />
			<CmsFeatures />
			<UnderTheHood />
			<CmsComparison />
			<TestimonialQuote id="fellerman-glass" />
			<ClosingCta
				heading="Get theDavid with your next website."
				body="theDavid isn't sold separately — it comes with every site we build, from $1,900 plus $24.99/month. One platform, your content, zero developer dependency."
				secondaryHref="/digital-potter-pricing"
				secondaryLabel="See pricing"
			/>
		</>
	);
}
