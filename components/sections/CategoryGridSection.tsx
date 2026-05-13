import { Section } from './Section';
import type { CmsSection } from '@/helpers/cms/types';

type CategoryGridContent = {
	resource?: 'product' | 'course' | 'blog';
	source?: 'top_level' | 'all' | 'manual';
	categoryIds?: string[];
	limit?: number;
};

/**
 * The marketing site doesn't yet expose product/course catalogs, and blog
 * categories don't have a dedicated storefront list endpoint. Render a
 * minimal heading-only section so editors see something but no broken grid.
 * Wire categories properly once a category index endpoint exists.
 */
export function CategoryGridSection({ section }: { section: CmsSection }) {
	const c = section.content as CategoryGridContent | undefined;
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			`[cms] CategoryGridSection (resource=${c?.resource ?? 'unknown'}) is not yet wired on the marketing site.`,
		);
	}
	if (!section.title && !section.subtitle) return null;
	return (
		<Section settings={section.settings}>
			<div className="mx-auto max-w-4xl text-center">
				{section.title && <h2 className="text-balance">{section.title}</h2>}
				{section.subtitle && (
					<p className="text-dp-body-soft mt-4 text-balance">
						{section.subtitle}
					</p>
				)}
			</div>
		</Section>
	);
}
