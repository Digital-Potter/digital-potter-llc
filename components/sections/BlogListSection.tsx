import Image from 'next/image';
import Link from 'next/link';
import { Section } from './Section';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import { getSiteUrls } from '@/helpers/cms/urls';
import type { CmsSection } from '@/helpers/cms/types';

type BlogListContent = {
	source?: 'manual' | 'category' | 'tag' | 'latest';
	limit?: number;
	sort?: string;
	categoryIds?: string[];
	tags?: string[];
	items?: string[];
};

/**
 * Renders a list of blog posts. The admin's ContentListEditor writes
 * `source` + filter fields, but the storefront blog endpoint currently only
 * exposes paged latest posts. Until filter params are added server-side,
 * we render the latest N posts (limit) and ignore source/categoryIds/tags.
 */
export async function BlogListSection({ section }: { section: CmsSection }) {
	const c = section.content as BlogListContent | undefined;
	const limit = c?.limit ?? 6;
	const r = await fetchBlogPostsOrEmpty({ limit });
	if (r.items.length === 0) return null;
	const urls = await getSiteUrls();

	return (
		<Section settings={section.settings}>
			{section.title && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					<h2 className="text-balance">{section.title}</h2>
					{section.subtitle && (
						<p className="text-dp-body/80 mt-4 text-balance">
							{section.subtitle}
						</p>
					)}
				</div>
			)}
			<ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{r.items.map((p) => (
					<li key={p._id}>
						<Link href={urls.blogPost(p.slug)} className="group block h-full">
							{p.featuredImage?.url ? (
								<div className="dp-box-design relative aspect-video w-full overflow-hidden rounded-2xl">
									<Image
										src={p.featuredImage.url}
										alt={p.featuredImage.alt ?? ''}
										fill
										sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
										className="object-cover"
									/>
								</div>
							) : (
								<div className="dp-box-design from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 aspect-video w-full rounded-2xl bg-gradient-to-br" />
							)}
							<h3 className="font-primary-font group-hover:text-dp-dark-green mt-4 text-xl font-bold transition-colors md:text-2xl">
								{p.title}
							</h3>
							{p.excerpt && (
								<p className="text-dp-body/75 mt-3 text-base">{p.excerpt}</p>
							)}
						</Link>
					</li>
				))}
			</ul>
		</Section>
	);
}
