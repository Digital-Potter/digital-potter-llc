import Image from 'next/image';
import Link from 'next/link';
import { getSiteUrls } from '@/helpers/cms/urls';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import {
	getBlogPlaceholders,
	mapCmsBlogPostToCard,
	type BlogPostCard,
} from '@/components/pages/blog/blogData';

export default async function BlogTeaser() {
	const urls = await getSiteUrls();
	const list = await fetchBlogPostsOrEmpty({ limit: 3 });
	const posts: BlogPostCard[] =
		list.items.length > 0
			? list.items.map((p) => mapCmsBlogPostToCard(p, urls))
			: getBlogPlaceholders(urls).slice(0, 3);

	return (
		<section className="dp-container py-16 md:py-24">
			<div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
				<div className="max-w-4xl">
					<h2 className="text-balance">Fresh ideas & expert tips.</h2>
					<p className="text-dp-body-soft mt-4 text-balance">
						Notes from the studio on building, shipping, and maintaining digital
						products that earn their keep.
					</p>
				</div>
				<Link
					href={urls.blogIndex}
					className="text-dp-dark-green font-primary-font hover:text-dp-green text-sm font-bold tracking-wider uppercase"
				>
					See all posts →
				</Link>
			</div>

			<ul className="mt-12 grid gap-8 md:grid-cols-3">
				{posts.map((post) => (
					<li key={post.slug}>
						<Link href={post.href} className="group block h-full">
							<div className="dp-box-design relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
								{post.featuredImage?.url ? (
									<Image
										src={post.featuredImage.url}
										alt={post.featuredImage.alt ?? post.title}
										fill
										sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 100vw"
										loading="lazy"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<>
										<div className="from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 absolute inset-0 bg-gradient-to-br" />
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="text-dp-body-soft text-xs font-bold tracking-widest uppercase">
												Article cover
											</span>
										</div>
									</>
								)}
							</div>
							<div className="mt-5 flex items-center gap-3 text-xs">
								<span className="bg-dp-dark-green/10 text-dp-dark-green rounded-full px-3 py-1 font-bold tracking-wider uppercase">
									{post.category}
								</span>
								{post.readTime && (
									<span className="text-dp-body-soft">{post.readTime}</span>
								)}
							</div>
							<h3 className="font-primary-font group-hover:text-dp-dark-green mt-4 text-xl font-bold transition-colors md:text-2xl">
								{post.title}
							</h3>
							{post.excerpt && (
								<p className="text-dp-body-soft mt-3 text-base">
									{post.excerpt}
								</p>
							)}
							<span className="text-dp-dark-green group-hover:text-dp-green mt-4 inline-block text-sm font-bold">
								Read more →
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
