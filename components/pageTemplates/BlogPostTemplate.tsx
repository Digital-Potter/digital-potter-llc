import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	PostHeader,
	PostBody,
	PostTags,
	RelatedPosts,
} from '@/components/pages/blog';
import { FinalCta } from '@/components/pages/home';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import type { CmsBlogPost } from '@/helpers/cms/types';
import { JsonLd, articleSchema } from '@/helpers/seo/structuredData';

type BlogPostTemplateProps = {
	post: CmsBlogPost;
	related: CmsBlogPost[];
};

export async function BlogPostTemplate({
	post,
	related,
}: BlogPostTemplateProps) {
	const [cta, urls, settings] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchStoreSettingsOrNull(),
	]);

	const tenant = settings?.tenant;
	const ldData =
		post.seo?.structuredData ||
		(tenant ? articleSchema(post, urls, tenant) : null);

	return (
		<>
			<JsonLd data={ldData} />
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
