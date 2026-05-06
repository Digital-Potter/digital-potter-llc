import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProjectBySlug } from '@/helpers/cms/projects';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { PageSectionRenderer } from '@/components/sections/PageSectionRenderer';
import { ProjectHeader } from '@/components/pages/portfolio';
import { FinalCta } from '@/components/pages/home';

type Params = { slug: string };

async function getProject(slug: string) {
	try {
		return await fetchProjectBySlug(slug);
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project) {
		return {
			title: 'Case study not found',
			robots: { index: false, follow: false },
		};
	}
	return {
		title: project.seo?.metaTitle ?? `${project.title} — Digital Potter`,
		description: project.seo?.metaDescription ?? project.excerpt,
		openGraph: project.seo?.ogImage
			? { images: [project.seo.ogImage] }
			: project.featuredImage?.url
				? { images: [project.featuredImage.url] }
				: undefined,
		alternates: project.seo?.canonicalUrl
			? { canonical: project.seo.canonicalUrl }
			: undefined,
		robots: project.seo?.noIndex ? { index: false, follow: false } : undefined,
	};
}

export default async function PortfolioDetailPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project) notFound();

	const cta = await resolveCtaHref();

	return (
		<>
			<ProjectHeader project={project} />
			{project.sections && project.sections.length > 0 ? (
				<PageSectionRenderer sections={project.sections} />
			) : null}
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
