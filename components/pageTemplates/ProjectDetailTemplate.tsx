import dynamic from 'next/dynamic';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { PageSectionRenderer } from '@/components/sections/PageSectionRenderer';
import { ProjectHeader, ProjectBody } from '@/components/pages/portfolio';

// Interactive paginated gallery — only loads when there are gallery images.
const ProjectGallery = dynamic(
	() => import('@/components/pages/portfolio/ProjectGallery'),
);
import ClosingCta from '@/components/shared/ClosingCta';
import TestimonialQuote from '@/components/shared/TestimonialQuote';
import { testimonials } from '@/components/shared/testimonials.data';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import type { CmsProject } from '@/helpers/cms/types';
import { JsonLd, creativeWorkSchema } from '@/helpers/seo/structuredData';

type ProjectDetailTemplateProps = {
	project: CmsProject;
};

export async function ProjectDetailTemplate({
	project,
}: ProjectDetailTemplateProps) {
	const [cta, urls, settings] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchStoreSettingsOrNull(),
	]);

	const tenant = settings?.tenant;
	const ldData =
		project.seo?.structuredData ||
		(tenant ? creativeWorkSchema(project, urls, tenant) : null);
	const clientQuote = testimonials.find((t) => t.projectSlug === project.slug);

	return (
		<>
			<JsonLd data={ldData} />
			<ProjectHeader project={project} urls={urls} />
			{project.content ? <ProjectBody html={project.content} /> : null}
			{project.gallery && project.gallery.length > 0 ? (
				<ProjectGallery images={project.gallery} title="Gallery" />
			) : null}
			{project.sections && project.sections.length > 0 ? (
				<PageSectionRenderer sections={project.sections} />
			) : null}
			{clientQuote ? <TestimonialQuote id={clientQuote.id} /> : null}
			<ClosingCta
				heading="Want results like this for your business?"
				body="Every project here started with a free 45-minute discovery call. Tell us what you're building and leave with a plan and an honest price."
				secondaryHref={cta.href}
				secondaryLabel={cta.label}
			/>
		</>
	);
}
