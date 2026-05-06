import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	AboutHero,
	OurStory,
	WhyChooseCustom,
	CoreValues,
	WhyWeBuiltTheDavid,
} from '@/components/pages/about';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'About Digital Potter — Custom Web & Mobile Development Studio',
	description:
		'Digital Potter LLC is a small Virginia studio building custom Next.js websites, native mobile apps, and a managed headless CMS. 20+ years of experience, in-house design + dev + DevOps, no templates.',
};

export default async function AboutDigitalPotter() {
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
