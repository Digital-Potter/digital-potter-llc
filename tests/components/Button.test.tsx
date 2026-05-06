import { render, screen } from '@testing-library/react';
import { Button, ButtonLink } from '@/components/ui/Button';

describe('Button', () => {
	it('renders solid variant by default with the children label', () => {
		render(<Button>Click me</Button>);
		const btn = screen.getByRole('button', { name: /click me/i });
		expect(btn).toBeInTheDocument();
		expect(btn.className).toMatch(/bg-dp-green/);
	});

	it('renders outlined variant with the dark border', () => {
		render(<Button variant="outlined">Outlined</Button>);
		const btn = screen.getByRole('button', { name: /outlined/i });
		expect(btn.className).toMatch(/border-dp-dark/);
		expect(btn.className).toMatch(/bg-transparent/);
	});
});

describe('ButtonLink', () => {
	it('renders an anchor pointing at the given href', () => {
		render(
			<ButtonLink href="/contact" variant="solid">
				Let&apos;s connect
			</ButtonLink>,
		);
		const link = screen.getByRole('link', { name: /let.s connect/i });
		expect(link).toHaveAttribute('href', '/contact');
		expect(link.className).toMatch(/bg-dp-green/);
	});
});
