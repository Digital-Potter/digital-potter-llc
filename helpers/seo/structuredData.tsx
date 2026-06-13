import type {
	CmsBlogPost,
	CmsProject,
	StoreSettingsRecord,
	TenantChrome,
} from '@/helpers/cms/types';
import type { SiteUrls } from '@/helpers/cms/urls';

/**
 * Public site URL used as the origin for absolute URLs in JSON-LD and as
 * Next.js `metadataBase`. Single source of truth — `app/layout.tsx` and
 * `components/layout/Breadcrumbs.tsx` import from here so the env-var
 * precedence (`NEXT_PUBLIC_SITE_URL` → `SITE_URL` → localhost fallback)
 * never drifts between metadata and structured data.
 */
export function siteBaseUrl(): string {
	const env = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? null;
	if (env) {
		try {
			return new URL(env).origin;
		} catch {
			// fall through
		}
	}
	return 'http://localhost:3001';
}

/**
 * Resolve the canonical site origin with priority:
 *   1. admin's `storefront.domain` (Site Options → SEO → Storefront domain)
 *   2. `NEXT_PUBLIC_SITE_URL` / `SITE_URL` env vars
 *   3. `http://localhost:3001` fallback for dev
 *
 * Used by routes that already fetch store settings (sitemap, robots, manifest)
 * so the admin's typed domain wins over env vars on production. Falls back
 * gracefully when settings are unreachable.
 */
export function resolveSiteOrigin(domain?: string | null): string {
	if (domain && domain.trim().length > 0) {
		const raw = domain.trim();
		const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
		try {
			return new URL(withProto).origin;
		} catch {
			// fall through
		}
	}
	return siteBaseUrl();
}

/** Resolve a relative path or pass through an absolute URL. */
export function absoluteUrl(path?: string): string {
	if (!path) return siteBaseUrl();
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	return siteBaseUrl() + (path.startsWith('/') ? path : `/${path}`);
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function truncate(text: string, max: number): string {
	if (text.length <= max) return text;
	return (
		text
			.slice(0, max)
			.replace(/\s+\S*$/, '')
			.trim() + '…'
	);
}

/** Plain-text excerpt derived from rich-text HTML. Returns undefined when nothing useful is present. */
function htmlExcerpt(html?: string, max = 200): string | undefined {
	if (!html) return undefined;
	const text = stripHtml(html);
	if (!text) return undefined;
	return text.length <= max ? text : truncate(text, max);
}

function authorName(author?: CmsBlogPost['author']): string | undefined {
	if (!author) return undefined;
	const parts = [author.firstName, author.lastName].filter(Boolean);
	const name = parts.join(' ').trim();
	return name.length > 0 ? name : undefined;
}

// -----------------------------------------------------------------
// Schema builders
// -----------------------------------------------------------------

type Json = Record<string, unknown>;

export function organizationSchema(
	tenant: TenantChrome,
	settings: StoreSettingsRecord | null,
): Json {
	const social = settings?.socialLinks ?? {};
	const sameAs = [
		social.facebook,
		social.instagram,
		social.twitter,
		social.youtube,
		social.tiktok,
	].filter((v): v is string => typeof v === 'string' && v.length > 0);

	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: tenant.settings.storeName,
		url: siteBaseUrl(),
	};
	if (tenant.settings.logoUrl) {
		out.logo = absoluteUrl(tenant.settings.logoUrl);
	}
	if (tenant.settings.storeDescription) {
		out.description = tenant.settings.storeDescription;
	}
	if (tenant.settings.contactEmail) out.email = tenant.settings.contactEmail;
	if (tenant.settings.contactPhone)
		out.telephone = tenant.settings.contactPhone;
	if (tenant.settings.address) out.address = tenant.settings.address;
	if (sameAs.length > 0) out.sameAs = sameAs;

	// A contactPoint is what Google attaches to the Organization knowledge
	// entity (the bare email/telephone above are weaker signals).
	if (tenant.settings.contactEmail || tenant.settings.contactPhone) {
		const contactPoint: Json = {
			'@type': 'ContactPoint',
			contactType: 'customer support',
			areaServed: 'US',
		};
		if (tenant.settings.contactPhone)
			contactPoint.telephone = tenant.settings.contactPhone;
		if (tenant.settings.contactEmail)
			contactPoint.email = tenant.settings.contactEmail;
		out.contactPoint = [contactPoint];
	}
	return out;
}

