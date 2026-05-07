import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	CmsHero,
	WhyWeBuiltIt,
	CmsFeatures,
	UnderTheHood,
	CmsComparison,
} from '@/components/pages/cms';
import { FinalCta } from '@/components/pages/home';

export async function CmsMarketingTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<CmsHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<WhyWeBuiltIt />
			<CmsFeatures />
			<UnderTheHood />
			<CmsComparison />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
