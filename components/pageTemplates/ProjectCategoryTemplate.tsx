import { notFound } from 'next/navigation';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { ProjectsGrid } from '@/components/pages/portfolio';
import { mapCmsProjectToCard } from '@/components/pages/portfolio/portfolioData';
import { fetchProjectsOrEmpty } from '@/helpers/cms/projects';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import { FinalCta } from '@/components/pages/home';
import { JsonLd, collectionPageSchema } from '@/helpers/seo/structuredData';

export async function ProjectCategoryTemplate({
	categorySlug,
}: {
	categorySlug: string;
}) {
	const [cta, urls, settings, list] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchStoreSettingsOrNull(),
		fetchProjectsOrEmpty({ category: categorySlug, limit: 50 }),
	]);

	if (list.items.length === 0) notFound();

	const categoryName =
		list.items[0].categories?.find((c) => c.slug === categorySlug)?.name ??
		categorySlug;
	const projects = list.items.map((p) => mapCmsProjectToCard(p, urls));
	const url = `${urls.portfolioIndex}/category/${categorySlug}`;

	const tenant = settings?.tenant;
	const ldData = tenant
		? collectionPageSchema({
				type: 'CollectionPage',
				name: `${categoryName} — ${tenant.settings.storeName} Portfolio`,
				description: `Case studies in the ${categoryName} category.`,
				url,
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
			<section className="dp-container py-16 md:py-24">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						Category
					</p>
					<h1 className="mt-6 text-balance">{categoryName}</h1>
					<p className="text-dp-body/60 mt-6 text-sm">
						{list.total} {list.total === 1 ? 'project' : 'projects'} in this
						category.
					</p>
				</div>
			</section>
			<ProjectsGrid projects={projects} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
