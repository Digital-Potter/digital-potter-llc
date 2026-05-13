import Link from 'next/link';
import type { SiteUrls } from '@/helpers/cms/urls';

type PostTagsProps = {
	tags: string[];
	urls: SiteUrls;
};

export default function PostTags({ tags, urls }: PostTagsProps) {
	if (!tags || tags.length === 0) return null;
	return (
		<section className="dp-container py-8">
			<div className="mx-auto max-w-3xl">
				<p className="font-primary-font text-dp-body-soft text-xs font-bold tracking-widest uppercase">
					Tags
				</p>
				<ul className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag) => (
						<li key={tag}>
							<Link
								href={urls.blogTag(tag)}
								className="bg-dp-dark-green/10 text-dp-dark-green hover:bg-dp-dark-green/20 inline-block rounded-full px-3 py-1 text-sm font-medium transition-colors"
							>
								#{tag}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
