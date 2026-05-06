import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type HtmlContent = {
	html?: string;
};

export function HtmlSection({ section }: { section: CmsSection }) {
	const c = section.content as HtmlContent | undefined;
	if (!c?.html) return null;
	// CMS content is trusted — only admins author it. If untrusted input ever lands here, add DOMPurify.
	return (
		<Section layout="narrow">
			{section.title && <h2 className="mb-6 text-balance">{section.title}</h2>}
			<div
				className="text-dp-body/85 prose-base md:prose-lg max-w-none"
				dangerouslySetInnerHTML={{ __html: c.html }}
			/>
		</Section>
	);
}
