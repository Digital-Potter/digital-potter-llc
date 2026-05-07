import { resolveCtaHref } from '@/components/layout/cta-href';
import { FinalCta } from '@/components/pages/home';

type UnsupportedResourceTemplateProps = {
	title: string;
	subtitle: string;
};

/**
 * Stub used when a CMS-resolved URL targets a resource family the marketing
 * site doesn't render yet (products, product categories, courses). Renders
 * a friendly explanation + a CTA so editors don't see a 404 the moment they
 * publish their first product, but also won't expose half-built UI.
 */
export async function UnsupportedResourceTemplate({
	title,
	subtitle,
}: UnsupportedResourceTemplateProps) {
	const cta = await resolveCtaHref();
	return (
		<>
			<section className="dp-container py-20 md:py-28">
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="text-balance">{title}</h1>
					<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-lg text-balance md:text-xl">
						{subtitle}
					</p>
				</div>
			</section>
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
