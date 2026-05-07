import Link from 'next/link';
import type { CmsBlogPost } from '@/helpers/cms/types';
import type { SiteUrls } from '@/helpers/cms/urls';

type RelatedPostsProps = {
	posts: CmsBlogPost[];
	urls: SiteUrls;
};

export default function RelatedPosts({ posts, urls }: RelatedPostsProps) {
	if (!posts || posts.length === 0) return null;

	const limited = posts.slice(0, 3);

	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Keep reading
				</p>
				<h2 className="mt-6 text-balance">Related posts.</h2>
			</div>

			<ul className="mt-12 grid gap-8 md:grid-cols-3">
				{limited.map((p) => {
					const cat = p.categories?.[0];
					return (
						<li key={p._id}>
							<Link href={urls.blogPost(p.slug)} className="group block h-full">
								{p.featuredImage?.url ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={p.featuredImage.url}
										alt={p.featuredImage.alt ?? p.title}
										className="dp-box-design aspect-video w-full rounded-2xl object-cover"
									/>
								) : (
									<div className="dp-box-design from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 aspect-video w-full rounded-2xl bg-gradient-to-br" />
								)}
								{cat && (
									<span className="bg-dp-dark-green/10 text-dp-dark-green mt-5 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
										{cat.name}
									</span>
								)}
								<h3 className="font-primary-font group-hover:text-dp-dark-green mt-3 text-xl font-bold transition-colors md:text-2xl">
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
					);
				})}
			</ul>
		</section>
	);
}
