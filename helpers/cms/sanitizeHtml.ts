import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes CMS rich-text HTML before it is rendered via
 * `dangerouslySetInnerHTML`. This is the trust boundary for stored XSS: CMS
 * content is authored in the admin (Tiptap) and could contain malicious markup
 * if an author account is compromised, so EVERY render of CMS HTML on the
 * public site must pass through this helper (see `renderCmsHtml`).
 *
 * Standard formatting tags are preserved (DOMPurify's default safe profile);
 * `<script>`, inline event handlers and `javascript:` URLs are stripped.
 * `<iframe>` is allowed ONLY for trusted video-embed hosts so Tiptap
 * YouTube/Vimeo embeds keep working without reopening the hole.
 */

const ALLOWED_IFRAME_HOSTS = new Set([
	'www.youtube.com',
	'youtube.com',
	'www.youtube-nocookie.com',
	'youtube-nocookie.com',
	'player.vimeo.com',
]);

let hooksReady = false;

function ensureHooks(): void {
	if (hooksReady) return;
	DOMPurify.addHook('uponSanitizeElement', (node, data) => {
		if (data.tagName !== 'iframe') return;
		const el = node as Element;
		const src = el.getAttribute?.('src') ?? '';
		let host = '';
		try {
			host = new URL(src, 'https://disallowed.invalid').hostname;
		} catch {
			host = '';
		}
		if (!ALLOWED_IFRAME_HOSTS.has(host)) {
			el.parentNode?.removeChild(el);
		}
	});
	hooksReady = true;
}

export default function sanitizeHtml(dirty: string | null | undefined): string {
	if (!dirty) return '';
	ensureHooks();
	return DOMPurify.sanitize(dirty, {
		ADD_TAGS: ['iframe'],
		ADD_ATTR: [
			'allow',
			'allowfullscreen',
			'frameborder',
			'scrolling',
			'target',
			'rel',
		],
	});
}
