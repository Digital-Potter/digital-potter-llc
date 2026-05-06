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

export function PageSectionRenderer({ sections }: { sections: CmsSection[] }) {
	const ordered = [...sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	return (
		<>
			{ordered.map((s, i) => {
				const Comp = map[s._type as keyof typeof map];
				if (!Comp) return null;
				return <Comp key={s._id ?? i} section={s} />;
			})}
		</>
	);
}