export function websiteSchema(
	tenant: TenantChrome,
	settings: StoreSettingsRecord | null,
): Json {
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: tenant.settings.storeName,
		url: siteBaseUrl(),
		publisher: {
			'@type': 'Organization',
			name: tenant.settings.storeName,
			url: siteBaseUrl(),
		},
	};
	const description =
		settings?.seo?.defaultDescription || tenant.settings.storeDescription;
	if (description) out.description = description;
	return out;
}

/** Reusable Organization reference embedded inside Article/CreativeWork/Service. */
function orgReference(tenant: TenantChrome): Json {
	const ref: Json = {
		'@type': 'Organization',
		name: tenant.settings.storeName,
		url: siteBaseUrl(),
	};
	if (tenant.settings.logoUrl) {
		ref.logo = {
			'@type': 'ImageObject',
			url: absoluteUrl(tenant.settings.logoUrl),
		};
	}
	return ref;
}

export function articleSchema(
	post: CmsBlogPost,
	urls: SiteUrls,
	tenant: TenantChrome,
): Json {
	const url = absoluteUrl(urls.blogPost(post.slug));
	const name = authorName(post.author);
	const author: Json = name
		? { '@type': 'Person', name }
		: { '@type': 'Organization', name: tenant.settings.storeName };
	const description = post.excerpt || htmlExcerpt(post.content);

	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: truncate(post.title, 110),
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		url,
		author,
		publisher: orgReference(tenant),
	};
	if (description) out.description = description;
	if (post.featuredImage?.url) {
		out.image = absoluteUrl(post.featuredImage.url);
	}
	if (post.publishedAt) {
		out.datePublished = post.publishedAt;
		out.dateModified = post.publishedAt;
	}
	if (post.categories?.[0]?.name) {
		out.articleSection = post.categories[0].name;
	}
	if (post.tags && post.tags.length > 0) {
		out.keywords = post.tags.join(', ');
	}
	return out;
}

export function creativeWorkSchema(
	project: CmsProject,
	urls: SiteUrls,
	tenant: TenantChrome,
): Json {
	const url = absoluteUrl(urls.project(project.slug));
	const ref = orgReference(tenant);
	const description =
		project.subtitle || project.excerpt || htmlExcerpt(project.content);

	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.title,
		headline: project.title,
		url,
		creator: ref,
		author: ref,
	};
	if (description) out.description = description;
	if (project.featuredImage?.url) {
		out.image = absoluteUrl(project.featuredImage.url);
	}
	if (project.publishedAt) out.datePublished = project.publishedAt;
	if (project.dateRange?.start) out.dateCreated = project.dateRange.start;
	if (project.categories?.[0]?.name) out.genre = project.categories[0].name;
	if (project.categories && project.categories.length > 0) {
		out.keywords = project.categories.map((c) => c.name).join(', ');
	}
	return out;
}

// -----------------------------------------------------------------
// Service descriptors — single source of copy for the service-family templates
// -----------------------------------------------------------------

export type ServiceDescriptor = {
	name: string;
	description: string;
	serviceType: string;
};

export const SERVICE_DESCRIPTORS = {
	general: {
		name: 'Digital Potter Services',
		description:
			'Custom web development, mobile apps, ongoing maintenance, and self-hosted CMS deployments for businesses that need a digital presence built to last.',
		serviceType: 'Web and Mobile App Development',
	},
	web: {
		name: 'Custom Web Development',
		description:
			'Hand-crafted Next.js websites — fast, SEO-ready from day one, and yours to keep when our engagement ends. Marketing sites, ecommerce, booking flows, and multi-region storefronts.',
		serviceType: 'Web Development',
	},
	mobile: {
		name: 'Mobile App Development',
		description:
			'Cross-platform iOS and Android apps built with React Native and Expo — native performance, App Store-quality UX, and over-the-air updates.',
		serviceType: 'Mobile App Development',
	},
	maintenance: {
		name: 'Website & App Maintenance',
		description:
			'Retainer and hourly maintenance for web and mobile apps — uptime monitoring, security patches, technical SEO, performance reviews, and on-call response.',
		serviceType: 'Website Maintenance',
	},
	selfHosted: {
		name: 'Self-Hosted CMS Deployment',
		description:
			'Deploy theDavid CMS into your own AWS, GCP, Azure, or on-prem environment with source license, compliance support, and team training.',
		serviceType: 'Self-hosted CMS deployment',
	},
	cms: {
		name: 'theDavid Headless CMS',
		description:
			'A headless CMS built for studios and SMBs — multi-tenant, with content, ecommerce, bookings, and subscriptions unified in a single admin.',
		serviceType: 'Headless CMS',
	},
} as const satisfies Record<string, ServiceDescriptor>;

