'use client';

import React, { MouseEvent } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { RightArrow } from '@/components/icons';

interface SolidButtonProps {
	label: string;
	href?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	classes?: string;
	isTopBar?: boolean;
}

const SolidButton = (props: SolidButtonProps) => {
	const pathName = usePathname();
	const { label, onClick, href, classes = '', isTopBar = false } = props;

	return href ? (
		<Link
			href={href}
			className={twJoin(
				'font-primary-font rounded-dp-20 hover:text-dp-green hover:bg-dp-dark group relative flex items-center border-2 border-white px-4 py-3.5 text-xs font-bold uppercase shadow-2xl transition-all hover:border-white md:px-9 md:py-4 lg:text-sm',
				classes,
				isTopBar && pathName === `/${href}`
					? 'bg-dp-dark text-white'
					: 'bg-dp-green text-dp-dark',
			)}
		>
			<ButtonLabel label={label} />
			<ButtonIcon />
		</Link>
	) : (
		<button
			onClick={onClick}
			className={twMerge(
				'font-primary-font rounded-dp-20 hover:text-dp-green hover:bg-dp-dark group relative flex items-center border-2 border-white px-4 py-3.5 text-xs font-bold uppercase shadow-2xl transition-all hover:border-white md:px-9 md:py-4 lg:text-sm',
				classes,
				isTopBar && pathName === `/${href}`
					? 'bg-dp-dark text-white'
					: 'bg-dp-green text-dp-dark',
			)}
		>
			<ButtonLabel label={label} /> <ButtonIcon />
		</button>
	);
};

const ButtonIcon = () => {
	return (
		<RightArrow className="group-hover:fill-dp-green translate-x-0 fill-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
	);
};

const ButtonLabel = (props: { label: string }) => {
	const { label } = props;
	return (
		<span className="translate-x-2 transition-all group-hover:-translate-x-1">
			{label}
		</span>
	);
};

export default SolidButton;
