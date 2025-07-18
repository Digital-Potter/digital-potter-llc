import RightArrow from '@/components/icons/RightArrow';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SolidButtonProps {
	label: string;
	href?: string;
	onClick?: () => void;
}

const ButtonIcon = () => {
	return (
		<RightArrow className="fill-white translate-x-0 opacity-0 group-hover:fill-dp-green group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
	);
};

const ButtonLabel = (props: { label: string }) => {
	const { label } = props;
	return (
		<span className="translate-x-2 group-hover:-translate-x-1 transition-all">
			{label}
		</span>
	);
};

const SolidButton = (props: SolidButtonProps) => {
	const { label, onClick, href } = props;

	const commonClasses =
		'relative text-sm flex items-center bg-dp-green text-dp-yellowish font-primary-font uppercase font-bold px-7 py-3.5 rounded-dp-20 border-2 border-white/90 md:px-9 md:py-4 hover:text-dp-green hover:border-white hover:bg-dp-dark transition-all group shadow-xl';

	return href ? (
		<Link href={href} className={twMerge(commonClasses)}>
			<ButtonLabel label={label} />
			<ButtonIcon />
		</Link>
	) : (
		<button onClick={onClick} className={twMerge(commonClasses, 'text-sm')}>
			<ButtonLabel label={label} /> <ButtonIcon />
		</button>
	);
};

export default SolidButton;
