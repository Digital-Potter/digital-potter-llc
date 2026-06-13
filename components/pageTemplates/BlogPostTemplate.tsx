import {
	PostHeader,
	PostBody,
	PostTags,
	RelatedPosts,
} from '@/components/pages/blog';
import AuthorBio from '@/components/pages/blog/AuthorBio';
import InlinePostCta from '@/components/pages/blog/InlinePostCta';
import ClosingCta from '@/components/shared/ClosingCta';
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
	const [urls, settings] = await Promise.all([
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
			<InlinePostCta />
			{post.tags && post.tags.length > 0 ? (
				<PostTags tags={post.tags} urls={urls} />
			) : null}
			<AuthorBio />
			<RelatedPosts posts={related} urls={urls} />
			<ClosingCta
				heading="Enough reading — let's talk about your project."
				body="Bring what you just read to a free 45-minute discovery call. You'll leave with a plan and an honest price, whether or not you hire us."
				secondaryHref={urls.blogIndex}
				secondaryLabel="Keep reading"
			/>
		</>
	);
}
