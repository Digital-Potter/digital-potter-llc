import { resolveCtaHref } from '@/components/layout/cta-href';
import { PageSectionRenderer } from '@/components/sections/PageSectionRenderer';
import {
	ProjectHeader,
	ProjectBody,
	ProjectGallery,
} from '@/components/pages/portfolio';
import { FinalCta } from '@/components/pages/home';
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
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
