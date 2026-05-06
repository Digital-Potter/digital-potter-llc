import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	HomeHero,
	ArtOfPottery,
	ServicePillars,
	ValueCallouts,
	FinalCta,
} from '@/components/pages/home';

export default async function Home() {
	const cta = await resolveCtaHref();

	return (
		<>
			<HomeHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<ArtOfPottery />
			<ServicePillars />
			<ValueCallouts />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
