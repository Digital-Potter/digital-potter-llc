import Image from 'next/image';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { FinalCta } from '@/components/pages/home';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import type { CmsPage } from '@/helpers/cms/types';
import { JsonLd, webPageSchema } from '@/helpers/seo/structuredData';

/**
 * Fallback template used when a CMS page's `template` field is missing or
 * doesn't match a registered template. Renders the page's title/subtitle
 * plus the global "let's connect" CTA so authors get something usable while
 * a richer template is wired up later.
 */
export async function DefaultTemplate({ page }: { page: CmsPage | null }) {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const title = page?.title ?? 'Digital Potter';
	const subtitle = page?.subtitle ?? page?.excerpt;

	const tenant = settings?.tenant;
	const ldData =
		page?.seo?.structuredData ||
		(page && tenant
			? webPageSchema({
					name: page.title,
					description: page.excerpt ?? page.subtitle,
					url: `/${page.slug}`,
					image: page.featuredImage?.url,
					tenant,
				})
			: null);

	return (
		<>
			<JsonLd data={ldData} />
			<section className="dp-container py-20 md:py-28">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-balance">{title}</h1>
					{subtitle && (
						<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-lg text-balance md:text-xl">
							{subtitle}
						</p>
					)}
				</div>
				{page?.featuredImage?.url && (
					<div className="mx-auto mt-12 max-w-5xl">
						<Image
							src={page.featuredImage.url}
							alt={page.featuredImage.alt ?? page.title ?? ''}
							width={page.featuredImage.width ?? 1600}
							height={page.featuredImage.height ?? 900}
							sizes="(min-width: 1024px) 64rem, 100vw"
							className="dp-box-design h-auto w-full rounded-3xl"
						/>
					</div>
				)}
			</section>
			<main>
				<div
					dangerouslySetInnerHTML={{
						__html: page?.content || 'Digital Potter Legal',
					}}
					className="dp-container dp-prose mx-auto mb-20 max-w-4xl"
				/>
			</main>
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
