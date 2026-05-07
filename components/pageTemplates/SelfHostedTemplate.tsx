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

export async function SelfHostedTemplate() {
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
