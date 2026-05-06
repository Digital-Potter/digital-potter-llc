import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	CmsHero,
	WhyWeBuiltIt,
	CmsFeatures,
	UnderTheHood,
	CmsComparison,
} from '@/components/pages/cms';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title:
		'theDavid CMS — The Headless Content Platform Behind Every Digital Potter Site',
	description:
		'theDavid is the multi-tenant headless CMS Digital Potter built for our own clients. Editorial control for your team, headless flexibility for your custom Next.js frontend, no plugin marketplace required.',
};

export default async function CmsPage() {
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
