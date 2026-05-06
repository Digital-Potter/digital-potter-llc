import { render } from '@testing-library/react';
import { PageSectionRenderer } from '@/components/sections/PageSectionRenderer';

describe('PageSectionRenderer', () => {
	it('ignores unknown section types', () => {
		const { container } = render(
			<PageSectionRenderer sections={[{ _type: 'MYSTERY' }]} />,
		);
		expect(container.firstChild).toBeNull();
	});

	it('orders sections by order field', () => {
		const { container } = render(
			<PageSectionRenderer
				sections={[
					{ _type: 'TEXT', order: 2, title: 'B' },
					{ _type: 'TEXT', order: 1, title: 'A' },
				]}
			/>,
		);
		const headings = container.querySelectorAll('h2, h3');
		// First rendered heading should be the section ordered first
		expect(headings[0]?.textContent).toContain('A');
	});
});