export function serviceSchema(opts: {
	descriptor: ServiceDescriptor;
	url: string;
	tenant: TenantChrome;
	image?: string;
}): Json {
	const { descriptor, url, tenant, image } = opts;
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: descriptor.name,
		description: descriptor.description,
		serviceType: descriptor.serviceType,
		provider: orgReference(tenant),
		url: absoluteUrl(url),
		areaServed: 'Worldwide',
	};
	if (image) out.image = absoluteUrl(image);
	return out;
}

// -----------------------------------------------------------------
// Collection pages (blog index, portfolio index)
// -----------------------------------------------------------------

export function collectionPageSchema(opts: {
	type?: 'CollectionPage' | 'Blog';
	name: string;
	description?: string;
	url: string;
	itemType: 'BlogPosting' | 'CreativeWork';
	items: Array<{
		name: string;
		url: string;
		datePublished?: string;
		image?: string;
		description?: string;
	}>;
}): Json {
	const {
		type = 'CollectionPage',
		name,
		description,
		url,
		itemType,
		items,
	} = opts;
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': type,
		name,
		url: absoluteUrl(url),
	};
	if (description) out.description = description;
	if (items.length > 0) {
		const entries = items.map((it): Json => {
			const entry: Json = {
				'@type': itemType,
				name: it.name,
				headline: it.name,
				url: absoluteUrl(it.url),
			};
			if (it.datePublished) entry.datePublished = it.datePublished;
			if (it.image) entry.image = absoluteUrl(it.image);
			if (it.description) entry.description = it.description;
			return entry;
		});
		if (type === 'Blog') {
			out.blogPost = entries;
		} else {
			out.mainEntity = {
				'@type': 'ItemList',
				itemListElement: entries.map((entry, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					item: entry,
				})),
			};
		}
	}
	return out;
}

// -----------------------------------------------------------------
// Generic page (WebPage / AboutPage / ContactPage)
// -----------------------------------------------------------------

export function webPageSchema(opts: {
	type?: 'WebPage' | 'AboutPage' | 'ContactPage';
	name: string;
	description?: string;
	url: string;
	image?: string;
	tenant: TenantChrome;
	mainEntity?: object;
}): Json {
	const {
		type = 'WebPage',
		name,
		description,
		url,
		image,
		tenant,
		mainEntity,
	} = opts;
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': type,
		name,
		url: absoluteUrl(url),
		isPartOf: {
			'@type': 'WebSite',
			name: tenant.settings.storeName,
			url: siteBaseUrl(),
		},
	};
	if (description) out.description = description;
	if (image) out.image = absoluteUrl(image);
	if (mainEntity) out.mainEntity = mainEntity;
	return out;
}

export function faqPageSchema(
	items: Array<{ question: string; answer: string }>,
): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((it) => ({
			'@type': 'Question',
			name: it.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: it.answer,
			},
		})),
	};
}

// -----------------------------------------------------------------
// JsonLd render component
// -----------------------------------------------------------------

type JsonLdInput = object | string | null | undefined;

/**
 * Renders a single `<script type="application/ld+json">` tag. Accepts either:
 * - an object → JSON-stringified
 * - a string → rendered verbatim (used for CMS-authored `seo.structuredData`)
 * - null / undefined / empty string → renders nothing
 *
 * Centralizes `dangerouslySetInnerHTML` so callers never write it directly.
 */
export function JsonLd({ data }: { data: JsonLdInput }) {
	if (data === null || data === undefined) return null;
	const html = typeof data === 'string' ? data : JSON.stringify(data);
	if (!html || html.trim().length === 0) return null;
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
