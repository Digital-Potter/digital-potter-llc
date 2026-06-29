import sanitizeHtml from './sanitizeHtml';
import { renderCmsHtml } from './richText';

describe('sanitizeHtml', () => {
	it('strips <script> tags', () => {
		expect(sanitizeHtml('<p>hi</p><script>alert(1)</script>')).toBe(
			'<p>hi</p>',
		);
	});

	it('removes inline event handlers', () => {
		expect(sanitizeHtml('<img src="x" onerror="alert(1)">')).not.toContain(
			'onerror',
		);
	});

	it('neutralizes javascript: URLs', () => {
		expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).not.toContain(
			'javascript:',
		);
	});

	it('preserves trusted YouTube embeds', () => {
		expect(
			sanitizeHtml('<iframe src="https://www.youtube.com/embed/abc"></iframe>'),
		).toContain('youtube.com/embed/abc');
	});

	it('removes iframes from untrusted hosts', () => {
		expect(
			sanitizeHtml('<iframe src="https://evil.example.com/x"></iframe>'),
		).not.toContain('evil.example.com');
	});

	it('returns an empty string for nullish input', () => {
		expect(sanitizeHtml(null)).toBe('');
		expect(sanitizeHtml(undefined)).toBe('');
	});
});

describe('renderCmsHtml', () => {
	it('sanitizes (strips script) then keeps content', () => {
		const out = renderCmsHtml('<p>hi</p><script>alert(1)</script>');
		expect(out).toContain('<p>hi</p>');
		expect(out).not.toContain('<script>');
	});

	it('handles nullish input', () => {
		expect(renderCmsHtml(null)).toBe('');
		expect(renderCmsHtml(undefined)).toBe('');
	});
});
