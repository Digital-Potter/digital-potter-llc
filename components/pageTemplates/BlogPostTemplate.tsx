import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	PostHeader,
	PostBody,
	PostTags,
	RelatedPosts,
} from '@/components/pages/blog';
import { FinalCta } from '@/components/pages/home';
import { getSiteUrls } from '@/helpers/cms/urls';
import type { CmsBlogPost } from '@/helpers/cms/types';

type BlogPostTemplateProps = {
	post: CmsBlogPost;
	related: CmsBlogPost[];
};

export async function BlogPostTemplate({
	post,
	related,
}: BlogPostTemplateProps) {
	const [cta, urls] = await Promise.all([resolveCtaHref(), getSiteUrls()]);

	return (
		<>
			{post.seo?.structuredData ? (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: post.seo.structuredData }}
				/>
			) : null}
			<PostHeader post={post} urls={urls} />
			{post.content ? <PostBody html={post.content} /> : null}
			{post.tags && post.tags.length > 0 ? (
				<PostTags tags={post.tags} urls={urls} />
			) : null}
			<RelatedPosts posts={related} urls={urls} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
