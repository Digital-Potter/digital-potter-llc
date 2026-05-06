import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	SelfHostedHero,
	WhySelfHost,
	WhatWeDeliver,
	OngoingOptions,
	LicenseTerms,
	SelfHostedProcess,
	SelfHostedFaq,
} from '@/components/pages/self-hosted';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Self-Hosted theDavid CMS — Run It in Your Own Cloud',
	description:
		'Run theDavid CMS inside your own AWS, GCP, Azure, or on-prem environment. For organizations with data sovereignty, compliance (HIPAA / SOC 2), or scale needs that go beyond the managed plan.',
};

export default async function SelfHostedPage() {
	const cta = await resolveCtaHref();

	return (
		<>
			<SelfHostedHero primaryCtaHref={cta.href} />
			<WhySelfHost />
			<WhatWeDeliver />
			<OngoingOptions />
			<LicenseTerms />
			<SelfHostedProcess />
			<SelfHostedFaq />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
