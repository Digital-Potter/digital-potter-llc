import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

export function TextSection({ section }: { section: CmsSection }) {
	const c = section.content as { body?: string } | undefined;
	return (
		<Section paddingY="medium" layout="narrow">
			{section.title && <h2 className="text-3xl font-bold">{section.title}</h2>}
			{c?.body && (
				<div className="prose prose-neutral mt-4 whitespace-pre-wrap">
					{c.body}
				</div>
			)}
		</Section>
	);
}
