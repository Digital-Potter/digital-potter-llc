import type { Metadata } from 'next';
import { fetchPageBySlugOrNull } from './pages';
import { fetchStoreSettingsOrNull } from './settings';
import type { CmsPage, SeoMeta, StoreSettingsRecord } from './types';

type Fallback = {
	title: string;
	description?: string;
};

type BuildPageMetadataInput = {
	/** CMS Page slug to look up. If missing or not found, only globals + fallback drive the metadata. */
	slug?: string | null;
	fallback: Fallback;
};

/**
 * Apply a Next.js-style title template (`%s | Suffix`) to a value. If the
 * template is missing or malformed (no `%s` placeholder), the value is
 * returned unchanged so a typo in the CMS never produces a literal "%" or
 * "%s" in the rendered <title>.
 */
function applyTitleTemplate(
	template: string | undefined | null,
	value: string,
): string {
	if (!template || !value) return value;
	if (!template.includes('%s')) return value;
	return template.replace('%s', value);
}

function pickOgImageUrl(
	pageSeo: SeoMeta | undefined,
	globalSeo: StoreSettingsRecord['seo'] | undefined,
	pageFeaturedImageUrl?: string,
): string | undefined {
	return (
		pageSeo?.ogImage?.url ??
		pageFeaturedImageUrl ??
		globalSeo?.defaultOgImage ??
		undefined
	);
}

/**
 * Build Next.js Metadata from (in order of precedence):
 *   1. The CMS Page identified by `slug`, if it exists, via its per-Page SEO.
 *   2. Global StoreSettings.seo defaults.
 *   3. The hardcoded `fallback` provided by the caller.
 *
 * Always returns `title: { absolute }` so the parent layout's title template
 * does NOT re-apply on top of what we computed (otherwise the suffix would
 * be appended twice and a malformed template literal would leak into the
 * rendered <title>).
 */
export async function buildPageMetadata({
	slug,
	fallback,
}: BuildPageMetadataInput): Promise<Metadata> {
	const [settings, page] = await Promise.all([
		fetchStoreSettingsOrNull(),
		slug ? fetchPageBySlugOrNull(slug) : Promise.resolve<CmsPage | null>(null),
	]);

	const globalSeo = settings?.settings?.seo;
	const pageSeo = page?.seo;
	const tenantSettings = settings?.tenant?.settings;
	const storeName = tenantSettings?.storeName ?? 'Digital Potter';

	// Title precedence: CMS page metaTitle → global defaultTitle → fallback.
	// CMS-authored metaTitle is treated as already-final by the editor — but
	// we still apply the global title template if one exists, so the brand
	// suffix is consistent across pages without forcing the editor to type it
	// every time.
	const titleSource =
		pageSeo?.metaTitle ?? globalSeo?.defaultTitle ?? fallback.title;
	const finalTitle = applyTitleTemplate(globalSeo?.titleTemplate, titleSource);

	const description =
		pageSeo?.metaDescription ??
		globalSeo?.defaultDescription ??
		fallback.description;

	const ogImageUrl = pickOgImageUrl(
		pageSeo,
		globalSeo,
		page?.featuredImage?.url,
	);

	const noIndex =
		pageSeo?.noIndex === true || globalSeo?.robots?.allowIndexing === false;

	return {
		title: { absolute: finalTitle },
		description,
		openGraph: {
			title: finalTitle,
			description,
			siteName: storeName,
			type: 'website',
			images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: finalTitle,
			description,
			images: ogImageUrl ? [ogImageUrl] : undefined,
		},
		alternates: pageSeo?.canonicalUrl
			? { canonical: pageSeo.canonicalUrl }
			: undefined,
		robots: noIndex ? { index: false, follow: false } : undefined,
	};
}
