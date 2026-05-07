import { resolveCtaHref } from '@/components/layout/cta-href';
import { PageSectionRenderer } from '@/components/sections/PageSectionRenderer';
import {
	ProjectHeader,
	ProjectBody,
	ProjectGallery,
} from '@/components/pages/portfolio';
import { FinalCta } from '@/components/pages/home';
import { getSiteUrls } from '@/helpers/cms/urls';
import type { CmsProject } from '@/helpers/cms/types';

type ProjectDetailTemplateProps = {
	project: CmsProject;
};

export async function ProjectDetailTemplate({
	project,
}: ProjectDetailTemplateProps) {
	const [cta, urls] = await Promise.all([resolveCtaHref(), getSiteUrls()]);

	return (
		<>
			{project.seo?.structuredData ? (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: project.seo.structuredData }}
				/>
			) : null}
			<ProjectHeader project={project} backHref={urls.portfolioIndex} />
			{project.content ? <ProjectBody html={project.content} /> : null}
			{project.gallery && project.gallery.length > 0 ? (
				<ProjectGallery images={project.gallery} title="Gallery" />
			) : null}
			{project.sections && project.sections.length > 0 ? (
				<PageSectionRenderer sections={project.sections} />
			) : null}
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
