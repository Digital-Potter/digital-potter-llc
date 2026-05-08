import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	CmsHero,
	WhyWeBuiltIt,
	CmsFeatures,
	UnderTheHood,
	CmsComparison,
} from '@/components/pages/cms';
import { FinalCta } from '@/components/pages/home';
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
				url: '/cms',
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
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
