import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Card({
	children,
	className,
	dark,
}: {
	children: ReactNode;
	className?: string;
	dark?: boolean;
}) {
	return (
		<div
			className={clsx(
				'rounded-2xl border p-5',
				dark
					? 'bg-ink text-cream border-transparent'
					: 'border-ink/10 bg-white',
				className,
			)}
		>
			{children}
		</div>
	);
}
