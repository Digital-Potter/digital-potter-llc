import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Tag({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<span
			className={clsx(
				'text-brand-green text-xs font-bold tracking-widest uppercase',
				className,
			)}
		>
			{children}
		</span>
	);
}
