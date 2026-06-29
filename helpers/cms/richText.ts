import sanitizeHtml from './sanitizeHtml';

const EMPTY_PARAGRAPH_REGEX = /<p\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi;

/**
 * Converts empty rich-text paragraphs from the CMS into an explicit visual
 * spacer element so blank lines render predictably without fake text content.
 */
export function normalizeCmsRichText(html: string, spacerHeight = '1.5rem') {
	return html.replace(
		EMPTY_PARAGRAPH_REGEX,
		`<div style="height:${spacerHeight}" aria-hidden="true"></div>`,
	);
}

/**
 * Render-ready CMS HTML: sanitize FIRST (the XSS trust boundary — strips
 * scripts/handlers/javascript:, keeps only safe tags + trusted video iframes),
 * THEN normalize spacing. EVERY `dangerouslySetInnerHTML` of CMS content must
 * go through this instead of rendering raw or normalize-only.
 */
export function renderCmsHtml(
	html: string | null | undefined,
	spacerHeight = '1.5rem',
) {
	return normalizeCmsRichText(sanitizeHtml(html), spacerHeight);
}
