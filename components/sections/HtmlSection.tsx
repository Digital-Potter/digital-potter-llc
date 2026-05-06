import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

export function HtmlSection({ section }: { section: CmsSection }) {
	const c = section.content as { html?: string } | undefined;
	if (!c?.html) return null;
	// CMS content is trusted — only admins author it. If untrusted input ever lands here, add DOMPurify.
	return (
		<Section layout="narrow">
			{section.title && (
				<h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
			)}
			<div dangerouslySetInnerHTML={{ __html: c.html }} />
		</Section>
	);
}
