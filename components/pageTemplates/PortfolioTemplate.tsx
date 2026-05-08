import { resolveCtaHref } from '@/components/layout/cta-href';
import { PortfolioHero, ProjectsGrid } from '@/components/pages/portfolio';
import {
	mapCmsProjectToCard,
	PORTFOLIO_PLACEHOLDERS,
} from '@/components/pages/portfolio/portfolioData';
import { fetchProjectsOrEmpty } from '@/helpers/cms/projects';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import { FinalCta } from '@/components/pages/home';
import { JsonLd, collectionPageSchema } from '@/helpers/seo/structuredData';

/**
 * Portfolio listing template. Pulls published projects from the storefront
 * and falls back to placeholder cards if the API returns nothing. Used by
 * the dynamic catch-all whenever the URL's first segment matches the
 * configured `siteStructure.projectsSlug` (defaults to `portfolio`).
 */
export async function PortfolioTemplate() {
	const [cta, urls, list, settings] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchProjectsOrEmpty({ limit: 50 }),
		fetchStoreSettingsOrNull(),
	]);
	const projects =
		list.items.length > 0
			? list.items.map((p) => mapCmsProjectToCard(p, urls))
			: PORTFOLIO_PLACEHOLDERS;

	const tenant = settings?.tenant;
	const ldData = tenant
		? collectionPageSchema({
				type: 'CollectionPage',
				name: `${tenant.settings.storeName} Portfolio`,
				description:
					'Selected case studies of websites and apps shipped by Digital Potter.',
				url: urls.portfolioIndex,
				itemType: 'CreativeWork',
				items: projects
					.filter((p) => Boolean(p.href))
					.map((p) => ({
						name: p.title,
						url: p.href as string,
						image: p.featuredImage?.url,
						description: p.excerpt,
					})),
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<PortfolioHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<ProjectsGrid projects={projects} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
