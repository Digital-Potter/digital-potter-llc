import type { MetadataRoute } from 'next';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import { fetchPages } from '@/helpers/cms/pages';
import { fetchProjectsOrEmpty } from '@/helpers/cms/projects';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import { resolveSiteOrigin } from '@/helpers/seo/structuredData';

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

function absolute(base: string, locOrPath: string): string {
	if (locOrPath.startsWith('http://') || locOrPath.startsWith('https://')) {
		return locOrPath;
	}
	const path = locOrPath.startsWith('/') ? locOrPath : `/${locOrPath}`;
	return `${base}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [data, urls] = await Promise.all([
		fetchStoreSettingsOrNull(),
		getSiteUrls(),
	]);
	const sm = data?.settings?.seo?.sitemap;
	if (sm?.enabled === false) return [];

	const base = resolveSiteOrigin(data?.settings?.storefront?.domain);
	const entries: Entry[] = [];

	entries.push({ url: base, lastModified: new Date(), priority: 1.0 });

	if (sm?.includePages !== false) {
		try {
			const pages = await fetchPages();
			for (const p of pages) {
				if (!p.slug) continue;
				entries.push({
					url: absolute(base, `/${p.slug}`),
					lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
					priority: 0.8,
				});
			}
		} catch {
			// degrade silently — empty sitemap is better than failed build
		}
	}

	if (sm?.includeBlog !== false) {
		const blog = await fetchBlogPostsOrEmpty({ limit: 500 });
		const blogCategories = new Map<string, string>();
		entries.push({ url: absolute(base, urls.blogIndex), priority: 0.8 });
		for (const post of blog.items) {
			entries.push({
				url: absolute(base, urls.blogPost(post.slug)),
				lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
				priority: 0.7,
			});
			for (const cat of post.categories ?? []) {
				if (cat.slug) blogCategories.set(cat.slug, cat.name);
			}
		}
		if (sm?.includeCategories !== false) {
			for (const slug of blogCategories.keys()) {
				entries.push({
					url: absolute(base, urls.blogCategory(slug)),
					priority: 0.6,
				});
			}
		}
	}

	const projectCategories = new Map<string, string>();
	const portfolio = await fetchProjectsOrEmpty({ limit: 500 });
	entries.push({ url: absolute(base, urls.portfolioIndex), priority: 0.8 });
	for (const project of portfolio.items) {
		entries.push({
			url: absolute(base, urls.project(project.slug)),
			lastModified: project.publishedAt
				? new Date(project.publishedAt)
				: undefined,
			priority: 0.7,
		});
		for (const cat of project.categories ?? []) {
			if (cat.slug) projectCategories.set(cat.slug, cat.name);
		}
	}
	if (sm?.includeCategories !== false) {
		for (const slug of projectCategories.keys()) {
			entries.push({
				url: absolute(base, `${urls.portfolioIndex}/category/${slug}`),
				priority: 0.6,
			});
		}
	}

	for (const c of sm?.customUrls ?? []) {
		if (!c.loc) continue;
		entries.push({
			url: absolute(base, c.loc),
			lastModified: c.lastmod ? new Date(c.lastmod) : undefined,
			priority: c.priority,
			changeFrequency: c.changefreq,
		});
	}

	const seen = new Set<string>();
	return entries.filter((e) => {
		if (seen.has(e.url)) return false;
		seen.add(e.url);
		return true;
	});
}
