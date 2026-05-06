import Link from 'next/link';
import { Section } from './Section';
import { Card } from '@/components/ui/Card';
import { fetchBlogPosts } from '@/helpers/cms/blog';
import type { CmsSection } from '@/helpers/cms/types';

export async function BlogFeedSection({ section }: { section: CmsSection }) {
	const c = section.content as { count?: number } | undefined;
	let items: Awaited<ReturnType<typeof fetchBlogPosts>>['items'] = [];
	try {
		const r = await fetchBlogPosts(1, c?.count ?? 3);
		items = r.items;
	} catch {
		// CMS unavailable — render empty silently
	}
	if (items.length === 0) return null;
	return (
		<Section>
			{section.title && (
				<h2 className="mb-8 text-center text-3xl font-bold">{section.title}</h2>
			)}
			<div className="grid gap-6 md:grid-cols-3">
				{items.map((p) => (
					<Card key={p._id}>
						{p.featuredImage?.url && (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={p.featuredImage.url}
								alt={p.featuredImage.alt ?? ''}
								className="aspect-video w-full rounded-xl object-cover"
							/>
						)}
						<h3 className="mt-4 font-bold">{p.title}</h3>
						{p.excerpt && (
							<p className="text-smoke mt-1 text-sm">{p.excerpt}</p>
						)}
						<Link
							href={`/blog/${p.slug}`}
							className="text-brand-green mt-3 inline-block font-bold"
						>
							Read more →
						</Link>
					</Card>
				))}
			</div>
		</Section>
	);
}
