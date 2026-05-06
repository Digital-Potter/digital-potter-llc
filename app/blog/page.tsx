import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	BlogHero,
	PostsList,
	BLOG_PLACEHOLDERS,
} from '@/components/pages/blog';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Blog — Notes from Digital Potter',
	description:
		'Field notes from Digital Potter on building custom websites and apps, opinions on tools, and the occasional rant about template-builder economics.',
};

export default async function BlogPage() {
	const cta = await resolveCtaHref();
	const posts = BLOG_PLACEHOLDERS;

	return (
		<>
			<BlogHero totalPosts={posts.length} />
			<PostsList posts={posts} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
