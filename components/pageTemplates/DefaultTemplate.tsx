import { resolveCtaHref } from '@/components/layout/cta-href';
import { FinalCta } from '@/components/pages/home';
import type { CmsPage } from '@/helpers/cms/types';

/**
 * Fallback template used when a CMS page's `template` field is missing or
 * doesn't match a registered template. Renders the page's title/subtitle
 * plus the global "let's connect" CTA so authors get something usable while
 * a richer template is wired up later.
 */
export async function DefaultTemplate({ page }: { page: CmsPage | null }) {
	const cta = await resolveCtaHref();
	const title = page?.title ?? 'Digital Potter';
	const subtitle = page?.subtitle ?? page?.excerpt;

	return (
		<>
			<section className="dp-container py-20 md:py-28">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-balance">{title}</h1>
					{subtitle && (
						<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-lg text-balance md:text-xl">
							{subtitle}
						</p>
					)}
				</div>
				{page?.featuredImage?.url && (
					<div className="mx-auto mt-12 max-w-5xl">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={page.featuredImage.url}
							alt={page.featuredImage.alt ?? page.title ?? ''}
							className="dp-box-design w-full rounded-3xl"
						/>
					</div>
				)}
			</section>
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
