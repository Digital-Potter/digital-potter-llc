import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { PortfolioHero, ProjectsGrid } from '@/components/pages/portfolio';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Portfolio — Selected Web and App Work from Digital Potter',
	description:
		'A mix of restaurants, retailers, and B2B platforms shipped by Digital Potter LLC. Each one started as a blank page and ended as a custom Next.js build owned by the client.',
};

export default async function PortfolioPage() {
	const cta = await resolveCtaHref();

	return (
		<>
			<PortfolioHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<ProjectsGrid />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
