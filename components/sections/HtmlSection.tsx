import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type HtmlContent = {
	/** Admin source of truth. */
	htmlContent?: string;
	/** Legacy. */
	html?: string;
};

export function HtmlSection({ section }: { section: CmsSection }) {
	const c = section.content as HtmlContent | undefined;
	const html = c?.htmlContent ?? c?.html;
	if (!html) return null;
	// CMS content is trusted — only admins author it. If untrusted input ever
	// lands here, sanitize before rendering.
	return (
		<Section settings={section.settings} layout="narrow">
			{section.title && <h2 className="mb-6 text-balance">{section.title}</h2>}
			<div
				className="prose prose-base md:prose-lg prose-p:text-dp-body/85 prose-a:text-dp-dark-green hover:prose-a:text-dp-green max-w-none"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</Section>
	);
}
