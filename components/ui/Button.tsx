import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import RightArrow from '@/components/icons/RightArrow';

export type ButtonVariant = 'solid' | 'outlined';

type CommonProps = {
	variant?: ButtonVariant;
	children: ReactNode;
	className?: string;
};

const baseClasses =
	'font-primary-font rounded-dp-20 group relative flex items-center text-xs font-bold uppercase shadow-2xl transition-all border-2 px-4 py-3.5 md:px-9 md:py-4 lg:text-sm';

const variantClasses: Record<ButtonVariant, string> = {
	solid:
		'bg-dp-green text-dp-dark border-white hover:text-dp-green hover:bg-dp-dark hover:border-white',
	outlined: 'bg-transparent text-dp-dark border-dp-dark hover:border-dp-dark',
};

function ButtonContent({
	children,
	variant,
}: {
	children: ReactNode;
	variant: ButtonVariant;
}) {
	const labelClass =
		variant === 'solid'
			? 'translate-x-2 text-center transition-all group-hover:-translate-x-1'
			: 'text-dp-dark group-hover:text-dp-body translate-x-2 transition-all group-hover:-translate-x-1';

	const iconClass =
		variant === 'solid'
			? 'group-hover:fill-dp-green translate-x-0 fill-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100'
			: 'fill-dp-dark group-hover:fill-dp-body translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100';

	return (
		<>
			<span className={labelClass}>{children}</span>
			<RightArrow className={iconClass} />
		</>
	);
}

export function Button({
	variant = 'solid',
	className,
	children,
	...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={twMerge(baseClasses, variantClasses[variant], className)}
			{...rest}
		>
			<ButtonContent variant={variant}>{children}</ButtonContent>
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
			className={twMerge(baseClasses, variantClasses[variant], className)}
		>
			<ButtonContent variant={variant}>{children}</ButtonContent>
		</Link>
	);
}
