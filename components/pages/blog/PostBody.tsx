import { normalizeCmsRichText } from '@/helpers/cms/richText';

type PostBodyProps = {
	html: string;
};

/**
 * Renders the rich-HTML content from the CMS. The CMS authors trusted
 * HTML through the admin's RichTextEditor (Tiptap) — we trust it. If
 * untrusted authors ever land in the loop, wrap with DOMPurify here.
 */
export default function PostBody({ html }: PostBodyProps) {
	const renderedHtml = normalizeCmsRichText(html);

	return (
		<section className="dp-container py-8 md:py-12">
			<article
				className="prose prose-base md:prose-lg prose-headings:font-primary-font prose-headings:text-dp-dark prose-h2:text-3xl prose-h2:md:text-4xl prose-h3:text-2xl prose-p:text-dp-body/85 prose-strong:text-dp-dark prose-a:text-dp-dark-green prose-a:font-bold hover:prose-a:text-dp-green prose-blockquote:border-dp-green prose-blockquote:text-dp-body/85 prose-code:text-dp-dark-green prose-code:bg-dp-dark-green/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:hidden prose-code:after:hidden prose-pre:bg-dp-dark prose-pre:text-dp-yellowish prose-img:rounded-2xl prose-img:shadow-lg mx-auto max-w-3xl"
				dangerouslySetInnerHTML={{ __html: renderedHtml }}
			/>
		</section>
	);
}
