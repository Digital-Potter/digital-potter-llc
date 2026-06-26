import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cookies, draftMode } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import PreviewBanner from '@/components/PreviewBanner';
import { BlogCategoryTemplate } from '@/components/pageTemplates/BlogCategoryTemplate';
import { BlogPostTemplate } from '@/components/pageTemplates/BlogPostTemplate';
import { BlogTemplate } from '@/components/pageTemplates/BlogTemplate';
import { PortfolioTemplate } from '@/components/pageTemplates/PortfolioTemplate';
import { ProjectCategoryTemplate } from '@/components/pageTemplates/ProjectCategoryTemplate';
import { PolicyTemplate } from '@/components/pageTemplates/PolicyTemplate';
import { ProjectDetailTemplate } from '@/components/pageTemplates/ProjectDetailTemplate';
import { UnsupportedResourceTemplate } from '@/components/pageTemplates/UnsupportedResourceTemplate';
import { resolveTemplate } from '@/components/pageTemplates/registry';
import { fetchBlogPostBySlugOrNull } from '@/helpers/cms/blog';
import { fetchPageBySlugOrNull } from '@/helpers/cms/pages';
import { fetchPolicyBySlugOrNull } from '@/helpers/cms/policies';
import { fetchProjectBySlugOrNull } from '@/helpers/cms/projects';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';

type Params = { slug?: string[] };

type Route =
	| { kind: 'redirect-home' }
	| { kind: 'blog-index' }
	| { kind: 'blog-post'; slug: string }
	| { kind: 'blog-category'; slug: string }
	| { kind: 'portfolio-index' }
	| { kind: 'project-detail'; slug: string }
	| { kind: 'project-category'; slug: string }
	| { kind: 'products-index' }
	| { kind: 'product-detail'; slug: string }
	| { kind: 'product-category'; slug: string }
	| { kind: 'courses-index' }
	| { kind: 'course-detail'; slug: string }
	| { kind: 'policy'; slug: string }
	| { kind: 'cms-page'; slug: string }
	| { kind: 'text-page'; slug: string }
	| { kind: 'not-found' };

const BLOG_FALLBACK = {
	title: 'Blog — Notes from Digital Potter',
	description:
		'Field notes from Digital Potter on building custom websites and apps, opinions on tools, and the occasional rant about template-builder economics.',
};

const PORTFOLIO_FALLBACK = {
	title: 'Portfolio — Selected Web and App Work from Digital Potter',
	description:
		'A mix of restaurants, retailers, and B2B platforms shipped by Digital Potter LLC. Each one started as a blank page and ended as a custom Next.js build owned by the client.',
};

/**
 * Classify the visited path against the storefront `siteStructure`. Single
 * source of truth for routing — `generateMetadata` and the page body both
 * call this so they always agree on what to render.
 */
async function classify(slugs: string[]): Promise<Route> {
	if (slugs.length === 0) return { kind: 'not-found' };
	const [first, second, third] = slugs;

	const [urls, settings] = await Promise.all([
		getSiteUrls(),
		fetchStoreSettingsOrNull(),
	]);
	const homepageSlug = settings?.settings?.siteStructure?.homepageSlug ?? null;

	if (homepageSlug && slugs.length === 1 && first === homepageSlug) {
		return { kind: 'redirect-home' };
	}

	if (first === urls.blog) {
		if (slugs.length === 1) return { kind: 'blog-index' };
		if (slugs.length === 2) return { kind: 'blog-post', slug: second };
		if (slugs.length === 3 && second === 'category')
			return { kind: 'blog-category', slug: third };
		return { kind: 'not-found' };
	}

	if (first === urls.portfolio) {
		if (slugs.length === 1) return { kind: 'portfolio-index' };
		if (slugs.length === 3 && second === 'category')
			return { kind: 'project-category', slug: third };
		if (slugs.length === 2) return { kind: 'project-detail', slug: second };
		return { kind: 'not-found' };
	}

	if (first === urls.products) {
		if (slugs.length === 1) return { kind: 'products-index' };
		if (slugs.length === 2) return { kind: 'product-detail', slug: second };
		return { kind: 'not-found' };
	}

	if (first === urls.productCategories && slugs.length === 2) {
		return { kind: 'product-category', slug: second };
	}

	if (first === urls.courses) {
		if (slugs.length === 1) return { kind: 'courses-index' };
		if (slugs.length === 2) return { kind: 'course-detail', slug: second };
		return { kind: 'not-found' };
	}

	// Legal policies live at /policies/<slug>, served from store settings.
	// Bare /policies has no index — send it home rather than 404.
	if (first === 'policies') {
		if (slugs.length === 1) return { kind: 'redirect-home' };
		if (slugs.length === 2) return { kind: 'policy', slug: second };
		return { kind: 'not-found' };
	}

	if (slugs.length === 1) {
		return { kind: 'cms-page', slug: first };
	}

	return { kind: 'not-found' };
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug = [] } = await params;
	const route = await classify(slug);

	switch (route.kind) {
		case 'redirect-home':
			return {};
		case 'blog-index':
			return buildPageMetadata({
				slug: (await getSiteUrls()).blog,
				fallback: BLOG_FALLBACK,
				path: `/${slug.join('/')}`,
			});
		case 'blog-category':
			return {
				title: { absolute: `${route.slug} — Digital Potter Blog` },
				description: `Posts in the ${route.slug} category.`,
				alternates: {
					canonical: (await getSiteUrls()).blogCategory(route.slug),
				},
			};
		case 'blog-post': {
			const data = await fetchBlogPostBySlugOrNull(route.slug);
			if (!data?.post) {
				return {
					title: 'Post not found',
					robots: { index: false, follow: false },
				};
			}
			const post = data.post;
			const ogImageUrl =
				post.seo?.ogImage?.url ?? post.featuredImage?.url ?? undefined;
			return {
				title: {
					absolute: post.seo?.metaTitle ?? `${post.title} — Digital Potter`,
				},
				description: post.seo?.metaDescription ?? post.excerpt ?? post.subtitle,
				openGraph: {
					type: 'article',
					images: ogImageUrl ? [ogImageUrl] : undefined,
				},
				alternates: post.seo?.canonicalUrl
					? { canonical: post.seo.canonicalUrl }
					: undefined,
				robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
			};
		}
		case 'portfolio-index':
			return buildPageMetadata({
				slug: (await getSiteUrls()).portfolio,
				fallback: PORTFOLIO_FALLBACK,
				path: `/${slug.join('/')}`,
			});
		case 'project-category': {
			const urls = await getSiteUrls();
			return {
				title: { absolute: `${route.slug} — Digital Potter Portfolio` },
				description: `Case studies in the ${route.slug} category.`,
				alternates: {
					canonical: `${urls.portfolioIndex}/category/${route.slug}`,
				},
			};
		}
		case 'project-detail': {
			const project = await fetchProjectBySlugOrNull(route.slug);
			if (!project) {
				return {
					title: 'Case study not found',
					robots: { index: false, follow: false },
				};
			}
			const ogImageUrl =
				project.seo?.ogImage?.url ?? project.featuredImage?.url ?? undefined;
			return {
				title: {
					absolute:
						project.seo?.metaTitle ?? `${project.title} — Digital Potter`,
				},
				description:
					project.seo?.metaDescription ?? project.subtitle ?? project.excerpt,
				openGraph: {
					type: 'article',
					images: ogImageUrl ? [ogImageUrl] : undefined,
				},
				alternates: project.seo?.canonicalUrl
					? { canonical: project.seo.canonicalUrl }
					: undefined,
				robots: project.seo?.noIndex
					? { index: false, follow: false }
					: undefined,
			};
		}
		case 'policy': {
			const policy = await fetchPolicyBySlugOrNull(route.slug);
			if (!policy) {
				return {
					title: 'Policy not found',
					robots: { index: false, follow: false },
				};
			}
			return { title: { absolute: `${policy.title} — Digital Potter` } };
		}
		case 'cms-page':
			return buildPageMetadata({
				slug: route.slug,
				fallback: { title: 'Digital Potter' },
				path: `/${slug.join('/')}`,
			});
		case 'text-page':
			return buildPageMetadata({
				slug: route.slug,
				fallback: { title: 'Digital Potter Legal' },
				path: `/${slug.join('/')}`,
			});
		default:
			return { title: 'Not found', robots: { index: false, follow: false } };
	}
}

