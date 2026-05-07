import type { CmsBlogPost } from '@/helpers/cms/types';

// Placeholder blog posts. The page falls back to these only if the API
// returns an empty list — published posts always win.

export type BlogPostCard = {
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	readTime?: string;
	publishedAt?: string;
	featuredImage?: { url: string; alt?: string };
};

export const BLOG_PLACEHOLDERS: BlogPostCard[] = [
	{
		slug: 'why-we-built-our-own-cms',
		title: 'Why we built our own CMS instead of using WordPress.',
		excerpt:
			"WordPress gets you 80% of the way there and bleeds you on the last 20%. Here's why we shipped our own headless CMS, and the three trade-offs we made on purpose.",
		category: 'Engineering',
		readTime: '6 min read',
		publishedAt: '2026-04-22',
	},
	{
		slug: 'the-cost-of-free-websites',
		title: 'The hidden cost of "free" websites for small businesses.',
		excerpt:
			"Wix and Squarespace are cheap until they aren't. We break down the real five-year cost of template platforms versus owning a custom Next.js site — including the trap most owners don't see coming.",
		category: 'Business',
		readTime: '5 min read',
		publishedAt: '2026-04-08',
	},
	{
		slug: 'designing-for-conversion',
		title:
			'Designing for conversion: 5 patterns that actually move the needle.',
		excerpt:
			'Pretty designs are easy. Designs that move people through your funnel are not. Here are five layout patterns we use on every Digital Potter site, with before/after data from real client sites.',
		category: 'Design',
		readTime: '7 min read',
		publishedAt: '2026-03-26',
	},
	{
		slug: 'react-native-expo-when-it-wins',
		title: 'React Native + Expo: when cross-platform actually wins.',
		excerpt:
			'Native Swift will always be faster on paper. But for 95% of the apps SMBs need, that gap is invisible — and the cost difference is anything but. The decision matrix we run on every mobile project.',
		category: 'Engineering',
		readTime: '8 min read',
		publishedAt: '2026-03-12',
	},
	{
		slug: 'from-plitz-to-digital-potter',
		title: 'From Plitz Corporation to Digital Potter: 20 years of custom web.',
		excerpt:
			"Two decades of building websites and apps, three rebrands, one principle that hasn't changed. The story behind the studio and what we learned along the way.",
		category: 'Story',
		readTime: '9 min read',
		publishedAt: '2026-02-26',
	},
	{
		slug: 'pricing-custom-websites',
		title:
			"Pricing custom websites: why we publish numbers and most agencies don't.",
		excerpt:
			'"Get in touch for a quote" is what agencies say when they want to size you up first. We publish a starting price because we trust our clients to read it as a starting price — and we trust ourselves to scope honestly.',
		category: 'Business',
		readTime: '6 min read',
		publishedAt: '2026-02-12',
	},
];

const WORDS_PER_MINUTE = 220;

function estimateReadTime(html?: string): string | undefined {
	if (!html) return undefined;
	const text = html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	if (!text) return undefined;
	const words = text.split(/\s+/).length;
	const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	return `${minutes} min read`;
}

/** Map a CMS blog post (list or detail shape) to the card the UI renders. */
export function mapCmsBlogPostToCard(p: CmsBlogPost): BlogPostCard {
	return {
		slug: p.slug,
		title: p.title,
		excerpt: p.excerpt ?? '',
		category: p.categories?.[0]?.name ?? 'Article',
		readTime: estimateReadTime(p.content),
		publishedAt: p.publishedAt,
		featuredImage: p.featuredImage,
	};
}
