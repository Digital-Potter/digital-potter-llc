'use client';

import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

type IndicatorProps = {
	path: string;
	isHome: boolean;
};

export default function Indicator({ path, isHome }: IndicatorProps) {
	const pathName = usePathname() ?? '/';

	const active = isHome ? pathName === '/' : pathName === path;

	return (
		<div
			className={twMerge(
				'absolute top-0 right-0 bottom-0 left-0 -z-[1] flex rounded-2xl',
				active ? 'bg-dp-dark/10' : '',
			)}
		/>
	);
}
