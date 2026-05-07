import Link from 'next/link';
import { Section } from './Section';
import { fetchBlogPosts } from '@/helpers/cms/blog';
import { getSiteUrls } from '@/helpers/cms/urls';
import type { CmsSection } from '@/helpers/cms/types';

type BlogFeedContent = {
	/** Admin source of truth. */
	postCount?: number;
	/** Legacy. */
	count?: number;
};

export async function BlogFeedSection({ section }: { section: CmsSection }) {
	const c = section.content as BlogFeedContent | undefined;
	const limit = c?.postCount ?? c?.count ?? 3;
	let items: Awaited<ReturnType<typeof fetchBlogPosts>>['items'] = [];
	try {
		const r = await fetchBlogPosts(1, limit);
		items = r.items;
	} catch {
		// CMS unavailable — render empty silently
	}
	if (items.length === 0) return null;
	const urls = await getSiteUrls();
	return (
		<Section settings={section.settings}>
			{section.title && (
				<div className="mx-auto mb-10 max-w-4xl text-center">
					<h2 className="text-balance">{section.title}</h2>
				</div>
			)}
			<ul className="grid gap-8 md:grid-cols-3">
				{items.map((p) => (
					<li key={p._id}>
						<Link href={urls.blogPost(p.slug)} className="group block h-full">
							{p.featuredImage?.url ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={p.featuredImage.url}
									alt={p.featuredImage.alt ?? ''}
									className="dp-box-design aspect-video w-full rounded-2xl object-cover"
								/>
							) : (
								<div className="dp-box-design from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 aspect-video w-full rounded-2xl bg-gradient-to-br" />
							)}
							<h3 className="font-primary-font group-hover:text-dp-dark-green mt-4 text-xl font-bold transition-colors md:text-2xl">
								{p.title}
							</h3>
							{p.excerpt && (
								<p className="text-dp-body/75 mt-3 text-base">{p.excerpt}</p>
							)}
							<span className="text-dp-dark-green group-hover:text-dp-green mt-4 inline-block text-sm font-bold">
								Read more →
							</span>
						</Link>
					</li>
				))}
			</ul>
		</Section>
	);
}