export default async function CatchAllRoute({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug = [] } = await params;
	const route = await classify(slug);

	const { isEnabled: isPreview } = await draftMode();
	const token = isPreview
		? (await cookies()).get('preview_token')?.value
		: undefined;
	const previewOpts = { preview: isPreview, token };

	/** Prefix the preview banner above rendered content while in draft mode. */
	const withBanner = (label: string, node: ReactNode): ReactNode =>
		isPreview ? (
			<>
				<PreviewBanner label={label} />
				{node}
			</>
		) : (
			node
		);

	switch (route.kind) {
		case 'redirect-home':
			redirect('/');
		case 'blog-index':
			return <BlogTemplate />;
		case 'blog-category':
			return <BlogCategoryTemplate categorySlug={route.slug} />;
		case 'blog-post': {
			const data = await fetchBlogPostBySlugOrNull(route.slug, previewOpts);
			// Match generateMetadata's `!data?.post` guard: a 200 envelope with a
			// null post (draft/unpublished) must 404, not render a null post.
			if (!data?.post) notFound();
			return withBanner(
				route.slug,
				<BlogPostTemplate post={data.post} related={data.related ?? []} />,
			);
		}
		case 'portfolio-index':
			return <PortfolioTemplate />;
		case 'project-category':
			return <ProjectCategoryTemplate categorySlug={route.slug} />;
		case 'project-detail': {
			const project = await fetchProjectBySlugOrNull(route.slug, previewOpts);
			if (!project) notFound();
			return withBanner(
				route.slug,
				<ProjectDetailTemplate project={project} />,
			);
		}
		case 'products-index':
			return (
				<UnsupportedResourceTemplate
					title="Products are coming soon."
					subtitle="The marketing site doesn't list products yet. Get in touch if you'd like to talk about how we'd build a storefront for you."
				/>
			);
		case 'product-detail':
			return (
				<UnsupportedResourceTemplate
					title="Product not available"
					subtitle="This product link isn't wired up on the marketing site yet."
				/>
			);
		case 'product-category':
			return (
				<UnsupportedResourceTemplate
					title="Collection coming soon"
					subtitle="Product collections aren't rendered on the marketing site yet."
				/>
			);
		case 'courses-index':
			return (
				<UnsupportedResourceTemplate
					title="Courses are coming soon."
					subtitle="The marketing site doesn't list courses yet. Get in touch if you're interested in our future course offerings."
				/>
			);
		case 'course-detail':
			return (
				<UnsupportedResourceTemplate
					title="Course not available"
					subtitle="This course link isn't wired up on the marketing site yet."
				/>
			);
		case 'policy': {
			const policy = await fetchPolicyBySlugOrNull(route.slug);
			if (!policy) notFound();
			return <PolicyTemplate policy={policy} />;
		}
		case 'cms-page': {
			const page = await fetchPageBySlugOrNull(route.slug, previewOpts);
			if (!page) notFound();
			const Template = resolveTemplate(page.template);
			return withBanner(route.slug, <Template page={page} />);
		}
		default:
			notFound();
	}
}
