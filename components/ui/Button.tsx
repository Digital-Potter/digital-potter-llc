import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'solid' | 'outlined' | 'dark';
type CommonProps = {
	variant?: Variant;
	children: ReactNode;
	className?: string;
};

const styles: Record<Variant, string> = {
	solid: 'bg-brand-green text-ink hover:bg-deep-green hover:text-cream',
	outlined:
		'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-ink',
	dark: 'bg-ink text-cream hover:bg-deep-green',
};

export function Button({
	variant = 'solid',
	className,
	children,
	...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				'rounded-full px-6 py-3 font-bold tracking-wide transition-colors',
				styles[variant],
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}

export function ButtonLink({
	href,
	variant = 'solid',
	className,
	children,
}: CommonProps & { href: string }) {
	return (
		<Link
			href={href}
			className={clsx(
				'inline-block rounded-full px-6 py-3 font-bold tracking-wide transition-colors',
				styles[variant],
				className,
			)}
		>
			{children}
		</Link>
	);
}
