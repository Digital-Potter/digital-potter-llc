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
				'rounded-3xl border p-6 md:p-8',
				dark
					? 'bg-dp-dark text-dp-yellowish border-transparent'
					: 'border-dp-dark/10 bg-white/50',
				className,
			)}
		>
			{children}
		</div>
	);
}
