'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

type IndicatorProps = {
	itemPath: string;
	isHome: boolean;
};

const Indicator = (props: IndicatorProps) => {
	const { itemPath, isHome } = props;

	const pathName = usePathname();

	return (
		<div
			className={twMerge(
				'absolute top-0 right-0 bottom-0 left-0 -z-[1] flex rounded-2xl',
				pathName === `/${itemPath}` || (isHome && pathName === '/')
					? 'bg-dp-dark/10'
					: '',
			)}
		></div>
	);
};

export default Indicator;
