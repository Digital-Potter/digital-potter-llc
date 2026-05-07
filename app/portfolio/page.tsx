import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { PortfolioHero, ProjectsGrid } from '@/components/pages/portfolio';
import {
	mapCmsProjectToCard,
	PORTFOLIO_PLACEHOLDERS,
} from '@/components/pages/portfolio/portfolioData';
import { fetchProjectsOrEmpty } from '@/helpers/cms/projects';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Portfolio — Selected Web and App Work from Digital Potter',
	description:
		'A mix of restaurants, retailers, and B2B platforms shipped by Digital Potter LLC. Each one started as a blank page and ended as a custom Next.js build owned by the client.',
};

export default async function PortfolioPage() {
	const cta = await resolveCtaHref();

	// Try CMS first, fall back to placeholders if the API returns empty.
	const { items } = await fetchProjectsOrEmpty({ limit: 50 });
	const projects =
		items.length > 0 ? items.map(mapCmsProjectToCard) : PORTFOLIO_PLACEHOLDERS;

	return (
		<>
			<PortfolioHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<ProjectsGrid projects={projects} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
