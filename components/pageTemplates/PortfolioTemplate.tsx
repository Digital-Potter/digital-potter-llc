import { resolveCtaHref } from '@/components/layout/cta-href';
import { PortfolioHero, ProjectsGrid } from '@/components/pages/portfolio';
import {
	mapCmsProjectToCard,
	PORTFOLIO_PLACEHOLDERS,
} from '@/components/pages/portfolio/portfolioData';
import { fetchProjectsOrEmpty } from '@/helpers/cms/projects';
import { getSiteUrls } from '@/helpers/cms/urls';
import { FinalCta } from '@/components/pages/home';

/**
 * Portfolio listing template. Pulls published projects from the storefront
 * and falls back to placeholder cards if the API returns nothing. Used by
 * the dynamic catch-all whenever the URL's first segment matches the
 * configured `siteStructure.projectsSlug` (defaults to `portfolio`).
 */
export async function PortfolioTemplate() {
	const [cta, urls, list] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchProjectsOrEmpty({ limit: 50 }),
	]);
	const projects =
		list.items.length > 0
			? list.items.map((p) => mapCmsProjectToCard(p, urls))
			: PORTFOLIO_PLACEHOLDERS;

	return (
		<>
			<PortfolioHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<ProjectsGrid projects={projects} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
