import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';

const padding = {
	none: 'py-0',
	small: 'py-6',
	medium: 'py-12',
	large: 'py-20',
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
	layout?: 'full' | 'contained' | 'narrow';
}) {
	const inner =
		layout === 'narrow' ? (
			<div className="mx-auto max-w-3xl">{children}</div>
		) : (
			children
		);
	return (
		<section id={anchor} className={clsx(padding[paddingY])}>
			{layout === 'full' ? <>{inner}</> : <Container>{inner}</Container>}
		</section>
	);
}
