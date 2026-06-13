import { resolveCtaHref } from '@/components/layout/cta-href';
import { FinalCta } from '@/components/pages/home';
import type { CmsPolicy } from '@/helpers/cms/policies';
import { normalizeCmsRichText } from '@/helpers/cms/richText';

/**
 * Renders a legal policy (title + rich-text body) served straight from store
 * settings — no Page needed. Uses the site's own rich-text pipeline
 * (normalizeCmsRichText + dp-prose), matching how DefaultTemplate renders legal
 * pages, so policies look consistent with the rest of the marketing site.
 */
export async function PolicyTemplate({ policy }: { policy: CmsPolicy }) {
	const cta = await resolveCtaHref();
	const renderedContent = normalizeCmsRichText(policy.content);

	return (
		<>
			<section className="dp-container py-20 md:py-28">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-balance">{policy.title}</h1>
				</div>
			</section>
			<main>
				<div
					dangerouslySetInnerHTML={{ __html: renderedContent }}
					className="dp-container dp-prose mx-auto mb-20 max-w-4xl"
				/>
			</main>
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}

export default PolicyTemplate;
