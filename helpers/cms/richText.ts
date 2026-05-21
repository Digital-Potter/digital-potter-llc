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
