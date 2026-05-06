import clsx from 'clsx';
import type { ReactNode } from 'react';

const padding = {
	none: 'py-0',
	small: 'py-8',
	medium: 'py-12 md:py-16',
	large: 'py-16 md:py-24',
} as const;

export function Section({
	children,
	anchor,
	paddingY = 'medium',
	layout = 'contained',
}: {
	children: ReactNode;
	anchor?: string;
	paddingY?: keyof typeof padding;
	layout?: 'full' | 'contained' | 'narrow' | 'wide';
}) {
	const inner =
		layout === 'narrow' ? (
			<div className="mx-auto max-w-3xl">{children}</div>
		) : layout === 'wide' ? (
			children
		) : (
			<div className="mx-auto max-w-5xl">{children}</div>
		);

	return (
		<section id={anchor} className={clsx('dp-container', padding[paddingY])}>
			{layout === 'full' ? children : inner}
		</section>
	);
}
