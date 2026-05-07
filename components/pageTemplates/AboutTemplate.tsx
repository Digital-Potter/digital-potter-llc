import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	AboutHero,
	OurStory,
	WhyChooseCustom,
	CoreValues,
	WhyWeBuiltTheDavid,
} from '@/components/pages/about';
import { FinalCta } from '@/components/pages/home';

export async function AboutTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<AboutHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<OurStory />
			<WhyChooseCustom />
			<CoreValues />
			<WhyWeBuiltTheDavid />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
