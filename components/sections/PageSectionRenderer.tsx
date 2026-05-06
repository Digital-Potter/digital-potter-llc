import type { CmsSection } from '@/helpers/cms/types';
import { HeroSection } from './HeroSection';
import { TextSection } from './TextSection';
import { ImageSection } from './ImageSection';
import { GallerySection } from './GallerySection';
import { CtaSection } from './CtaSection';
import { FeatureGridSection } from './FeatureGridSection';
import { TestimonialsSection } from './TestimonialsSection';
import { VideoSection } from './VideoSection';
import { FaqSection } from './FaqSection';
import { ContactFormSection } from './ContactFormSection';
import { HtmlSection } from './HtmlSection';
import { BlogFeedSection } from './BlogFeedSection';
import { ProductListSection } from './ProductListSection';
import { CourseListSection } from './CourseListSection';
import { BlogListSection } from './BlogListSection';
import { CategoryGridSection } from './CategoryGridSection';

const map = {
	HERO: HeroSection,
	TEXT: TextSection,
	IMAGE: ImageSection,
	GALLERY: GallerySection,
	CTA: CtaSection,
	FEATURE_GRID: FeatureGridSection,
	TESTIMONIALS: TestimonialsSection,
	VIDEO: VideoSection,
	FAQ: FaqSection,
	CONTACT_FORM: ContactFormSection,
	HTML: HtmlSection,
	BLOG_FEED: BlogFeedSection,
	PRODUCT_LIST: ProductListSection,
	COURSE_LIST: CourseListSection,
	BLOG_LIST: BlogListSection,
	CATEGORY_GRID: CategoryGridSection,
} as const;

type SectionTypeKey = keyof typeof map;

/**
 * Normalize a CMS section type string to the map key. Accepts any of:
 *   "hero", "Hero", "HERO", "feature-grid", "feature_grid", "FEATURE_GRID"
 * and returns the canonical SCREAMING_SNAKE form. Unknown types return null.
 */
function normalizeType(raw: string | undefined): SectionTypeKey | null {
	if (!raw) return null;
	const key = raw.toUpperCase().replace(/-/g, '_');
	return key in map ? (key as SectionTypeKey) : null;
}

export function PageSectionRenderer({ sections }: { sections: CmsSection[] }) {
	const ordered = [...sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	return (
		<>
			{ordered.map((s, i) => {
				const key = normalizeType(s._type);
				if (!key) return null;
				const Comp = map[key];
				return <Comp key={s._id ?? i} section={s} />;
			})}
		</>
	);
}
